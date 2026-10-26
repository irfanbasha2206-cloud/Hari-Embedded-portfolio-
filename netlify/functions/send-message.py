import json
import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    }

    # Handle CORS preflight
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }

    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method Not Allowed'})
        }

    try:
        body = event.get('body', '{}')
        if event.get('isBase64Encoded', False):
            import base64
            body = base64.b64decode(body).decode('utf-8')

        data = json.loads(body)
        name = str(data.get('name', '')).strip()
        email = str(data.get('email', '')).strip()
        subject = str(data.get('subject', 'Embedded Engineering Inquiry')).strip()
        message = str(data.get('message', '')).strip()

        if not name or not email or not message:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({'error': 'Name, email, and message are required.'})
            }

        # Environment configuration
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', 465))
        smtp_sender = os.environ.get('SMTP_SENDER', 'socanalyst232@gmail.com')
        smtp_password = os.environ.get('SMTP_PASSWORD', 'jqznjyiqbnyvadia')
        recipients_str = os.environ.get('RECIPIENTS', 'mhariprasad97@gmail.com')
        recipients = [r.strip() for r in recipients_str.split(',') if r.strip()]

        # Construct email message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'[Portfolio] {subject} - from {name}'
        msg['From'] = f'{name} via Portfolio <{smtp_sender}>'
        msg['To'] = ', '.join(recipients)
        msg['Reply-To'] = email

        plain_text = (
            f"New message from Embedded Systems Portfolio:\n\n"
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Subject: {subject}\n\n"
            f"Message:\n{message}\n\n"
            f"---\nSent to: {', '.join(recipients)}"
        )

        html_text = f"""<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070d18; color: #f1f5f9; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0c1629; border: 1px solid #1e293b; border-radius: 10px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #0b1e3b 0%, #030712 100%); padding: 24px; border-bottom: 2px solid #00d4ff;">
      <h2 style="margin: 0; color: #00d4ff; font-size: 20px; font-weight: 700; letter-spacing: 0.05em;">TELEMETRY INQUIRY RECEIVED</h2>
      <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">M. Hari Prasad // Embedded Engineering Portfolio</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-size: 13px; width: 110px;">Transmitter:</td>
          <td style="padding: 6px 0; color: #ffffff; font-weight: 600; font-size: 14px;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-size: 13px;">Return Email:</td>
          <td style="padding: 6px 0; color: #00d4ff; font-size: 14px;"><a href="mailto:{email}" style="color: #00d4ff; text-decoration: none;">{email}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-size: 13px;">Domain / Subject:</td>
          <td style="padding: 6px 0; color: #ffffff; font-size: 14px;">{subject}</td>
        </tr>
      </table>
      <div style="background-color: #050b14; border: 1px solid #1e293b; border-left: 3px solid #00d4ff; border-radius: 6px; padding: 16px; margin: 16px 0; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">{message}</div>
    </div>
    <div style="background-color: #050b14; padding: 14px 24px; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px; display: flex; justify-content: space-between;">
      <span>Target Inbox: {', '.join(recipients)}</span>
      <span>Status: SSL Verified (Port {smtp_port})</span>
    </div>
  </div>
</body>
</html>"""

        msg.attach(MIMEText(plain_text, 'plain', 'utf-8'))
        msg.attach(MIMEText(html_text, 'html', 'utf-8'))

        context_ssl = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_host, smtp_port, context=context_ssl) as server:
            server.login(smtp_sender, smtp_password)
            server.sendmail(smtp_sender, recipients, msg.as_string())

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'success': True, 'message': 'Message sent successfully.'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'success': False, 'error': str(e)})
        }

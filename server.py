#!/usr/bin/env python3
"""
M. Hari Prasad — Embedded Engineering Portfolio Server
Serves static portfolio assets and handles SMTP SSL email telemetry dispatch.
"""

import os
import sys
import json
import smtplib
from http.server import SimpleHTTPRequestHandler
import socketserver
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# SMTP Configuration
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))
SMTP_SENDER = os.getenv("SMTP_SENDER", "socanalyst232@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "jqznjyiqbnyvadia")

# Recipients who will receive the message (Configured to M. Hari Prasad only)
RECIPIENTS_ENV = os.getenv("RECIPIENTS", "mhariprasad97@gmail.com")
DEFAULT_RECIPIENTS = [r.strip() for r in RECIPIENTS_ENV.split(",") if r.strip()]


class PortfolioHTTPRequestHandler(SimpleHTTPRequestHandler):
    """Handles static file requests and POST /api/send-message telemetry endpoint."""

    def end_headers(self):
        # Enable CORS for cross-origin or local dev requests
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        # Prevent aggressive browser caching so updates appear immediately
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_OPTIONS(self):
        """Respond to preflight CORS requests."""
        self.send_response(204)
        self.end_headers()

    def do_POST(self):
        """Handle contact form telemetry submissions."""
        if self.path in ("/api/send-message", "/api/contact"):
            try:
                content_len = int(self.headers.get("Content-Length", 0))
                post_body = self.rfile.read(content_len).decode("utf-8")
                data = json.loads(post_body) if post_body else {}

                sender_name = data.get("name", "").strip()
                sender_email = data.get("email", "").strip()
                subject = data.get("subject", "").strip() or "Embedded Engineering Inquiry"
                message = data.get("message", "").strip()

                if not sender_name or not sender_email or not message:
                    self._send_json_response(400, {
                        "success": False,
                        "error": "Missing mandatory telemetry fields (Name, Email, Message)."
                    })
                    return

                # Send via SMTP
                sent = self._dispatch_smtp_email(sender_name, sender_email, subject, message)
                if sent:
                    self._send_json_response(200, {
                        "success": True,
                        "message": "Telemetry packet transmitted successfully! Delivered to inbox."
                    })
                else:
                    self._send_json_response(500, {
                        "success": False,
                        "error": "Failed to dispatch email via SMTP server."
                    })

            except Exception as ex:
                self._send_json_response(500, {
                    "success": False,
                    "error": f"Internal server error: {str(ex)}"
                })
        else:
            self._send_json_response(404, {"success": False, "error": "Endpoint not found."})

    def _send_json_response(self, code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _dispatch_smtp_email(self, name, email, subject, message):
        """Connects to smtp.gmail.com:465 via SSL and dispatches email."""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        msg = MIMEMultipart("alternative")
        msg["From"] = f"Portfolio Telemetry <{SMTP_SENDER}>"
        msg["To"] = ", ".join(DEFAULT_RECIPIENTS)
        msg["Subject"] = f"[Portfolio Telemetry] {subject} - From {name}"
        msg["Reply-To"] = email

        # Plain text fallback
        plain_text = f"""
======================================================
NEW TELEMETRY PACKET // PORTFOLIO INQUIRY
======================================================
Timestamp : {timestamp}
Sender    : {name}
Email     : {email}
Subject   : {subject}

MESSAGE PAYLOAD:
------------------------------------------------------
{message}
------------------------------------------------------
Transmitted via M. Hari Prasad Embedded Portfolio
Direct Reply-To is configured to: {email}
"""

        # HTML formatted email
        html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #081122; color: #f1f5f9; padding: 24px; }}
    .card {{ background: #0c1830; border: 1px solid #1e3a66; border-left: 4px solid #00f0ff; border-radius: 8px; padding: 24px; max-width: 600px; margin: 0 auto; }}
    .header {{ border-bottom: 1px solid #1e3a66; padding-bottom: 12px; margin-bottom: 18px; }}
    .badge {{ background: rgba(0, 240, 255, 0.15); color: #00f0ff; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; letter-spacing: 1px; display: inline-block; }}
    h2 {{ color: #ffffff; font-size: 18px; margin: 8px 0 4px 0; }}
    .meta-row {{ margin: 8px 0; font-size: 14px; color: #94a3b8; }}
    .meta-val {{ color: #f1f5f9; font-weight: 600; }}
    .msg-box {{ background: #050b18; border: 1px solid #1e3a66; border-radius: 6px; padding: 16px; margin-top: 16px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }}
    .btn {{ display: inline-block; background: #00f0ff; color: #040a18; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 13px; margin-top: 18px; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">EMBEDDED PORTFOLIO TELEMETRY</span>
      <h2>New Technical Collaboration Message</h2>
      <div class="meta-row">Timestamp: <span class="meta-val">{timestamp}</span></div>
    </div>
    <div class="meta-row"><strong>Operator / Name:</strong> <span class="meta-val">{name}</span></div>
    <div class="meta-row"><strong>Transmitter Email:</strong> <span class="meta-val"><a href="mailto:{email}" style="color:#00f0ff;">{email}</a></span></div>
    <div class="meta-row"><strong>Subject:</strong> <span class="meta-val">{subject}</span></div>
    
    <div class="msg-box">{message}</div>
    
    <a href="mailto:{email}?subject=Re: {subject}" class="btn">Reply Directly to {name}</a>
  </div>
</body>
</html>"""

        msg.attach(MIMEText(plain_text, "plain", "utf-8"))
        msg.attach(MIMEText(html_content, "html", "utf-8"))

        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=15) as server:
            server.login(SMTP_SENDER, SMTP_PASSWORD)
            server.sendmail(SMTP_SENDER, DEFAULT_RECIPIENTS, msg.as_string())

        return True


def run(port=8080):
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), PortfolioHTTPRequestHandler) as httpd:
        print(f"[*] M. Hari Prasad Portfolio Server running at http://localhost:{port}")
        print(f"[*] SMTP Telemetry Endpoint active: POST /api/send-message")
        print(f"[*] SMTP Host: {SMTP_HOST}:{SMTP_PORT} via {SMTP_SENDER}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[!] Shutting down server.")


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    run(port)

/**
 * MAIN APPLICATION LOGIC
 * Navigation, Telemetry HUD clock, Dynamic Skills, Timeline rendering, Contact form & Smooth interactions
 */

(function () {
  'use strict';

  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  // 1. Render Skills Matrix
  function renderSkills() {
    const container = document.getElementById('skills-grid-container');
    if (!container || !data.skillCategories) return;

    container.innerHTML = data.skillCategories
      .map((cat) => {
        const skillsList = cat.skills
          .map(
            (s) => `
          <div class="skill-item">
            <div class="skill-head">
              <span class="skill-name">${s.name}</span>
            </div>
            <p class="skill-desc">${s.desc}</p>
          </div>
        `
          )
          .join('');

        return `
        <div class="skill-card accent-${cat.accent}">
          <div class="skill-card-header">
            <div class="skill-card-icon-box">
              <span class="pin-led"></span>
              <h3 class="skill-card-title">${cat.title}</h3>
            </div>
            <span class="skill-count">${cat.skills.length} COMPETENCIES</span>
          </div>
          <div class="skill-list">
            ${skillsList}
          </div>
        </div>
      `;
      })
      .join('');
  }

  // 3. Render Experience & Education Timelines
  function renderTimelines() {
    const expContainer = document.getElementById('experience-timeline');
    const eduContainer = document.getElementById('education-timeline');
    const certContainer = document.getElementById('certifications-grid');

    if (expContainer && data.experience) {
      expContainer.innerHTML = data.experience
        .map(
          (item) => `
        <div class="timeline-node">
          <div class="node-marker">
            <span class="node-dot ${item.current ? 'node-dot-current' : ''}"></span>
          </div>
          <div class="node-content">
            <div class="node-header">
              <span class="node-period">${item.period}</span>
              <span class="node-badge ${item.current ? 'current-badge' : ''}">
                ${item.current ? '<span class="status-indicator" style="width:6px; height:6px;"></span>' : ''}
                ${item.type}
              </span>
            </div>
            <h3 class="node-title">${item.role}</h3>
            <h4 class="node-company">${item.company} &bull; <span class="node-loc">${item.location}</span></h4>
            <ul class="node-bullets">
              ${item.bullets.map((b) => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        </div>
      `
        )
        .join('');
    }

    if (eduContainer && data.education) {
      eduContainer.innerHTML = data.education
        .map(
          (edu) => `
        <div class="timeline-node">
          <div class="node-marker">
            <span class="node-dot"></span>
          </div>
          <div class="node-content">
            <div class="node-header">
              <span class="node-period">${edu.period}</span>
              <span class="node-badge grade-badge">${edu.grade}</span>
            </div>
            <h3 class="node-title">${edu.degree}</h3>
            <h4 class="node-company">${edu.institution} &bull; <span class="node-loc">${edu.location}</span></h4>
            <p class="node-field">${edu.field}</p>
            <ul class="node-bullets">
              ${edu.highlights.map((h) => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        </div>
      `
        )
        .join('');
    }

    if (certContainer && data.certificationsAndWorkshops) {
      certContainer.innerHTML = data.certificationsAndWorkshops
        .map(
          (cert) => `
        <div class="cert-card">
          <div class="cert-header">
            <span class="cert-badge">VERIFIED</span>
            <span class="cert-period">${cert.period}</span>
          </div>
          <h4 class="cert-title">${cert.title}</h4>
          <div class="cert-issuer">${cert.issuer}</div>
          <p class="cert-desc">${cert.desc}</p>
        </div>
      `
        )
        .join('');
    }
  }

  // 4. Mobile Navigation Drawer
  function initMobileMenu() {
    const burger = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    const links = document.querySelectorAll('.drawer-link');

    if (!burger || !drawer) return;

    burger.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('active');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });

    links.forEach((l) => {
      l.addEventListener('click', () => {
        drawer.classList.remove('active');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 5. Sticky Header & Active Nav Highlights
  function initScrollSpy() {
    const navbar = document.getElementById('main-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
      const scrollY = window.pageYOffset;

      if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 60);
      }

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // 6. Copy to Clipboard Functionality
  function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.copy-trigger');
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
          btn.classList.add('copied');

          setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }

  // 7. Contact Form Handler (Direct Telemetry Dispatch with Mailto Fallback)
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = form?.querySelector('button[type="submit"]');
    let statusTimer = null;
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (statusTimer) clearTimeout(statusTimer);

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const subject = document.getElementById('contact-subject')?.value.trim() || 'Embedded Engineering Inquiry';
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.style.display = 'block';
          formStatus.className = 'form-status status-error';
          formStatus.textContent = 'ERROR: Please complete all mandatory telemetry fields (Name, Email, Message).';
        }
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (formStatus) {
          formStatus.style.display = 'block';
          formStatus.className = 'form-status status-error';
          formStatus.textContent = 'ERROR: Invalid transmitter address syntax.';
        }
        return;
      }

      // Fallback mailto URL in case of offline/network issues
      const mailtoUrl = `mailto:${data.profile.email}?subject=${encodeURIComponent(
        `[Portfolio] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nTransmitted via M. Hari Prasad Embedded Portfolio`
      )}`;

      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-telemetry">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          Transmitting Packet...
        `;
      }

      if (formStatus) {
        formStatus.style.display = 'block';
        formStatus.className = 'form-status status-sending';
        formStatus.textContent = 'TRANSMITTING TELEMETRY: Establishing secure connection...';
      }

      try {
        const response = await fetch('/api/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, subject, message })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          if (formStatus) {
            formStatus.style.display = 'block';
            formStatus.className = 'form-status status-success';
            formStatus.textContent = 'TRANSMISSION CONFIRMED: Message successfully delivered to M. Hari Prasad!';
            
            // Auto-dismiss confirmation after exactly 5 seconds
            statusTimer = setTimeout(() => {
              formStatus.style.display = 'none';
              formStatus.className = 'form-status';
              formStatus.textContent = '';
            }, 5000);
          }
          form.reset();
        } else {
          throw new Error(result.error || 'Server rejected telemetry packet.');
        }
      } catch (err) {
        console.warn('Telemetry fetch dispatch error, providing fallback:', err);
        if (formStatus) {
          formStatus.style.display = 'block';
          formStatus.className = 'form-status status-error';
          formStatus.innerHTML = `TRANSMISSION INTERRUPTED: ${err.message || 'Could not reach server endpoint.'} <br><a href="${mailtoUrl}" style="color:#00f0ff; text-decoration:underline; font-weight:700; margin-top:6px; display:inline-block;">Click here to dispatch directly via default email client &rarr;</a>`;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  // 8. Seamless Looping Native Video Players
  function initVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach((v) => {
      v.muted = true;
      v.setAttribute('playsinline', '');
      v.setAttribute('loop', '');

      // Infinite loop guarantee without hitching or pause
      v.addEventListener('ended', () => {
        v.currentTime = 0;
        v.play().catch(() => {});
      });

      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // In case of strict browser autoplay policies, play on first user interaction
          const resumeOnInteract = () => {
            v.play().catch(() => {});
            window.removeEventListener('click', resumeOnInteract);
            window.removeEventListener('scroll', resumeOnInteract);
            window.removeEventListener('touchstart', resumeOnInteract);
          };
          window.addEventListener('click', resumeOnInteract, { once: true });
          window.addEventListener('scroll', resumeOnInteract, { once: true });
          window.addEventListener('touchstart', resumeOnInteract, { once: true });
        });
      }
    });
  }

  // 9. Interactive Google Maps Pinpoint Handler
  function initLocationPinpoint() {
    const locCard = document.getElementById('location-contact-card');
    if (!locCard) return;

    locCard.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      window.open('https://www.google.com/maps/search/?api=1&query=11.1085,77.3411', '_blank', 'noopener,noreferrer');
    });
  }

  // 10. High-Tech Preloader Controller (Boot Animation)
  function initPreloader() {
    const preloader = document.getElementById('site-preloader');
    if (!preloader) return;

    const bar = document.getElementById('preloader-bar');
    const counter = document.getElementById('preloader-counter');
    const status = document.getElementById('preloader-status');
    const video = document.getElementById('preloader-video');

    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {});
    }

    const totalDuration = 3800; // ~3.8 seconds (fits within 3 to 5 second requirement)
    const startTime = performance.now();

    const statusSteps = [
      { pct: 0, text: '[ SYSTEM BOOT ] Initializing ARM7 & STM32 Firmware Core...' },
      { pct: 24, text: '[ BUS PERIPHERALS ] Calibrating CAN 2.0B, SPI & I2C Registers...' },
      { pct: 52, text: '[ REAL-TIME KERNEL ] Spawning FreeRTOS Preemptive Schedulers...' },
      { pct: 75, text: '[ TELEMETRY STACK ] Synchronizing Sensor Telemetry & Gateways...' },
      { pct: 95, text: '[ STATUS: READY ] System Synchronized // Launching Portfolio...' }
    ];

    let dismissed = false;

    function finish() {
      if (dismissed) return;
      dismissed = true;

      if (bar) bar.style.width = '100%';
      if (counter) counter.textContent = '100%';
      if (status) {
        status.textContent = '[ STATUS: READY ] Portfolio Runtime Verified // Welcome';
        status.style.color = '#00d4ff';
      }

      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.remove('preloader-active');
        window.scrollTo(0, 0);

        setTimeout(() => {
          preloader.style.display = 'none';
          if (video) {
            try { video.pause(); } catch (e) {}
          }
        }, 850);
      }, 350);
    }

    function update(now) {
      if (dismissed) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);

      // Smooth ease-out curve
      const ease = 1 - Math.pow(1 - progress, 2.5);
      const currentPct = Math.round(ease * 100);

      if (bar) bar.style.width = `${currentPct}%`;
      if (counter) counter.textContent = `${String(currentPct).padStart(2, '0')}%`;

      let currentText = statusSteps[0].text;
      for (let i = statusSteps.length - 1; i >= 0; i--) {
        if (currentPct >= statusSteps[i].pct) {
          currentText = statusSteps[i].text;
          break;
        }
      }
      if (status && status.textContent !== currentText) {
        status.textContent = currentText;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        finish();
      }
    }

    requestAnimationFrame(update);

    // Bulletproof safety fallback (max 4.8s)
    setTimeout(finish, 4800);
  }

  // Init on DOM ready
  window.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    renderSkills();
    renderTimelines();
    initMobileMenu();
    initScrollSpy();
    initCopyButtons();
    initContactForm();
    initVideos();
    initLocationPinpoint();
  });
})();

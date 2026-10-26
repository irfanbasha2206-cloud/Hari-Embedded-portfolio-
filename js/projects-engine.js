/**
 * INTERACTIVE PCB MOTHERBOARD ENGINE & PROJECT ARCHITECTURE MODAL
 * Controls surface-mount IC chips on the PCB board, dynamic inspection bay, and grid view
 */

(function () {
  'use strict';

  const { projects } = window.PORTFOLIO_DATA || {};
  if (!projects) return;

  // DOM Elements
  const pcbChipsGrid = document.getElementById('pcb-chips-grid');
  const inspectionBay = document.getElementById('pcb-inspection-bay');
  const gridContainer = document.getElementById('projects-grid');
  const pcbContainer = document.getElementById('pcb-board-container');
  const gridSection = document.getElementById('projects-grid-section');
  const tabPcb = document.getElementById('tab-view-pcb');
  const tabGrid = document.getElementById('tab-view-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Modal Elements
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBackdrop = document.getElementById('modal-backdrop');

  // PCB Chip Mapping to Projects
  const PCB_CHIPS = [
    {
      id: 'can-elevator',
      ref: 'U1',
      part: 'NXP LPC2129',
      pkg: 'LQFP-64 (ARM7TDMI 60MHz)',
      label: 'CAN Multi-Node Elevator Network'
    },
    {
      id: 'cleanroom-monitor',
      ref: 'U2',
      part: 'ESP32-WROOM-32',
      pkg: 'Dual Xtensa LX6 + TLS WiFi',
      label: 'Cleanroom Environmental Safety'
    },
    {
      id: 'airbag-safety',
      ref: 'U3',
      part: 'MCP2551 / TJA1050',
      pkg: 'SOIC-8 CAN Transceiver + Crash ISR',
      label: 'Automotive Airbag & Crash Controller'
    },
    {
      id: 'vehicle-safety',
      ref: 'U4',
      part: 'ESP8266-12F',
      pkg: 'Wi-Fi SoC + ADC Sensor Bus',
      label: 'Connected Vehicle Safety Telematics'
    },
    {
      id: 'fall-detection',
      ref: 'U5',
      part: 'MPU-6050 + MAX30102',
      pkg: 'QFN-24 6-DOF IMU Sensor Hub',
      label: 'Biomedical Telemetry & Fall Detection'
    },
    {
      id: 'public-transport',
      ref: 'U6',
      part: 'SYN480R / 433MHz',
      pkg: 'Superheterodyne RF Transceiver',
      label: 'Public Transit Seat Availability'
    },
    {
      id: 'smart-home-arm7',
      ref: 'U7',
      part: 'ULN2003A + HC-05',
      pkg: 'SOIC-16 Darlington Array Driver',
      label: 'LPC2129 Dual-Mode Smart Home'
    },
    {
      id: 'solar-mower',
      ref: 'U8',
      part: 'L298N DUAL H-BRIDGE',
      pkg: 'TO-220 Power Stage + MPPT',
      label: 'Autonomous Solar Smart Lawn Mower'
    }
  ];

  // Code snippets for each project
  const PROJECT_CODE_SNIPPETS = {
    'can-elevator': `// CAN Controller Initialization & Message Filtering on LPC2129 ARM7
void CAN1_Init(void) {
    PINSEL1 |= (1 << 18) | (1 << 16); // Select P0.25 (RD1) and P0.24 (TD1)
    C1MOD = 0x01;                     // Enter Reset Mode to configure timing
    C1BTR = 0x001C001D;               // 250 kbps @ VPB 15MHz (BRP=29, TSEG1=12, TSEG2=3)
    AFMR = 0x01;                      // Bypass acceptance filter during init
    C1IER = (1 << 0);                 // Enable Receive Interrupt (RIE)
    C1MOD = 0x00;                     // Return to Normal Operating Mode
}

void CAN1_Rx_ISR(void) __irq {
    uint32_t can_id = C1RID;
    if (can_id == 0x001) {            // Emergency Override Frame
        Emergency_Stop_Actuator();
        LCD_Display("EMERGENCY STOP");
    } else if (can_id == 0x101) {     // Floor 1 Call
        Move_Elevator(FLOOR_1);
    }
    VICVectAddr = 0;                  // Acknowledge VIC
}`,

    'cleanroom-monitor': `// Multi-Sensor Telemetry & TLS HTTPS Posting on ESP32
#include <Wire.h>
#include <Adafruit_BMP085.h>
#include <WiFiClientSecure.h>

void postCleanroomTelemetry() {
    float pressure = bmp.readPressure() / 100.0F; // Convert Pa to hPa
    float temp = bmp.readTemperature();
    int vocPPM = analogRead(MQ135_PIN);
    float currentAmps = readCurrentTransformer();

    if (pressure < MIN_CLEANROOM_PRESSURE) {
        digitalWrite(ALARM_STROBE_PIN, HIGH);
    }

    WiFiClientSecure client;
    client.setInsecure();
    if (client.connect("iotcloud22.in", 443)) {
        String payload = "{\\"press\\":" + String(pressure) + 
                         ",\\"temp\\":" + String(temp) + 
                         ",\\"voc\\":" + String(vocPPM) + "}";
        client.println("POST /4933/post_value.php HTTP/1.1");
        client.println("Host: iotcloud22.in");
        client.println("Content-Type: application/json");
        client.println("Content-Length: " + String(payload.length()));
        client.println();
        client.println(payload);
    }
}`,

    'public-transport': `// 433 MHz RF Wireless Telemetry Synchronization
struct BusPayload {
    uint8_t busID;
    uint8_t totalSeats;
    uint8_t vacantSeats;
    uint8_t doorState;
    uint16_t checksum;
};

void sendStationUpdate() {
    BusPayload payload;
    payload.busID = 14;
    payload.totalSeats = 40;
    payload.vacantSeats = calculateAvailableSeats();
    payload.doorState = isDoorLocked ? 1 : 0;
    payload.checksum = computeCRC16((uint8_t*)&payload, sizeof(payload) - 2);

    rfDriver.send((uint8_t*)&payload, sizeof(payload));
    rfDriver.waitPacketSent();
}`,

    'airbag-safety': `// High-Reliability Crash Qualification Interrupt Routine
void IRAM_ATTR Crash_Sensor_ISR() {
    unsigned long interruptTime = micros();
    // Fast debouncing & qualified deceleration window (> 15ms continuous high-G)
    if (interruptTime - lastShockTime > 15000) {
        int gForcePeak = analogRead(ACCEL_Z_PIN);
        if (gForcePeak > CRITICAL_CRASH_THRESHOLD) {
            GPIO_REG_WRITE(SOLENOID_TRIGGER_PIN, 1);
            GPIO_REG_WRITE(FUEL_CUTOFF_PIN, 1);
            audioBeaconActive = true;
            broadcastCANDistressFrame();
        }
    }
    lastShockTime = interruptTime;
}`,

    'vehicle-safety': `// Impairment Detection & Cloud SOS Dispatch on ESP8266
void evaluateDriverSafety() {
    int gasVal = analogRead(MQ135_PIN);
    int impactVal = digitalRead(PIEZO_VIBRATION_PIN);

    if (gasVal > ALCOHOL_HAZARD_THRESHOLD) {
        digitalWrite(STARTER_LOCKOUT_RELAY, LOW); // Disable starter motor
        lcd.print("IMPAIRMENT DETECTED");
        sendCloudIncidentAlert("ALCOHOL_LOCKOUT", gasVal);
    }

    if (impactVal == HIGH) {
        sendCloudIncidentAlert("COLLISION_IMPACT", 0);
    }
}`,

    'fall-detection': `// 6-DOF IMU Fall Detection Algorithm on ESP32
void checkFallVector() {
    sensors_event_t a, g, temp;
    mpu.getEvent(&a, &g, &temp);

    float totalG = sqrt(sq(a.acceleration.x) + sq(a.acceleration.y) + sq(a.acceleration.z));

    if (totalG < 0.5) {
        freefallStartTime = millis();
    }

    if (totalG > 2.8 && (millis() - freefallStartTime < 400)) {
        triggerFallCountdownGracePeriod();
    }
}`,

    'smart-home-arm7': `// Bare-Metal LPC2129 Register Control for Dual-Mode Automation
#include <LPC21xx.h>
#include "lcd.h"
#include "blueto.h"

int main() {
    IODIR0 |= (1 << 5) | (1 << 6) | (1 << 2) | (1 << 18);
    EXT_INIT();   // Initialize external pushbuttons
    UART0_INIT();  // 9600 Baud 8-N-1
    UART0_INTR();  // Enable VIC UART0 interrupt vector
    LCD_INIT();    // 4-Bit HD44780 Nibble Mode
    
    LCD_STR("Smart Home Link");
    while (1) {
        if (applianceState == 0) {
            IOCLR0 = (1 << 2) | (1 << 18);
        } else {
            IOSET0 = (1 << 2) | (1 << 18);
        }
    }
}`,

    'solar-mower': `// Obstacle Avoidance Finite State Machine
enum MowerState { IDLE, FORWARD_SWEEP, OBSTACLE_DETECTED, REVERSE_ESCAPE, PIVOT_TURN };
MowerState currentState = FORWARD_SWEEP;

void updateMowerNavigation() {
    float frontDistance = readUltrasonic(TRIG_FRONT, ECHO_FRONT);
    float batteryVoltage = readBatterySense() * VOLTAGE_DIVIDER_RATIO;

    if (batteryVoltage < LOW_BATTERY_CUTOFF) {
        stopBladeMotor();
        currentState = IDLE;
        return;
    }

    switch (currentState) {
        case FORWARD_SWEEP:
            driveMotorsForward(PWM_SWEEP_SPEED);
            if (frontDistance < OBSTACLE_DISTANCE_CM) {
                currentState = OBSTACLE_DETECTED;
            }
            break;
        case OBSTACLE_DETECTED:
            stopDriveMotors();
            currentState = REVERSE_ESCAPE;
            break;
        case REVERSE_ESCAPE:
            driveMotorsReverse(PWM_REVERSE_SPEED);
            delay(800);
            currentState = PIVOT_TURN;
            break;
        case PIVOT_TURN:
            pivotRandomAngle();
            currentState = FORWARD_SWEEP;
            break;
    }
}`
  };

  // 1. Render PCB Chips Grid
  function renderPCB() {
    if (!pcbChipsGrid) return;
    pcbChipsGrid.innerHTML = '';

    PCB_CHIPS.forEach((chip) => {
      const btn = document.createElement('button');
      btn.className = 'pcb-chip-btn';
      btn.setAttribute('data-id', chip.id);
      btn.setAttribute('aria-label', `Inspect IC ${chip.ref}: ${chip.part}`);

      btn.innerHTML = `
        <div class="chip-socket">
          <div class="chip-top-row">
            <span class="chip-ref-id">${chip.ref}</span>
            <span class="chip-led"></span>
          </div>
          <div class="chip-part-name">${chip.part}</div>
          <div class="chip-pkg">${chip.pkg}</div>
        </div>
        <div class="chip-project-label">
          <span>${chip.label}</span>
          <span class="chip-click-hint">POPUP &rarr;</span>
        </div>
      `;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.pcb-chip-btn').forEach((b) => b.classList.remove('active-chip'));
        btn.classList.add('active-chip');
        openProjectModal(chip.id);
      });

      pcbChipsGrid.appendChild(btn);
    });
  }

  // 2. Select Project & Populate Inspection Bay
  function selectPCBProject(projectId, chipInfo) {
    if (!inspectionBay) return;
    const p = projects.find((item) => item.id === projectId);
    if (!p) return;

    const chip = chipInfo || PCB_CHIPS.find((c) => c.id === projectId) || {
      ref: 'U1',
      part: 'MCU',
      pkg: 'SMD'
    };

    inspectionBay.innerHTML = `
      <div class="bay-left">
        <div class="bay-meta-header">
          <span class="bay-chip-badge">${chip.ref}: ${chip.part}</span>
          <span class="tech-tag" style="margin:0;">PACKAGE: ${chip.pkg}</span>
          <span class="tech-tag" style="margin:0; background:rgba(6,182,212,0.15); color:var(--cyan-primary);">
            DOMAIN: ${p.category.toUpperCase()}
          </span>
        </div>

        <h3 class="bay-title">${p.title}</h3>
        <p class="bay-objective">${p.objective}</p>

        <div class="bay-specs-grid">
          <div class="bay-spec-col">
            <span class="bay-spec-title">Hardware Architecture:</span>
            <ul class="bay-spec-list">
              ${p.hardware.slice(0, 3).map((h) => `<li>&bull; ${h}</li>`).join('')}
            </ul>
          </div>
          <div class="bay-spec-col">
            <span class="bay-spec-title">Firmware &amp; Protocols:</span>
            <ul class="bay-spec-list">
              ${p.firmware.slice(0, 3).map((f) => `<li>&bull; ${f}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="bay-actions">
          <button class="btn btn-primary btn-sm inspect-deep-btn" data-id="${p.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Inspect Full Architecture
          </button>
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub Repository
          </a>
        </div>
      </div>

      <div class="bay-right">
        <div class="bay-diagram-wrapper">
          <img src="${p.image}" alt="${p.title}" class="bay-diagram-img">
        </div>
        <pre class="bay-code-box"><code>${PROJECT_CODE_SNIPPETS[p.id] || '// Code available in GitHub'}</code></pre>
      </div>
    `;

    // Attach inspect deep listener
    const inspectBtn = inspectionBay.querySelector('.inspect-deep-btn');
    if (inspectBtn) {
      inspectBtn.addEventListener('click', () => openProjectModal(p.id));
    }
  }

  // 3. Render Conventional Grid View
  function renderGrid(filter = 'all') {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const filtered = filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

    filtered.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-category', p.category);

      const tagsHtml = p.tags
        .map((t) => `<span class="tech-tag">${t}</span>`)
        .join('');

      card.innerHTML = `
        <div class="project-img-wrapper">
          <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy" />
          <div class="project-category-badge">${p.category.toUpperCase()}</div>
        </div>
        <div class="project-body">
          <div class="project-tags">${tagsHtml}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.shortDesc}</p>
          
          <div class="project-footer">
            <button class="btn btn-primary btn-sm view-details-btn" data-id="${p.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Inspect Architecture
            </button>
            <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      `;

      gridContainer.appendChild(card);
    });

    document.querySelectorAll('.view-details-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        openProjectModal(btn.getAttribute('data-id'));
      });
    });
  }

  // 4. Modal System
  function openProjectModal(projectId) {
    const p = projects.find((item) => item.id === projectId);
    if (!p || !modal) return;

    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalImage = document.getElementById('modal-image');
    const modalObjective = document.getElementById('modal-objective');
    const modalHardware = document.getElementById('modal-hardware');
    const modalFirmware = document.getElementById('modal-firmware');
    const modalChallenges = document.getElementById('modal-challenges');
    const modalOutcomes = document.getElementById('modal-outcomes');
    const modalCode = document.getElementById('modal-code');
    const modalGithubLink = document.getElementById('modal-github-link');

    if (modalTitle) modalTitle.textContent = p.title;
    if (modalCategory) modalCategory.textContent = `SYSTEM DOMAIN: ${p.category.toUpperCase()}`;
    if (modalImage) {
      modalImage.src = p.image;
      modalImage.alt = p.title;
    }
    if (modalObjective) modalObjective.textContent = p.objective;

    if (modalHardware) {
      modalHardware.innerHTML = p.hardware
        .map((h) => `<li><span class="bullet-chip">HW</span> ${h}</li>`)
        .join('');
    }

    if (modalFirmware) {
      modalFirmware.innerHTML = p.firmware
        .map((f) => `<li><span class="bullet-chip bullet-fw">FW</span> ${f}</li>`)
        .join('');
    }

    if (modalChallenges) {
      modalChallenges.innerHTML = p.challenges
        .map((c) => `<li><span class="bullet-chip bullet-warn">ENG</span> ${c}</li>`)
        .join('');
    }

    if (modalOutcomes) modalOutcomes.textContent = p.outcomes;

    if (modalCode) {
      modalCode.textContent = PROJECT_CODE_SNIPPETS[p.id] || '// Code snippet available in GitHub repository';
    }

    if (modalGithubLink) {
      modalGithubLink.href = p.github;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 5. View Tab Switcher (PCB Explorer vs Grid)
  if (tabPcb && tabGrid) {
    tabPcb.addEventListener('click', () => {
      tabPcb.classList.add('active-tab');
      tabGrid.classList.remove('active-tab');
      if (pcbContainer) pcbContainer.style.display = 'block';
      if (gridSection) gridSection.style.display = 'none';
    });

    tabGrid.addEventListener('click', () => {
      tabGrid.classList.add('active-tab');
      tabPcb.classList.remove('active-tab');
      if (pcbContainer) pcbContainer.style.display = 'none';
      if (gridSection) gridSection.style.display = 'block';
      renderGrid('all');
    });
  }

  // 6. Filter Buttons for Grid View
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      const filter = btn.getAttribute('data-filter') || 'all';
      renderGrid(filter);
    });
  });

  // Initialize
  window.addEventListener('DOMContentLoaded', () => {
    renderPCB();
    renderGrid('all');
  });
})();

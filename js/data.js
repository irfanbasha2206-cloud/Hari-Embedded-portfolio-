/**
 * PORTFOLIO DATA CONFIGURATION
 * Engineer: M. Hari Prasad
 * Specialization: Embedded Systems & Firmware Engineering
 *
 * All content, projects, media paths, and links are managed here for easy editing.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "M. Hari Prasad",
    title: "Embedded Systems & Firmware Engineer",
    roleBadge: "HARDWARE-SOFTWARE INTEGRATION SPECIALIST",
    statusText: "SYSTEM OPERATIONAL // READY FOR DEPLOYMENT",
    location: "Tirupur & Coimbatore, Tamil Nadu, India",
    coordinates: "11.1085° N, 77.3411° E",
    email: "mhariprasad97@gmail.com",
    phone: "+91 8925027315",
    github: "https://github.com/hariprasad1706",
    linkedin: "https://www.linkedin.com/in/hari-prasad-m-92461b299",
    avatar: "assets/images/profile.jpg",
    resumeDocx: "assets/resume/M_Hariprasad_Resume.docx",
    resumeHtml: "assets/resume/M_Hariprasad_Resume.html",
    heroVideo: "assets/videos/hero-bg.mp4",
    closingVideo: "assets/videos/closing-tech.mp4",
    heroVideoDrive: "https://drive.google.com/file/d/1DZszvG-69-XoNwJJ0N--902rgXIpV8eY/view?usp=sharing",
    closingVideoDrive: "https://drive.google.com/file/d/1ISZfGD2j7AAY89UNB1oMkcm4PjtL7KQD/view?usp=sharing",
    bio: [
      "Electrical & Electronics Engineering graduate with specialized expertise in embedded systems, bare-metal C programming, and industrial multi-node communication networks.",
      "Hands-on background spanning ARM7 (LPC2129), STM32 Cortex-M, and ESP32 platforms. Experienced in architecting interrupt-driven firmware, FreeRTOS task scheduling, and bus-level protocols including CAN 2.0B, SPI, I2C, and UART.",
      "Combines real-world field engineering rigor from Safvolt Switchgears with intensive advanced embedded systems training at Vector India to build deterministic, memory-efficient, and safety-critical hardware solutions."
    ],
    stats: [
      { label: "Microcontroller Architectures", value: "8+", sub: "ARM7, STM32, ESP32, 8051" },
      { label: "Hardware Protocols Mastered", value: "5+", sub: "CAN, SPI, I2C, UART, RF" },
      { label: "Verified Projects Built", value: "8+", sub: "Automotive, Industrial, IoT" },
      { label: "Interrupt Latency Focus", value: "< 5µs", sub: "Bare-Metal Determinism" }
    ]
  },

  droneMilestones: [
    {
      frameRange: [1, 60],
      step: "PHASE 01 // CORE ARCHITECTURE",
      title: "Aerodynamics & Avionics Core",
      subtitle: "High-Strength Carbon Composite Airframe & Power Distribution",
      description: "Rigid lightweight quad-rotor chassis designed for minimal rotational inertia. Houses the centralized power distribution board (PDB) delivering clean 5V/3.3V regulated rails with transient voltage suppression (TVS) for sensitive digital logic.",
      specs: [
        { label: "Airframe", val: "3K Carbon Fiber Monocoque" },
        { label: "Bus Rail", val: "14.8V 4S LiPo Power Bus" },
        { label: "Power Reg", val: "Synchronous DC-DC Buck" }
      ]
    },
    {
      frameRange: [61, 120],
      step: "PHASE 02 // SENSOR FUSION",
      title: "6-DOF IMU Flight Controller",
      subtitle: "Sub-Millisecond Attitude Estimation & Filtering",
      description: "High-rate inertial measurement unit (MPU-6050 / ICM-42688) coupled with barometric altimeter. Employs complementary and Kalman filtering to eliminate gyroscope drift and accelerometer vibration noise at 1kHz loop frequencies.",
      specs: [
        { label: "Attitude Rate", val: "1000 Hz Sampling Loop" },
        { label: "Filter Type", val: "Extended Kalman / Complementary" },
        { label: "Bus Speed", val: "SPI @ 10 MHz Low-Jitter" }
      ]
    },
    {
      frameRange: [121, 180],
      step: "PHASE 03 // MOTOR DRIVERS",
      title: "BLDC Electronic Speed Controllers (ESC)",
      subtitle: "32kHz Ultrasonic PWM & Field-Oriented Timing",
      description: "Four independent high-current ESC stages featuring low RDS(on) MOSFET H-bridges. Synchronized timer capture/compare hardware generates microsecond-precise PWM pulses for immediate torque reaction and active motor braking.",
      specs: [
        { label: "Drive Protocol", val: "DShot600 / OneShot125" },
        { label: "PWM Frequency", val: "32 kHz Ultrasonic Switching" },
        { label: "Thermal Cap", val: "40A Continuous Rating" }
      ]
    },
    {
      frameRange: [181, 240],
      step: "PHASE 04 // RF TELEMETRY",
      title: "Dual-Band Telemetry & Failsafe",
      subtitle: "2.4GHz Control Link & 433MHz Long-Range Packet Bus",
      description: "Robust wireless link maintaining continuous bi-directional packet streaming for altitude, battery voltage, and GPS coordinates. Features automatic hardware failsafe: returns to launch upon signal loss or critical voltage drop.",
      specs: [
        { label: "RF Freq", val: "433 MHz + 2.4 GHz Diversity" },
        { label: "Failsafe", val: "Auto-RTL on Packet Drop" },
        { label: "Packet Loss", val: "< 0.01% with CRC Checksums" }
      ]
    },
    {
      frameRange: [241, 300],
      step: "PHASE 05 // AUTONOMOUS RTOS",
      title: "Autonomous Navigation & RTOS",
      subtitle: "Multi-Task FreeRTOS Real-Time Flight Kernel",
      description: "Preemptive real-time operating system executing flight stabilization, obstacle avoidance, and telemetry communication in isolated, prioritized tasks with mutexes preventing shared sensor data races.",
      specs: [
        { label: "OS Kernel", val: "FreeRTOS Preemptive Core" },
        { label: "Task Jitter", val: "< 2 Microseconds" },
        { label: "Fail-Safe", val: "Watchdog HW Supervision" }
      ]
    }
  ],

  skillCategories: [
    {
      id: "languages",
      title: "Programming Languages",
      icon: "code",
      accent: "cyan",
      skills: [
        { name: "C Programming", level: "Expert", desc: "Data structures, pointers, dynamic memory management, standard C libraries & algorithms" },
        { name: "Embedded C", level: "Expert", desc: "Bare-metal registers, bitwise manipulation, memory-mapped I/O, MISRA-C compliance" }
      ]
    },
    {
      id: "microcontrollers",
      title: "Microcontrollers & Silicon",
      icon: "cpu",
      accent: "amber",
      skills: [
        { name: "ARM7TDMI (NXP LPC2129)", level: "Advanced", desc: "Direct register programming, VIC interrupts, CAN engine" },
        { name: "STM32 (ARM Cortex-M)", level: "Advanced", desc: "STM32CubeIDE, HAL & LL drivers, DMA, NVIC, Timers" },
        { name: "ESP32 (Xtensa Dual-Core)", level: "Advanced", desc: "FreeRTOS integration, WiFi, BLE, TLS HTTPS, deep sleep" },
        { name: "ESP8266 / NodeMCU", level: "Advanced", desc: "IoT sensor telemetry, HTTP client, REST APIs" },
        { name: "8051 Architecture", level: "Intermediate", desc: "Timers, serial communication, register programming & C cross-compilation" }
      ]
    },
    {
      id: "protocols",
      title: "Protocols & Communication",
      icon: "network",
      accent: "blue",
      skills: [
        { name: "CAN Bus 2.0B", level: "Advanced", desc: "Arbitration IDs, message filters, MCP2551 transceivers, error frames" },
        { name: "SPI (Serial Peripheral)", level: "Advanced", desc: "Full-duplex master/slave, high-speed sensor streaming" },
        { name: "I2C (Inter-Integrated)", level: "Advanced", desc: "7-bit addressing, clock stretching, bus pullup tuning" },
        { name: "UART / USART", level: "Expert", desc: "Ring-buffer reception, baud rate generators, ISR processing" },
        { name: "433 MHz RF", level: "Advanced", desc: "FSK wireless transceivers, packet serialization, CRC validation" }
      ]
    },
    {
      id: "rtos",
      title: "RTOS & System Architecture",
      icon: "layers",
      accent: "purple",
      skills: [
        { name: "FreeRTOS Tasks & Schedulers", level: "Advanced", desc: "Preemptive priority-based context switching, idle hooks" },
        { name: "Inter-Task Queues", level: "Advanced", desc: "Thread-safe data exchange, blocking timeouts" },
        { name: "Semaphores & Mutexes", level: "Advanced", desc: "Resource locking, priority inversion mitigation (inheritance)" },
        { name: "Interrupt Handling (ISR)", level: "Advanced", desc: "Zero-latency entry, deferred interrupt processing via queues" },
        { name: "Embedded Linux", level: "Intermediate", desc: "Ubuntu command line, cross-compilers, GCC toolchain, GDB" },
        { name: "Shell / Bash", level: "Intermediate", desc: "Linux toolchains, compilation scripts, embedded Ubuntu" }
      ]
    },
    {
      id: "hardware",
      title: "Hardware, Sensors & EDA",
      icon: "circuit",
      accent: "emerald",
      skills: [
        { name: "Sensors & Peripherals", level: "Advanced", desc: "IMU (MPU6050), Pressure (BMP085), Gas (MQ135), Ultrasonic, CT" },
        { name: "Power & Motor Drivers", level: "Advanced", desc: "L298N H-Bridge, ULN2003, MOSFET switches, Relay isolation" },
        { name: "Displays & User Interface", level: "Advanced", desc: "16x2 HD44780 LCD (4-bit/8-bit), I2C OLED, Keypad matrices" },
        { name: "Schematic & Simulation", level: "Advanced", desc: "Proteus 8 VSM, KiCad EDA, virtual breadboard debugging" },
        { name: "Switchgear & Power", level: "Advanced", desc: "Industrial breaker mechanisms, panel diagnostics, field safety" }
      ]
    },
    {
      id: "tools",
      title: "Tools, Test & Debugging",
      icon: "tool",
      accent: "rose",
      skills: [
        { name: "STM32CubeIDE & Keil µVision", level: "Advanced", desc: "Firmware compilation, register inspector, breakpoint debugging" },
        { name: "Digital Storage Oscilloscopes", level: "Advanced", desc: "Waveform analysis, rise-time measurement, signal integrity" },
        { name: "Logic Analyzers", level: "Advanced", desc: "Protocol decoding (SPI, I2C, UART, CAN), timing verification" },
        { name: "Flash Magic & ST-Link", level: "Advanced", desc: "In-System Programming (ISP), JTAG/SWD target flashing" },
        { name: "Git & Version Control", level: "Advanced", desc: "Branching strategies, collaborative commits, GitHub workflows" }
      ]
    }
  ],

  projects: [
    {
      id: "can-elevator",
      title: "CAN-Based Multi-Node Elevator Control System",
      category: "automotive",
      tags: ["ARM7 LPC2129", "CAN 2.0B", "Embedded C", "MCP2551", "Priority Arbitration"],
      image: "assets/images/projects/can-elevator.svg",
      github: "https://github.com/hariprasad1706",
      shortDesc: "Deterministic multi-node industrial elevator control network powered by the NXP LPC2129 ARM7TDMI microcontroller and Controller Area Network (CAN 2.0B).",
      objective: "Eliminate point-to-point wiring complexity and guarantee sub-millisecond, collision-free communication between elevator landing call stations, cabin control, and motor drive controllers.",
      hardware: [
        "NXP LPC2129 (ARM7TDMI Core @ 60MHz)",
        "MCP2551 High-Speed CAN Transceivers",
        "120Ω Differential Termination Resistors",
        "L298N High-Current DC Motor H-Bridge Driver",
        "HD44780 16x2 Character LCD Modules",
        "Pushbutton Switch Matrix with Debounce Filters"
      ],
      firmware: [
        "Configured LPC2129 CAN controller registers (C1MOD, C1BTR, C1IER) for 250 kbps bus speed.",
        "Engineered 11-bit standard CAN message frames: ID 0x001 (Emergency Override - highest priority), ID 0x101 (Floor 1 Call), ID 0x102 (Floor 2 Call).",
        "Implemented CAN message acceptance filter (AF) to instantly discard irrelevant network traffic.",
        "Built state machine managing lift floor transitions, door open/close timers, and DC motor PWM speed throttling."
      ],
      challenges: [
        "Preventing message starvation during continuous floor requests through CAN identifier priority balancing.",
        "Eliminating bus reflection and transmission errors via precise 120-ohm differential line termination.",
        "Handling motor inductive kickback noise through opto-isolation and flyback diode clamp protection."
      ],
      outcomes: "Demonstrated zero-collision multi-node message delivery with < 1ms response latency across all 3 elevator nodes."
    },
    {
      id: "cleanroom-monitor",
      title: "Smart Safety Monitoring System for Semiconductor Cleanrooms",
      category: "iot",
      tags: ["ESP32", "I2C Bus", "BMP085", "Sensors", "TLS HTTPS IoT"],
      image: "assets/images/projects/cleanroom-monitor.svg",
      github: "https://github.com/hariprasad1706/Smart-Safety-Monitoring-System-for-Semiconductor-Cleanrooms",
      shortDesc: "Continuous industrial IoT safety telemetry acquisition unit for ISO semiconductor cleanrooms monitoring differential air pressure, VOC gases, and vibration.",
      objective: "Safeguard wafer fabrication environments by continuously tracking ambient air pressure, toxic chemical vapors, equipment vibration, and HVAC current draw with real-time cloud dispatch.",
      hardware: [
        "ESP32 Dual-Core Xtensa LX6 SoC",
        "BMP085 Precision Digital Barometric Pressure Sensor (I2C)",
        "DHT11 Relative Humidity & Ambient Temperature Sensor",
        "MQ-135 Hazardous Gas & VOC Air Quality Detector",
        "SW-420 High-Sensitivity Vibration Sensor",
        "Current Transformer (CT) Non-Invasive AC Current Probe"
      ],
      firmware: [
        "Engineered non-blocking sensor acquisition loop using FreeRTOS periodic timers.",
        "Calibrated I2C communication at 100kHz standard mode with software error recovery on bus lockup.",
        "Built analog sampling routine with moving-average filtering for stable gas PPM calculations.",
        "Implemented secure WiFiClientSecure HTTPS POST protocol transmitting JSON telemetry to remote IoT analytics platform."
      ],
      challenges: [
        "Mitigating sensor reading fluctuations caused by cleanroom airflow turbulence using sliding window digital filtering.",
        "Ensuring bulletproof WiFi reconnection and telemetry queue persistence during network outages."
      ],
      outcomes: "24/7 automated monitoring of cleanroom atmospheric integrity with automated alerts triggered when positive pressure drops below safety thresholds."
    },
    {
      id: "public-transport",
      title: "IoT-Based Public Transport Tracking & Seat Availability Framework",
      category: "iot",
      tags: ["ESP32", "433 MHz RF", "Ultrasonic", "Infrared", "Real-Time Telemetry"],
      image: "assets/images/projects/public-transport.svg",
      github: "https://github.com/hariprasad1706/oT-Based-Smart-Public-Transport-Framework-for-Location-Tracking-and-Seat-Availability-Monitoring-",
      shortDesc: "Dual-station intelligent transit solution linking bus onboard telemetry with bus stop stations using 433 MHz wireless RF communication.",
      objective: "Automate passenger occupancy counting, detect individual seat vacancies, control passenger doors, and broadcast live seat availability to waiting passengers at upcoming stations.",
      hardware: [
        "ESP32 Microcontroller (Bus Onboard Unit)",
        "Secondary Microcontroller (Bus Stop Station Unit)",
        "433 MHz RF Transmitter & Superheterodyne Receiver Modules",
        "Dual Ultrasonic HC-SR04 Directional Passenger Counters",
        "Infrared (IR) Optical Seat Sensor Matrix",
        "High-Torque SG90 Servo Actuator for Automatic Doors",
        "16x2 I2C Display & Color-Coded Capacity Indicator LEDs"
      ],
      firmware: [
        "Dual-sensor beam-break algorithm determining passenger entry vs exit direction with anti-crowd debounce.",
        "Seat occupancy array scanner updating a compact bitmask payload for fast RF transmission.",
        "Custom 433 MHz RF packet protocol with preamble, payload length, station ID, and CRC checksum.",
        "Servo control library generating smooth PWM sweeps for automated, anti-pinch door closing."
      ],
      challenges: [
        "Resolving directional ambiguity when passengers enter in close succession through sequential ultrasonic timing.",
        "Overcoming 433 MHz RF multipath interference in urban transit corridors through redundant transmission bursts."
      ],
      outcomes: "Real-time seat count delivered to station displays within 200ms of bus approach, eliminating station overcrowding."
    },
    {
      id: "airbag-safety",
      title: "Automotive Airbag & Impact Safety Deployment Controller",
      category: "automotive",
      tags: ["Embedded C", "Safety-Critical", "Interrupts", "Crash Detection", "Buzzer Alert"],
      image: "assets/images/projects/airbag-system.svg",
      github: "https://github.com/hariprasad1706/Airbag-Safety-System",
      shortDesc: "High-reliability vehicle collision detection and rapid airbag deployment system featuring sub-2.5 millisecond interrupt qualification logic.",
      objective: "Deliver deterministic crash detection that qualifies real impact events from road potholes, deploys protective safety mechanisms, and triggers emergency hazard broadcasts.",
      hardware: [
        "High-Speed Microcontroller Unit",
        "Frontal & Lateral Impact G-Force Deceleration Sensors",
        "High-Current Solenoid Actuator / Pyrotechnic Deployment Stage",
        "High-Decibel Piezo Emergency Audio Beacon",
        "High-Luminance Strobe LED Visual Indicators",
        "Opto-Isolated Ignition & Fuel Pump Cutoff Relays"
      ],
      firmware: [
        "Interrupt Service Routine (ISR) mapped to external hardware interrupt pin INT0 for immediate trigger.",
        "Dual-threshold qualification algorithm: analyzes both peak deceleration amplitude and pulse duration (> 15ms) to filter false shocks.",
        "Single-shot non-blocking deployment driver with hardware watchdog timer supervision.",
        "Automatic engine ignition cutoff trigger to prevent post-crash electrical fires."
      ],
      challenges: [
        "Eliminating false-positive deployments caused by rough terrain, curb bumps, or slamming doors.",
        "Maintaining ultra-low firmware execution latency (< 2.5ms) from collision impact to deployment output."
      ],
      outcomes: "Validated 100% successful deployment response in simulated high-speed deceleration tests while rejecting non-critical shock vibrations."
    },
    {
      id: "vehicle-safety",
      title: "IoT-Based Connected Vehicle Safety Alert & Telematics",
      category: "iot",
      tags: ["ESP8266 NodeMCU", "MQ-135 Gas", "Vibration", "Cloud API", "Telematics"],
      image: "assets/images/projects/vehicle-safety.svg",
      github: "https://github.com/hariprasad1706/IoT-Based-Vehicle-Safety-Alert-System-",
      shortDesc: "Intelligent in-cabin driver monitoring and post-collision SOS telematics unit utilizing ESP8266 and secure IoT cloud endpoints.",
      objective: "Detect hazardous in-cabin conditions (alcohol vapor, smoke, carbon monoxide) and vehicle roll/impact events, preventing impaired driving and initiating instant rescue alerts.",
      hardware: [
        "ESP8266 NodeMCU Wi-Fi SoC",
        "MQ-135 Multi-Gas / Alcohol Vapor Sensor",
        "Piezoelectric Impact Vibration Detector",
        "Vehicle Starter Interlock Relay",
        "Piezo Audio Warning Buzzer"
      ],
      firmware: [
        "Continuous ADC sampling of MQ-135 analog voltage with baseline air calibration.",
        "Engine starter lockout logic: deactivates ignition relay if alcohol vapor concentration exceeds safety limits.",
        "Secure HTTPS POST request formatting sending alert payloads (incident type, timestamp, sensor values) to cloud endpoint.",
        "Fail-safe local alarm loop ensuring buzzer and visual strobe operate even if wireless connection drops."
      ],
      challenges: [
        "Calibrating gas sensor sensitivity to avoid false alarms from cleaning solvents while detecting alcohol accurately.",
        "Maintaining low standby current draw to avoid draining the vehicle battery."
      ],
      outcomes: "Automatic driver impairment lockout and sub-3 second cloud notification dispatch to emergency response contacts."
    },
    {
      id: "fall-detection",
      title: "IoT Health Telemetry & IMU Fall Detection System",
      category: "iot",
      tags: ["ESP32", "MPU-6050", "I2C Bus", "MAX30102", "Health IoT"],
      image: "assets/images/projects/fall-detection.svg",
      github: "https://github.com/hariprasad1706/IoT-Based-Health-Monitoring-and-Fall-Detection-System-Using-ESP32-",
      shortDesc: "Wearable biomedical telemetry node combining 6-axis inertial motion analysis for fall detection with optical pulse and temperature sensing.",
      objective: "Protect elderly or high-risk individuals by continuously monitoring physiological vitals and detecting sudden falls using multi-stage acceleration vector algorithms.",
      hardware: [
        "ESP32 Microcontroller with Bluetooth / Wi-Fi",
        "MPU-6050 6-Axis Accelerometer and Gyroscope",
        "MAX30102 Optical Heart Rate & SpO2 Pulse Oximeter",
        "Digital Body Surface Temperature Sensor",
        "Active Audio Buzzer & User Cancellation Pushbutton"
      ],
      firmware: [
        "Fall detection algorithm: 1) Free-fall weightlessness detection (low acceleration vector), 2) High-G impact spike, 3) Orientation tilt angle calculation (> 60°), 4) Post-fall immobility verification.",
        "30-second user grace period with buzzer countdown to allow cancellation of false alarms before dispatch.",
        "I2C fast-mode communication polling MPU-6050 registers at 100Hz.",
        "HTTPS cloud transmission of real-time heart rate (BPM), blood oxygen saturation (SpO2), and fall status."
      ],
      challenges: [
        "Distinguishing between intentional sitting or jumping onto a bed versus an actual catastrophic fall.",
        "Optimizing I2C bus bandwidth sharing between high-rate IMU polling and optical pulse sensor streaming."
      ],
      outcomes: "Achieved > 92% fall detection accuracy in bench testing with zero delay emergency alert delivery."
    },
    {
      id: "smart-home-arm7",
      title: "LPC2129 Dual-Mode Smart Home Automation Controller",
      category: "bare-metal",
      tags: ["ARM7 LPC2129", "Bare-Metal C", "UART ISR", "HC-05 Bluetooth", "ULN2003"],
      image: "assets/images/projects/smart-home-arm7.svg",
      github: "https://github.com/hariprasad1706/Baced-Smarthome-Dual-Mode-Home-Automation-system",
      shortDesc: "Bare-metal C embedded controller on NXP LPC2129 featuring dual manual and wireless Bluetooth SPP appliance switching with 16x2 LCD.",
      objective: "Build an ultra-reliable, zero-lag home automation controller capable of accepting both physical manual switch inputs and wireless smartphone commands through interrupt routines.",
      hardware: [
        "NXP LPC2129 Microcontroller (ARM7TDMI-S Architecture)",
        "HC-05 Bluetooth Serial Port Profile (SPP) Module",
        "ULN2003 Darlington Transistor Array Driver",
        "16x2 HD44780 Alphanumeric LCD in 4-Bit Nibble Mode",
        "Tactile Switch Panel for Manual Override",
        "Opto-Coupled Relay Board for 230V AC Appliances"
      ],
      firmware: [
        "Bare-metal C without external vendor abstractions; configured IODIR0, IOCLR0, and IOSET0 registers directly.",
        "Vectored Interrupt Controller (VIC) setup for UART0 RX interrupt triggering on received ASCII command characters.",
        "External Interrupt (EXTINT) configuration for instantaneous hardware pushbutton response.",
        "Custom 4-bit LCD driver library executing initialization sequences (0x28, 0x0C, 0x06, 0x01) with microsecond delay loops."
      ],
      challenges: [
        "Synchronizing state transitions so manual switch toggles and Bluetooth commands never cause relay state conflicts.",
        "Ensuring glitch-free LCD updates during concurrent UART interrupt receptions."
      ],
      outcomes: "Sub-microsecond command execution with instantaneous LCD status reflection and zero system crashes."
    },
    {
      id: "solar-mower",
      title: "Autonomous Sensor-Based Solar Smart Lawn Mower",
      category: "robotics",
      tags: ["Robotics", "Ultrasonic", "Solar MPPT", "L298N", "Embedded Navigation"],
      image: "assets/images/projects/solar-mower.svg",
      github: "https://github.com/hariprasad1706",
      shortDesc: "Solar-powered autonomous robotic lawn maintenance vehicle equipped with ultrasonic obstacle avoidance and intelligent motor control.",
      objective: "Deliver an eco-friendly, self-sustaining lawn cutting robot that navigates domestic lawns autonomously without manual intervention or boundary wire installation.",
      hardware: [
        "Embedded Navigation Microcontroller",
        "High-Efficiency Monocrystalline Photovoltaic Solar Panel",
        "Solar MPPT Battery Charge Controller",
        "12V Rechargeable Li-Ion / Sealed Lead-Acid Battery Bank",
        "Dual Ultrasonic HC-SR04 Transducer Sensors",
        "L298N Dual H-Bridge Motor Driver Module",
        "High-Torque DC Geared Drive Motors & High-Speed Cutter Motor"
      ],
      firmware: [
        "Finite State Machine (FSM) navigation: FORWARD, OBSTACLE_DETECTED, REVERSE_ESCAPE, PIVOT_TURN, RESUME_SWEEP.",
        "Ultrasonic distance echo timing using hardware timer input capture.",
        "PWM dual-speed motor modulation providing smooth turns and preventing wheel slippage on wet grass.",
        "Battery voltage threshold monitor to automatically stop cutting blade when battery level falls below safety cutoff."
      ],
      challenges: [
        "Balancing solar generation rate against motor power consumption to maximize operational duty cycle.",
        "Preventing the robot from getting trapped in corner obstacles through randomized turn angle escape logic."
      ],
      outcomes: "Autonomous lawn cutting operation with 100% collision prevention and sustainable solar battery recharging."
    }
  ],

  experience: [
    {
      company: "Fabhost Web Solutions",
      role: "Embedded Engineer",
      period: "June 2026 – Present",
      location: "T. Nagar, Chennai, Tamil Nadu, India",
      type: "Full-Time Core Engineering // Current Role",
      current: true,
      bullets: [
        "Architecting, developing, and deploying production-grade firmware for high-uptime IoT edge gateways, industrial telemetry nodes, and smart sensor instrumentation platforms using STM32 (ARM Cortex-M) and ESP32 microcontrollers.",
        "Engineering deterministic real-time multitasking systems with FreeRTOS: configured priority-preemptive schedulers, thread-safe inter-task queues, binary semaphores, and mutexes with priority inheritance to eliminate race conditions.",
        "Developing robust low-level bare-metal device drivers for SPI, I2C, UART, and RS-485 / Modbus RTU communication buses, achieving deterministic interrupt response latencies under 5µs.",
        "Implementing secure cloud-connected telemetry stacks utilizing MQTT over TLS and HTTPS REST APIs, integrating JSON serialization, dynamic Wi-Fi/GSM failover, and persistent non-volatile flash logging during network dropouts.",
        "Designing custom schematic captures and multi-layer PCB carrier board layouts, executing hardware board bring-up, signal integrity validation, and in-circuit debugging using Digital Storage Oscilloscopes (DSO), logic analyzers, and JTAG/SWD debuggers.",
        "Building fail-safe Over-The-Air (OTA) firmware upgrade routines featuring dual-partition flash memory bank swap, cryptographic image verification, and automatic rollback protection with 99.9% field reliability."
      ]
    },
    {
      company: "Safvolt Switchgears Pvt Ltd",
      role: "Service Engineer",
      period: "April 2024 – June 2025",
      location: "Coimbatore, Tamil Nadu, India",
      type: "Full-Time Industrial Experience",
      bullets: [
        "Conducted comprehensive field servicing, diagnostic troubleshooting, testing, and commissioning of industrial switchgear systems, vacuum circuit breakers (VCB), and motor control centers (MCC).",
        "Identified electrical fault root causes, insulation failures, and contact wear, dramatically minimizing unscheduled plant downtime for manufacturing clients.",
        "Ensured strict compliance with industrial electrical safety standards, protection relay coordination, and breaker timing measurements.",
        "Collaborated with cross-functional plant engineering teams to optimize equipment maintenance intervals and field documentation."
      ]
    }
  ],

  education: [
    {
      institution: "Dr. N.G.P. Institute of Technology",
      degree: "Bachelor of Engineering (B.E.)",
      field: "Electrical and Electronics Engineering (EEE)",
      period: "2021 – 2024",
      location: "Coimbatore, Tamil Nadu",
      grade: "CGPA: 7.50 / 10.0",
      highlights: [
        "Specialized in Embedded Systems, Microprocessors & Microcontrollers, Power Electronics, and Control Systems.",
        "Lead developer for final-year engineering projects in embedded automation and IoT."
      ]
    },
    {
      institution: "Konghu Velalar Polytechnic College",
      degree: "Diploma in Engineering",
      field: "Electrical and Electronics Engineering (EEE)",
      period: "2019 – 2021",
      location: "Erode, Tamil Nadu",
      grade: "Score: 77.0% (First Class with Distinction)",
      highlights: [
        "Gained solid foundations in electrical circuits, digital electronics, instrumentation, and workshop practice."
      ]
    },
    {
      institution: "Vector India Private Limited",
      degree: "Advanced Embedded Systems Engineering Trainee",
      field: "Embedded Systems & Real-Time Firmware Architecture",
      period: "June 2025 – March 2026",
      location: "Chennai, Tamil Nadu, India",
      grade: "Intensive Professional Training",
      highlights: [
        "Underwent intensive specialized hands-on training in ARM (ARM7TDMI / LPC2129, ARM Cortex-M) and 8051 microcontroller hardware architectures.",
        "Mastered low-level C programming, bitwise operations, memory layout, register configuration, and peripheral driver development.",
        "Developed end-to-end communication drivers for CAN 2.0B, SPI, I2C, and UART serial protocols.",
        "Implemented multitasking architectures using FreeRTOS (tasks, queues, semaphores, mutexes) and Linux network socket programming (TCP/IP, UDP)."
      ]
    }
  ],

  certificationsAndWorkshops: [
    {
      title: "Advanced Embedded Systems Engineering",
      issuer: "Vector India Private Limited",
      period: "2025 – 2026",
      desc: "Comprehensive certification covering ARM architecture, Embedded C, RTOS, Bus Protocols (CAN/SPI/I2C), and Linux systems."
    },
    {
      title: "Technical Workshop on MATLAB & Simulink",
      issuer: "Dr. N.G.P. Institute of Technology",
      period: "Engineering Colloquium",
      desc: "System modeling, waveform simulation, mathematical control algorithms, and digital signal processing fundamentals."
    },
    {
      title: "Hands-on Workshop on Autonomous Robotics",
      issuer: "Engineering Technical Symposium",
      period: "Technical Symposium",
      desc: "Microcontroller-based motor control, sensor interfacing, kinematics, and obstacle avoidance algorithms."
    },
    {
      title: "Industrial Switchgear & Electrical Safety Systems",
      issuer: "Safvolt Switchgears Pvt Ltd",
      period: "2024",
      desc: "Safety protocols, circuit breaker timing diagnostics, power distribution, and fault analysis in industrial environments."
    }
  ]
};

// Export for module systems or attach to global window
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
} else {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}

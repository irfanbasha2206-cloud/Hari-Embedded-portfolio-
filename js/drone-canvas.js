/**
 * DRONE 3D SCROLL & ENGINEERING PROFILE STORYTELLING ENGINE
 * - Single high-performance canvas (Zero ghosting / Zero double image)
 * - 100% clean drone visuals with NO overlay words or tooltips
 * - Pure scroll scrub through 300 sequential frames
 * - Synchronized cross-fade of Engineering Profile stages on the left
 */

(function () {
  'use strict';

  const TOTAL_FRAMES = 300;
  const FRAME_PATH_PREFIX = 'assets/drone/frame-';
  const FRAME_PATH_SUFFIX = '.jpg';

  const container = document.getElementById('drone-section');
  const canvas = document.getElementById('drone-canvas');
  const stageCol = document.getElementById('drone-interactive-stage');
  const storyStages = document.querySelectorAll('.story-stage');
  const storyDots = document.querySelectorAll('.story-dot');

  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  const images = new Array(TOTAL_FRAMES + 1);
  let loadedCount = 0;
  let targetFrame = 1;
  let currentFrame = 1;
  let animationFrameId = null;
  let currentActiveStage = 0;

  function getFrameUrl(index) {
    const padded = String(index).padStart(3, '0');
    return `${FRAME_PATH_PREFIX}${padded}${FRAME_PATH_SUFFIX}`;
  }

  // Preload initial frames and key angles
  function initPreload() {
    for (let i = 1; i <= Math.min(25, TOTAL_FRAMES); i++) {
      preloadFrame(i);
    }
    [75, 150, 225, 300].forEach((idx) => preloadFrame(idx));

    for (let i = 30; i <= TOTAL_FRAMES; i += 5) {
      preloadFrame(i);
    }

    let idx = 1;
    function loadRest() {
      let count = 0;
      while (idx <= TOTAL_FRAMES && count < 8) {
        if (!images[idx]) {
          preloadFrame(idx);
          count++;
        }
        idx++;
      }
      if (idx <= TOTAL_FRAMES) {
        setTimeout(loadRest, 35);
      }
    }
    setTimeout(loadRest, 100);
  }

  function preloadFrame(idx) {
    if (images[idx]) return;
    const img = new Image();
    img.src = getFrameUrl(idx);
    img.onload = () => {
      images[idx] = img;
      loadedCount++;
      if (Math.round(currentFrame) === idx || (idx === 1 && currentFrame === 1)) {
        drawFrame(currentFrame);
      }
    };
    img.onerror = () => {
      images[idx] = null;
    };
  }

  function resizeCanvas() {
    if (!canvas) return;
    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 500;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    drawFrame(Math.round(currentFrame));
  }

  function drawFrame(frameNumber) {
    const safeIdx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameNumber)));
    let img = images[safeIdx];

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 35; offset++) {
        if (safeIdx - offset >= 1 && images[safeIdx - offset]?.complete) {
          img = images[safeIdx - offset];
          break;
        }
        if (safeIdx + offset <= TOTAL_FRAMES && images[safeIdx + offset]?.complete) {
          img = images[safeIdx + offset];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

    ctx.clearRect(0, 0, width, height);

    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawW, drawH, drawX, drawY;
    if (canvasRatio > imgRatio) {
      drawH = height;
      drawW = height * imgRatio;
    } else {
      drawW = width;
      drawH = width / imgRatio;
    }

    // Zoom drone comfortably (1.25) so entire airframe, wings, and rotor blades stay 100% in view
    const DRONE_ZOOM = 1.25;
    drawW *= DRONE_ZOOM;
    drawH *= DRONE_ZOOM;
    drawX = (width - drawW) / 2;
    drawY = (height - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  // Synchronize Left Column Story Stages with Scroll Progress
  function updateStoryStages(progress) {
    const totalStages = storyStages.length;
    if (totalStages === 0) return;

    const stageIndex = Math.min(totalStages - 1, Math.floor(progress * totalStages));

    if (stageIndex !== currentActiveStage) {
      currentActiveStage = stageIndex;

      storyStages.forEach((stage, idx) => {
        if (idx < stageIndex) {
          stage.className = 'story-stage past';
        } else if (idx === stageIndex) {
          stage.className = 'story-stage active';
        } else {
          stage.className = 'story-stage';
        }
      });

      storyDots.forEach((dot, idx) => {
        if (idx === stageIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  // Animation Loop with smooth lerp
  function animationLoop() {
    const delta = targetFrame - currentFrame;
    if (Math.abs(delta) > 0.04) {
      currentFrame += delta * 0.22;
      drawFrame(currentFrame);
    }
    animationFrameId = requestAnimationFrame(animationLoop);
  }

  // Pure Scroll Scrubbing
  function onScroll() {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const scrollLength = container.offsetHeight - window.innerHeight;

    if (scrollLength <= 0) return;

    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      const progress = Math.max(0, Math.min(1, -rect.top / scrollLength));
      targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
      updateStoryStages(progress);
    } else if (rect.top > 0) {
      targetFrame = 1;
      updateStoryStages(0);
    } else if (rect.bottom < window.innerHeight) {
      targetFrame = TOTAL_FRAMES;
      updateStoryStages(0.99);
    }
  }

  // Interactive Dot Click Navigation
  storyDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const stageIdx = parseInt(dot.getAttribute('data-stage'), 10) || 0;
      const scrollLength = container.offsetHeight - window.innerHeight;
      const targetProgress = (stageIdx + 0.1) / (storyStages.length || 4);
      const containerTop = container.offsetTop;
      const scrollPos = containerTop + targetProgress * scrollLength;

      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    });
  });

  // Interactive 3D Mouse Parallax on Drone Stage
  if (stageCol) {
    stageCol.addEventListener('mousemove', (e) => {
      const rect = stageCol.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltX = -y * 6;
      const tiltY = x * 6;

      canvas.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    stageCol.addEventListener('mouseleave', () => {
      canvas.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    initPreload();
    drawFrame(1);
    updateStoryStages(0);
    animationFrameId = requestAnimationFrame(animationLoop);
  });
})();

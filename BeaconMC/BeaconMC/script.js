/**
 * BeaconMC Official Website Script
 * Clean Vanilla JavaScript - High Performance & Full Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCopyActions();
  initFaqAccordion();
  initServerStatus();
});

/* ==========================================================================
   1. Navbar, Mobile Menu & ScrollSpy
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('site-header');
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Glass background transition on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ScrollSpy to clearly highlight active navigation item
  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 140;
    let currentId = '';

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      desktopLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      mobileLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  if (!toggleBtn || !mobileNav) return;

  const openMobileMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'true');
    mobileNav.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close menu after clicking any navigation link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (toggleBtn.getAttribute('aria-expanded') === 'true') {
      if (!mobileNav.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   2. Copy IP & Port Handlers (Inline Button Feedback)
   ========================================================================== */
function initCopyActions() {
  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Fallback below
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '-9999px';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch {
      return false;
    }
  };

  const triggerButtonFeedback = (button, defaultLabel) => {
    if (!button) return;

    const labelSpan = button.querySelector('.btn-text, .copy-text');
    const icon = button.querySelector('svg');

    // Cache original label and icon structure once
    if (!button.dataset.originalLabel) {
      button.dataset.originalLabel = labelSpan ? labelSpan.textContent.trim() : defaultLabel;
    }
    if (icon && !button._originalSvg) {
      button._originalSvg = icon.innerHTML;
    }

    // Clear any pending timeout on rapid repeated clicks
    if (button._copiedTimer) {
      clearTimeout(button._copiedTimer);
    }

    // Set inline copied state
    if (labelSpan) {
      labelSpan.textContent = 'Copied ✓';
    } else {
      button.textContent = 'Copied ✓';
    }

    if (icon) {
      // Clean checkmark SVG
      icon.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
    }

    button.classList.add('btn-copied');

    // Revert after 1.8 seconds
    button._copiedTimer = setTimeout(() => {
      if (labelSpan) {
        labelSpan.textContent = button.dataset.originalLabel || defaultLabel;
      } else {
        button.textContent = button.dataset.originalLabel || defaultLabel;
      }
      if (icon && button._originalSvg) {
        icon.innerHTML = button._originalSvg;
      }
      button.classList.remove('btn-copied');
      button._copiedTimer = null;
    }, 1800);
  };

  // 1. Hero Quick Copy Button
  const heroCopyBtn = document.getElementById('hero-copy-btn');
  if (heroCopyBtn) {
    heroCopyBtn.addEventListener('click', async () => {
      await copyToClipboard('play.BeaconMC.space');
      triggerButtonFeedback(heroCopyBtn, 'COPY IP');
    });
  }

  // 2. All "COPY IP" buttons (.copy-ip-btn)
  const copyIpButtons = document.querySelectorAll('.copy-ip-btn');
  copyIpButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy') || 'play.BeaconMC.space';
      await copyToClipboard(textToCopy);
      triggerButtonFeedback(btn, 'COPY IP');
    });
  });

  // 3. Bedrock "COPY PORT" button (#copy-port-btn)
  const copyPortBtn = document.getElementById('copy-port-btn');
  if (copyPortBtn) {
    copyPortBtn.addEventListener('click', async () => {
      const portVal = copyPortBtn.getAttribute('data-port') || '19132';
      await copyToClipboard(portVal);
      triggerButtonFeedback(copyPortBtn, 'COPY PORT');
    });
  }
}

/* ==========================================================================
   3. FAQ Accordion (Smooth & Accessible)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other accordion items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.setAttribute('aria-hidden', 'true');
        }
      });

      // Toggle current item
      if (isExpanded) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
      }
    });
  });
}

/* ==========================================================================
   4. Live Minecraft Server Status Monitor
   - Checks play.BeaconMC.space
   - Online / Offline / Status Unavailable (Clearly distinguished)
   - Real-time player counts, never fake
   - Refreshes approximately every 45 seconds
   - Safe error handling (No console errors)
   ========================================================================== */
function initServerStatus() {
  const SERVER_HOST = 'play.BeaconMC.space';
  const FALLBACK_VERSION = '1.21.11';
  const REFRESH_INTERVAL_MS = 45000;

  // DOM Elements - Hero
  const heroDot = document.getElementById('hero-status-dot');
  const heroText = document.getElementById('hero-status-text');
  const heroPlayersVal = document.getElementById('hero-players-val');

  // DOM Elements - Status Section
  const mainBadge = document.getElementById('main-status-badge');
  const mainDot = document.getElementById('main-status-dot');
  const mainText = document.getElementById('main-status-text');
  const metricOnline = document.getElementById('metric-players-online');
  const metricMax = document.getElementById('metric-players-max');
  const metricPlayerBar = document.getElementById('metric-player-bar');
  const metricVersion = document.getElementById('metric-detected-version');

  const updateUIOnline = (onlinePlayers, maxPlayers, version) => {
    // Hero Status
    if (heroDot) heroDot.className = 'status-pulse-dot online';
    if (heroText) heroText.textContent = 'ONLINE';
    if (heroPlayersVal) heroPlayersVal.textContent = `${onlinePlayers} / ${maxPlayers}`;

    // Dashboard Status
    if (mainBadge) mainBadge.className = 'server-status-badge online';
    if (mainDot) mainDot.className = 'status-pulse-dot online';
    if (mainText) mainText.textContent = 'ONLINE';
    if (metricOnline) metricOnline.textContent = String(onlinePlayers);
    if (metricMax) metricMax.textContent = `/ ${maxPlayers} max`;
    if (metricPlayerBar && maxPlayers > 0) {
      const percentage = Math.min(100, Math.round((onlinePlayers / maxPlayers) * 100));
      metricPlayerBar.style.width = `${percentage}%`;
    }
    if (metricVersion) metricVersion.textContent = version || FALLBACK_VERSION;
  };

  const updateUIOffline = (maxPlayers, version) => {
    // Hero Status
    if (heroDot) heroDot.className = 'status-pulse-dot offline';
    if (heroText) heroText.textContent = 'OFFLINE';
    if (heroPlayersVal) heroPlayersVal.textContent = `0 / ${maxPlayers || 50}`;

    // Dashboard Status
    if (mainBadge) mainBadge.className = 'server-status-badge offline';
    if (mainDot) mainDot.className = 'status-pulse-dot offline';
    if (mainText) mainText.textContent = 'OFFLINE';
    if (metricOnline) metricOnline.textContent = '0';
    if (metricMax) metricMax.textContent = `/ ${maxPlayers || 50} max`;
    if (metricPlayerBar) metricPlayerBar.style.width = '0%';
    if (metricVersion) metricVersion.textContent = version || FALLBACK_VERSION;
  };

  const updateUIUnavailable = () => {
    // Hero Status
    if (heroDot) heroDot.className = 'status-pulse-dot unavailable';
    if (heroText) heroText.textContent = 'STATUS UNAVAILABLE';
    if (heroPlayersVal) heroPlayersVal.textContent = '-- / --';

    // Dashboard Status
    if (mainBadge) mainBadge.className = 'server-status-badge unavailable';
    if (mainDot) mainDot.className = 'status-pulse-dot unavailable';
    if (mainText) mainText.textContent = 'STATUS UNAVAILABLE';
    if (metricOnline) metricOnline.textContent = '--';
    if (metricMax) metricMax.textContent = '/ -- max';
    if (metricPlayerBar) metricPlayerBar.style.width = '0%';
    if (metricVersion) metricVersion.textContent = FALLBACK_VERSION;
  };

  const fetchStatus = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(`https://api.mcsrvstat.us/3/${SERVER_HOST}`, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        updateUIUnavailable();
        return;
      }

      const data = await response.json();

      if (data && typeof data.online === 'boolean') {
        const maxCount = (data.players && typeof data.players.max === 'number') ? data.players.max : 50;
        const versionString = data.version || FALLBACK_VERSION;

        if (data.online) {
          const onlineCount = (data.players && typeof data.players.online === 'number') ? data.players.online : 0;
          updateUIOnline(onlineCount, maxCount, versionString);
        } else {
          // Explicitly reported offline by API
          updateUIOffline(maxCount, versionString);
        }
      } else {
        updateUIUnavailable();
      }
    } catch {
      // Safe catch for timeout, network error, or cors - no console errors
      updateUIUnavailable();
    }
  };

  // Initial fetch and scheduled refresh every 45s
  fetchStatus();
  setInterval(fetchStatus, REFRESH_INTERVAL_MS);
}

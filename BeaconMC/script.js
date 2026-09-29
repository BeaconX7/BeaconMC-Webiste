/**
 * BeaconMC Official Website Script
 * Clean Vanilla JavaScript - High Performance, Accessible & Multi-Page Compatible
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCopyActions();
  initFaqAccordion();
  initServerStatus();
  initStaffPage();
  initScrollReveal();
});

/* ==========================================================================
   1. Navbar & Mobile Menu (Multi-Page Navigation)
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('site-header');
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');

  // Glass background transition & height reduction on scroll
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Highlight active link based on current page URL as a progressive enhancement
  try {
    const rawPath = window.location.pathname.split('/').pop().toLowerCase().replace(/\.html$/, '');
    const currentBase = (!rawPath || rawPath === 'index' || rawPath === '.') ? 'index' : rawPath;

    desktopLinks.forEach(link => {
      const linkBase = (link.getAttribute('href') || '').split('/').pop().toLowerCase().replace(/\.html$/, '');
      if (linkBase === currentBase) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach(link => {
      const linkBase = (link.getAttribute('href') || '').split('/').pop().toLowerCase().replace(/\.html$/, '');
      if (linkBase === currentBase) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  } catch {
    // If URL matching fails, HTML-defined active classes remain unchanged
  }

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

  // Reset menu if window is resized to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && toggleBtn.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
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
  if (!faqItems.length) return;

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

  // If no status elements exist on this page, exit gracefully
  if (!heroDot && !mainBadge) return;

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

  const updateUIChecking = () => {
    if (heroText && (!heroText.textContent || heroText.textContent === '--')) heroText.textContent = 'CHECKING STATUS...';
    if (mainText && (!mainText.textContent || mainText.textContent === '--')) mainText.textContent = 'CHECKING STATUS...';
  };

  const fetchStatus = async () => {
    updateUIChecking();
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
      // Safe catch for timeout, network error, or CORS
      updateUIUnavailable();
    }
  };

  // Initial fetch and scheduled refresh every 45s
  fetchStatus();
  setInterval(fetchStatus, REFRESH_INTERVAL_MS);
}

/* ==========================================================================
   5. Viewport Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const revealInView = () => {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || 800;
    revealElements.forEach(el => {
      if (el.classList.contains('is-revealed')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowHeight + 60 && rect.bottom >= -60) {
        el.classList.add('is-revealed');
      }
    });
  };

  // Immediate reveal for elements already in viewport
  revealInView();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px 50px 0px'
    });

    revealElements.forEach(el => {
      if (!el.classList.contains('is-revealed')) {
        observer.observe(el);
      }
    });
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // Safety fallback: ensure elements are revealed even if observer is delayed
  setTimeout(() => {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }, 1000);
}

/* ==========================================================================
   6. Dynamic Staff Showcase Generator & Observer
   - Automatically reads staffMembers array
   - Displays all official roles: Owner, Founder, Co-Owner, Co-Founder, Admin, Mod, Staff, Builder, Helper
   - Displays: Role, Minecraft IGN, Discord ID, Avatar
   - NEVER displays Discord Name
   - Hides empty fields cleanly (no undefined, null, or blank labels)
   - Preserves alternating desktop layout and mobile layout
   - Preserves scroll reveal animations and glassmorphism styling
   ========================================================================== */
const defaultStaffMembers = [
    {
        role: "Owner",
        minecraftIGN: "BeaconX7",
        discordID: "beaconmc",
        avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554024043433164850/avatar-3d-bust.png?ex=6abcb2ac&is=6abb612c&hm=129ced6344f3636257e72d73a4a55e59b54892d315ca7a7a852423d27a5cdfa5&"
    },
    {
        role: "Founder",
        minecraftIGN: "AshuX7",
        discordID: "ashugautam0849",
        avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554025193637154856/avatar-3d-bust_1.png?ex=6abcb3be&is=6abb623e&hm=0b0b4f4c4f60a301b481eaf602bfde2b6d05029c9686d7eeb30ed3974c69a6e3&"
    },
    {
        role: "Co-Owner",
        minecraftIGN: "Arushi_X7",
        discordID: "pro_mahiru",
        avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554480144029188226/avatar-3d-bust_7.png?ex=6abd09f3&is=6abbb873&hm=770d0150212297bc23c3a3cd0240aae6485fe668a1cfd40096b4bb32ca04f94a&"
    },
    {
        role: "Co-Founder",
        minecraftIGN: "Echo_X1",
        discordID: "echo_x1__58783",
        avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554031930314457148/avatar-3d-bust_3.png?ex=6abcba04&is=6abb6884&hm=70a52036f84728a9a88bf9fb088caf67368182ed5330c859531f54a645d20c56&"
    },
    {
        role: "Admin",
        minecraftIGN: "AuraManav",
        discordID: "manavsoni980",
        avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554482060184256552/avatar-3d-bust_8.png?ex=6abd0bbc&is=6abbba3c&hm=54c28be1c49345d844ab141a6daea531898b58882fc256a107a3041e4391a2e1&"
    },
    {
        role: "Mod",
        minecraftIGN: "RoronoaZORO_18",
        discordID: "togxsaber",
        avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554026146981617694/avatar-3d-bust_2.png?ex=6abcb4a1&is=6abb6321&hm=9a6ab5b47d214175aa75c1747ce209d5df14e402cc69d3263c4e7ef619d3fd40&"
    },
    {
        role: "Staff",
        minecraftIGN: "_ishaaaaaaa",
        discordID: "its_ishaa0979",
        avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554037951418343424/avatar-3d-bust_4.png?ex=6abcbfa0&is=6abb6e20&hm=2e8b926fae57fab1d68e0859e60ed33a59a17311c4099414ba5f2620cdeee4aa&"
    },
    {
        role: "Builder",
        minecraftIGN: "Kunal_V",
        discordID: "kunal03790",
        avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554479378430173234/avatar-3d-bust_5.png?ex=6abd093c&is=6abbb7bc&hm=f8770e707b1e4ca5e77c20cad8010f51089c4be0c0680b4ca5145450e0304ca5&"
    },
    {
        role: "Helper",
        minecraftIGN: "zylosplayzzzzz",
        discordID: "zylosplayzzzzz",
        avatar: "https://cdn.discordapp.com/attachments/1518821969498210378/1554479443165057085/avatar-3d-bust_6.png?ex=6abd094c&is=6abbb7cc&hm=5baf2aca7b44167e2fc3266b12ae20989bd27e48aff20889f4609c8334183f60&"
    }
];

function getActiveStaffList() {
  if (typeof window !== 'undefined' && window.staffMembers && Array.isArray(window.staffMembers)) {
    return window.staffMembers;
  }
  if (typeof staffMembers !== 'undefined' && Array.isArray(staffMembers)) {
    return staffMembers;
  }
  return defaultStaffMembers;
}

function buildStaffCards(targetContainer, members) {
  if (!targetContainer || !Array.isArray(members)) return;

  targetContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  members.forEach((member, index) => {
    if (!member || typeof member !== 'object') return;

    const role = (member.role != null) ? String(member.role).trim() : '';
    const ign = (member.minecraftIGN != null) ? String(member.minecraftIGN).trim() : '';
    const discordID = (member.discordID != null) ? String(member.discordID).trim() : '';
    const rawAvatar = (member.avatar != null) ? String(member.avatar).trim() : '';
    const avatar = rawAvatar || 'assets/logo.png';

    // If completely empty object, skip cleanly
    if (!role && !ign && !discordID && !rawAvatar) return;

    const isEven = index % 2 === 0;
    const layoutClass = isEven ? 'staff-card--info-left' : 'staff-card--avatar-left';
    const delayClass = 'reveal-delay-' + ((index % 6) + 1);
    const roleSlug = role ? role.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

    const article = document.createElement('article');
    article.className = `staff-card ${layoutClass} glass-panel reveal-on-scroll ${delayClass}`;

    // Content Side
    const contentDiv = document.createElement('div');
    contentDiv.className = 'staff-card__content';

    // 1. Role Badge (Prominent at top)
    if (role) {
      const roleBadge = document.createElement('span');
      roleBadge.className = `staff-role staff-role--${roleSlug}`;
      roleBadge.textContent = role.toUpperCase();
      contentDiv.appendChild(roleBadge);
    }

    // 2. Minecraft IGN (Main large title)
    if (ign) {
      const ignTitle = document.createElement('h2');
      ignTitle.className = 'staff-minecraft-ign font-mono';
      ignTitle.textContent = ign;
      contentDiv.appendChild(ignTitle);
    }

    // 3. Discord ID (Smaller secondary text; cleanly hidden if empty; NEVER shows Discord Name)
    if (discordID) {
      const discordMeta = document.createElement('div');
      discordMeta.className = 'staff-discord-meta';

      const discordSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      discordSvg.setAttribute('class', 'icon-discord-mini');
      discordSvg.setAttribute('viewBox', '0 0 24 24');
      discordSvg.setAttribute('width', '16');
      discordSvg.setAttribute('height', '16');
      discordSvg.setAttribute('fill', 'currentColor');
      discordSvg.setAttribute('aria-hidden', 'true');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z');
      discordSvg.appendChild(path);
      discordMeta.appendChild(discordSvg);

      const discordLabel = document.createElement('span');
      discordLabel.className = 'staff-discord-label';
      discordLabel.textContent = 'Discord:';
      discordMeta.appendChild(discordLabel);

      const discordVal = document.createElement('span');
      discordVal.className = 'staff-discord-val';
      discordVal.textContent = discordID;
      discordMeta.appendChild(discordVal);

      contentDiv.appendChild(discordMeta);
    }

    article.appendChild(contentDiv);

    // 4. Large Avatar with Role Ring (Uses clean default placeholder if avatar is empty)
    const avatarSide = document.createElement('div');
    avatarSide.className = 'staff-card__avatar-side';

    const avatarRing = document.createElement('div');
    avatarRing.className = `staff-avatar-ring ${roleSlug ? 'staff-avatar-ring--' + roleSlug : ''}`;

    const avatarImg = document.createElement('img');
    avatarImg.src = avatar;
    avatarImg.alt = (ign ? ign + ' Avatar' : (role ? role + ' Staff Avatar' : 'BeaconMC Staff'));
    avatarImg.className = 'staff-avatar-img';
    avatarImg.width = 180;
    avatarImg.height = 180;
    avatarImg.loading = 'lazy';
    avatarImg.onerror = function() {
      this.onerror = null;
      this.src = 'assets/logo.png';
    };

    avatarRing.appendChild(avatarImg);
    avatarSide.appendChild(avatarRing);
    article.appendChild(avatarSide);

    fragment.appendChild(article);
  });

  targetContainer.appendChild(fragment);

  // If scroll observer exists, re-bind to the freshly created cards
  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }
}

function initStaffPage() {
  const container = document.getElementById('staff-showcase-container') || document.querySelector('.staff-showcase-container');
  if (!container) return;

  const members = getActiveStaffList();
  buildStaffCards(container, members);
}

// Expose on window for programmatic updates without circular recursion
if (typeof window !== 'undefined') {
  window.buildStaffCards = buildStaffCards;
  window.renderStaffCards = (customMembers) => {
    const container = document.getElementById('staff-showcase-container') || document.querySelector('.staff-showcase-container');
    if (container) {
      buildStaffCards(container, customMembers || getActiveStaffList());
    }
  };
  window.initStaffPage = initStaffPage;
}

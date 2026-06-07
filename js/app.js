(function () {
  const supportedLanguages = ["de", "pl", "en", "fr", "it"];
  const DEFAULT_LANGUAGE = "en";
  const langCodes = { de: "DE", pl: "PL", en: "EN", fr: "FR", it: "IT" };
  let currentLanguage = detectLanguage();

  const t = (path) => path.split(".").reduce((value, key) => value && value[key], TRANSLATIONS[currentLanguage]) || path;
  const registerLinks = () => document.querySelectorAll(".js-register");

  function normalizeLangCode(raw) {
    if (!raw || typeof raw !== "string") return null;
    return raw.toLowerCase().split("-")[0].slice(0, 2);
  }

  function isSupportedLanguage(code) {
    return Boolean(code && supportedLanguages.includes(code));
  }

  function detectLanguage() {
    const saved = localStorage.getItem("vm_language");
    if (isSupportedLanguage(saved)) return saved;
    if (saved) localStorage.removeItem("vm_language");

    // Только primary locale (navigator.language). Вторичные предпочтения игнорируем.
    const primary = normalizeLangCode(navigator.language);
    if (isSupportedLanguage(primary)) return primary;

    return DEFAULT_LANGUAGE;
  }

  function ensureValidLanguage() {
    const saved = localStorage.getItem("vm_language");
    if (saved && !isSupportedLanguage(saved)) {
      localStorage.removeItem("vm_language");
    }
    if (!isSupportedLanguage(currentLanguage) || !TRANSLATIONS[currentLanguage]) {
      currentLanguage = DEFAULT_LANGUAGE;
    }
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getBackgroundAsset() {
    const images = CONFIG.backgroundImages || [];
    const index = Number.isInteger(CONFIG.backgroundImageIndex) ? CONFIG.backgroundImageIndex : 0;
    return images[index] || images[0] || { webp: "", fallback: "" };
  }

  function applyHeroBackground() {
    const asset = getBackgroundAsset();
    const webpSource = document.getElementById("heroWebp");
    const heroImage = document.getElementById("heroImage");

    if (asset.webp) {
      webpSource.srcset = asset.webp;
    } else {
      webpSource.removeAttribute("srcset");
    }

    if (asset.fallback) {
      heroImage.src = asset.fallback;
    }

    heroImage.addEventListener("error", () => {
      if (heroImage.dataset.fallbackTried) return;
      heroImage.dataset.fallbackTried = "true";
      webpSource.removeAttribute("srcset");
      if (asset.fallback) heroImage.src = asset.fallback;
    }, { once: true });
  }

  function handleRegisterClick(event) {
    if (!CONFIG.registrationUrl || CONFIG.registrationUrl === "PASTE_YOUR_LINK_HERE") {
      event.preventDefault();
      console.info("ВСТАВЬТЕ СВОЮ ССЫЛКУ РЕГИСТРАЦИИ в js/config.js");
      return;
    }
    event.preventDefault();
    window.location.href = CONFIG.registrationUrl;
  }

  function bindRegisterLinks() {
    registerLinks().forEach((link) => {
      link.setAttribute("href", CONFIG.registrationUrl);
      if (link.dataset.registerBound) return;
      link.dataset.registerBound = "true";
      link.addEventListener("click", handleRegisterClick);
    });
  }

  function applyPreconnect() {
    let url = CONFIG.preconnectUrl;
    if (!url && CONFIG.registrationUrl && CONFIG.registrationUrl !== "PASTE_YOUR_LINK_HERE") {
      try {
        url = new URL(CONFIG.registrationUrl).origin;
      } catch {
        url = null;
      }
    }
    if (!url) return;

    const existing = document.querySelector(`link[rel="preconnect"][href="${url}"]`);
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = url;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }

  function applyConfig() {
    applyHeroBackground();
    applyPreconnect();
    bindRegisterLinks();
  }

  const liveStats = {
    online: (CONFIG.socialProof && CONFIG.socialProof.online) || 3916,
    profiles: 12840,
    videos: 724
  };

  const LIVE_LIMITS = {
    online: { min: 3860, max: 3970, delta: 5 },
    profiles: { min: 12780, max: 12920, delta: 3 },
    videos: { min: 708, max: 742, delta: 3 }
  };

  let liveCounterTimer = null;

  function formatLiveCount(value) {
    return value.toLocaleString(currentLanguage);
  }

  function parseLiveCount(text) {
    return Number(String(text).replace(/[^\d]/g, "")) || 0;
  }

  function renderHeaderStatus() {
    const el = document.getElementById("headerStatusText");
    if (!el) return;

    const count = formatLiveCount(liveStats.online);
    el.textContent = t("header.statusOnline").replace("{count}", count);
  }

  function setCounterText(el, value) {
    el.textContent = formatLiveCount(value);
  }

  function animateCounterValue(el, from, to, duration = 520) {
    if (from === to) {
      setCounterText(el, to);
      return;
    }

    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      const current = Math.round(from + (to - from) * eased);
      setCounterText(el, current);
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function updateLiveCounterDisplay(key, animate) {
    const value = liveStats[key];

    if (key === "online") {
      renderHeaderStatus();
    }

    document.querySelectorAll(`[data-live-counter="${key}"]`).forEach((el) => {
      if (!el.dataset.done) return;

      const current = parseLiveCount(el.textContent);
      if (!animate) {
        setCounterText(el, value);
        return;
      }
      animateCounterValue(el, current, value);
    });
  }

  function bumpLiveCounter(key) {
    const limits = LIVE_LIMITS[key];
    const delta = Math.floor(Math.random() * (limits.delta * 2 + 1)) - limits.delta;
    if (delta === 0) return;

    liveStats[key] = Math.max(limits.min, Math.min(limits.max, liveStats[key] + delta));
    updateLiveCounterDisplay(key, true);
  }

  function scheduleLiveCounters() {
    clearTimeout(liveCounterTimer);
    if (document.hidden) return;

    const delay = 10000 + Math.random() * 10000;
    liveCounterTimer = setTimeout(() => {
      bumpLiveCounter("online");
      if (Math.random() < 0.5) bumpLiveCounter("profiles");
      if (Math.random() < 0.5) bumpLiveCounter("videos");
      scheduleLiveCounters();
    }, delay);
  }

  function refreshLiveCounterFormatting() {
    renderHeaderStatus();
    ["profiles", "online", "videos"].forEach((key) => {
      document.querySelectorAll(`[data-live-counter="${key}"]`).forEach((el) => {
        if (el.dataset.done) setCounterText(el, liveStats[key]);
      });
    });
  }

  function initLiveCounters() {
    document.querySelectorAll("[data-live-counter]").forEach((el) => {
      const key = el.dataset.liveCounter;
      if (key && liveStats[key] !== undefined) {
        liveStats[key] = Number(el.dataset.counter) || liveStats[key];
      }
    });

    renderHeaderStatus();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearTimeout(liveCounterTimer);
        return;
      }
      scheduleLiveCounters();
    });

    scheduleLiveCounters();
  }

  function renderHeroPreview() {
    const container = document.getElementById("heroPreview");
    if (!container) return;

    container.innerHTML = "";
    const previewItems = shuffle([
      ...PROFILES[currentLanguage].slice(0, 4).map((p) => ({ type: "profile", ...p })),
      ...VIDEOS[currentLanguage].slice(0, 2).map((v) => ({ type: "video", ...v }))
    ]).slice(0, 3);

    previewItems.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = `hero-preview-card hero-preview-card--${index + 1} ${item.type === "video" ? "is-live" : "is-profile"}`;
      if (item.type === "profile") {
        card.innerHTML = `
          <img src="${item.photo}" alt="" loading="lazy" decoding="async">
          <div class="hero-preview-glass"></div>
          <span class="hero-preview-label">${item.name}</span>
        `;
      } else {
        card.classList.add(item.preview);
        card.innerHTML = `
          <div class="hero-preview-live">LIVE</div>
          <div class="hero-preview-glass"></div>
          <span class="hero-preview-label">${item.title}</span>
        `;
      }
      container.appendChild(card);
    });
  }

  function renderTranslations() {
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });

    const triggerCode = document.getElementById("langTriggerCode");
    if (triggerCode) triggerCode.textContent = langCodes[currentLanguage];

    document.querySelectorAll(".lang-menu li").forEach((item) => {
      const isActive = item.dataset.lang === currentLanguage;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    refreshLiveCounterFormatting();
  }

  function createCard(item, animationIndex) {
    let card;
    if (item.type === "video") card = createVideoCard(item);
    else if (item.isPremium) card = createPremiumCard(item);
    else card = createProfileCard(item);
    card.style.animationDelay = `${Math.min(animationIndex * 0.04, 0.36)}s`;
    return card;
  }

  function createProfilesMoreInfo() {
    const block = document.createElement("aside");
    block.className = "profiles-more-info glass-panel section-reveal";
    const count = (CONFIG.socialProof?.profiles || 12840).toLocaleString(currentLanguage);
    block.innerHTML = `<p>${t("content.profilesMore").replace("{count}", count)}</p>`;
    return block;
  }

  function createInlineCta(variant) {
    const block = document.createElement("aside");
    block.className = `inline-cta inline-cta--${variant} glass-panel section-reveal`;
    const icon = variant === "first" ? "&#128293;" : "&#128172;";
    block.innerHTML = `
      <div class="inline-cta-content">
        <p class="inline-cta-title">${icon} ${t(`inlineCta.${variant}.title`)}</p>
        <p class="inline-cta-subtitle">${t(`inlineCta.${variant}.subtitle`)}</p>
      </div>
      <a class="btn btn-primary btn-inline-cta js-register" href="#">${t(`inlineCta.${variant}.cta`)}</a>
    `;
    attachRegisterAction(block.querySelector(".btn-inline-cta"));
    return block;
  }

  function balancePartialGridRow(grid, count, columns) {
    const remainder = count % columns;
    if (remainder === 0) return;

    const offset = Math.floor((columns - remainder) / 2) + 1;
    const cards = grid.querySelectorAll(".mixed-card");
    const startIdx = count - remainder;

    cards.forEach((card, index) => {
      if (index >= startIdx) {
        card.style.gridColumn = String(offset + (index - startIdx));
      }
    });
  }

  function renderCardGrid(items, animationOffset) {
    const grid = document.createElement("div");
    grid.className = "mixed-grid";
    grid.dataset.count = String(items.length);
    items.forEach((item, index) => {
      grid.appendChild(createCard(item, animationOffset + index));
    });

    if (window.matchMedia("(min-width: 900px)").matches) {
      balancePartialGridRow(grid, items.length, 5);
    }

    return grid;
  }

  function clearRevealBindings(root) {
    if (!revealObserver) return;
    root.querySelectorAll("[data-reveal-bound]").forEach((el) => {
      revealObserver.unobserve(el);
      delete el.dataset.revealBound;
    });
  }

  function renderContentWall() {
    const container = document.getElementById("contentSections");
    clearRevealBindings(container);
    container.innerHTML = "";

    const profileVariants = ["profile-variant-rose", "profile-variant-teal", "profile-variant-amber"];
    const profiles = shuffle(PROFILES[currentLanguage]).slice(0, 12).map((profile, index) => ({
      type: "profile",
      variant: profileVariants[index % profileVariants.length],
      isPremium: index % 4 === 1,
      ...profile
    }));
    const videos = shuffle(VIDEOS[currentLanguage]).slice(0, 6).map((video) => ({ type: "video", ...video }));
    const allCards = shuffle([...profiles, ...videos]);
    const isDesktop = window.matchMedia("(min-width: 900px)").matches;

    if (isDesktop) {
      const chunks = [
        allCards.slice(0, 5),
        allCards.slice(5, 10),
        allCards.slice(10, 18)
      ];

      container.appendChild(renderCardGrid(chunks[0], 0));
      container.appendChild(createInlineCta("first"));
      container.appendChild(renderCardGrid(chunks[1], 5));
      container.appendChild(createInlineCta("second"));
      container.appendChild(renderCardGrid(chunks[2], 10));
    } else {
      const mobileCards = allCards.slice(0, 8);

      container.appendChild(renderCardGrid(mobileCards.slice(0, 4), 0));
      container.appendChild(createInlineCta("first"));
      container.appendChild(renderCardGrid(mobileCards.slice(4, 8), 4));
      container.appendChild(createInlineCta("second"));
      container.appendChild(createProfilesMoreInfo());
    }

    bindRegisterLinks();
    revealSections(container);
    renderHeroPreview();
  }

  function createProfileCard(profile) {
    const card = document.createElement("article");
    card.className = `mixed-card profile-card ${profile.variant} js-register`;
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-media">
        <img src="${profile.photo}" alt="${profile.name}" loading="lazy" decoding="async">
        <div class="card-glass"></div>
        <div class="card-shine" aria-hidden="true"></div>
        <div class="lock-overlay"><span>&#128274;</span><strong>${t("common.locked")}</strong></div>
        <div class="card-meta">
          <strong>${profile.name}</strong>
          <div class="card-meta-row"><span>${profile.age}</span><span>${profile.city}</span></div>
        </div>
      </div>
    `;
    attachRegisterAction(card);
    return card;
  }

  function createPremiumCard(profile) {
    const card = document.createElement("article");
    card.className = `mixed-card profile-card premium-card ${profile.variant} js-register`;
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-media">
        <img src="${profile.photo}" alt="${profile.name}" loading="lazy" decoding="async">
        <div class="card-glass"></div>
        <div class="card-shine" aria-hidden="true"></div>
        <div class="premium-badge">${t("common.premium")}</div>
        <div class="lock-overlay lock-overlay--premium"><span>&#128274;</span><strong>${t("common.locked")}</strong></div>
        <div class="card-meta card-meta--premium">
          <strong>${profile.name}</strong>
          <div class="card-meta-row"><span>${profile.age}</span><span>${profile.city}</span></div>
        </div>
      </div>
    `;
    attachRegisterAction(card);
    return card;
  }

  function createVideoCard(video) {
    const card = document.createElement("article");
    card.className = `mixed-card video-card ${video.preview} js-register`;
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-media">
        <div class="live-badge">LIVE</div>
        <div class="video-motion" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="card-glass"></div>
        <div class="card-shine" aria-hidden="true"></div>
        <div class="lock-overlay"><span>&#128274;</span><strong>${t("common.locked")}</strong></div>
        <div class="card-meta">
          <strong>${video.title}</strong>
          <span>${video.viewers} online</span>
        </div>
      </div>
    `;
    attachRegisterAction(card);
    return card;
  }

  function attachRegisterAction(element) {
    element.addEventListener("click", () => {
      if (CONFIG.registrationUrl && CONFIG.registrationUrl !== "PASTE_YOUR_LINK_HERE") {
        window.location.href = CONFIG.registrationUrl;
      } else {
        console.info("ВСТАВЬТЕ СВОЮ ССЫЛКУ РЕГИСТРАЦИИ в js/config.js");
      }
    });
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        element.click();
      }
    });
  }

  function animateCounters() {
    const counters = document.querySelectorAll("[data-live-counter]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.done) return;
        entry.target.dataset.done = "true";
        const key = entry.target.dataset.liveCounter;
        const end = liveStats[key] || Number(entry.target.dataset.counter);
        const startTime = performance.now();

        function frame(now) {
          const progress = Math.min((now - startTime) / 1400, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounterText(entry.target, Math.floor(end * eased));
          if (progress < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
      });
    }, { threshold: 0.45 });

    counters.forEach((counter) => observer.observe(counter));
  }

  let revealObserver;

  function revealSections(root = document) {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      }, { threshold: 0.08 });
    }

    root.querySelectorAll(".section-reveal:not([data-reveal-bound])").forEach((section) => {
      section.dataset.revealBound = "true";
      revealObserver.observe(section);
    });
  }

  function bindLanguageDropdown() {
    const dropdown = document.getElementById("langDropdown");
    const trigger = document.getElementById("langTrigger");
    const menu = document.getElementById("langMenu");
    if (!dropdown || !trigger || !menu) return;

    function closeMenu() {
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }

    function openMenu() {
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
    }

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      if (menu.hidden) openMenu();
      else closeMenu();
    });

    menu.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        const lang = item.dataset.lang;
        if (!supportedLanguages.includes(lang)) return;
        currentLanguage = lang;
        localStorage.setItem("vm_language", currentLanguage);
        renderTranslations();
        renderContentWall();
        closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  function bindStickyCta() {
    const hero = document.getElementById("hero");
    const sticky = document.getElementById("stickyCta");
    if (!hero || !sticky) return;

    const mobileQuery = window.matchMedia("(max-width: 899px)");

    function updateSticky() {
      if (!mobileQuery.matches) {
        sticky.hidden = true;
        return;
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!mobileQuery.matches) return;
      sticky.hidden = entry.isIntersecting;
    }, { threshold: 0, rootMargin: "0px 0px -20% 0px" });

    observer.observe(hero);
    mobileQuery.addEventListener("change", updateSticky);
    updateSticky();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    ensureValidLanguage();
    applyConfig();
    renderTranslations();
    renderContentWall();
    bindLanguageDropdown();
    bindStickyCta();
    initLiveCounters();
    animateCounters();
    revealSections();
  });
})();

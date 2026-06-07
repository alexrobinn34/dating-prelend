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

    // Используем только основной язык браузера (navigator.language).
    // Не перебираем navigator.languages целиком — иначе при uk + fr в списке
    // откроется французский вместо английского fallback.
    const primary = normalizeLangCode(navigator.language);
    if (isSupportedLanguage(primary)) return primary;

    if (Array.isArray(navigator.languages)) {
      for (const raw of navigator.languages) {
        const code = normalizeLangCode(raw);
        if (code === DEFAULT_LANGUAGE) return DEFAULT_LANGUAGE;
      }
    }

    return DEFAULT_LANGUAGE;
  }

  function ensureValidLanguage() {
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
      webpSource.removeAttribute("srcset");
      heroImage.removeAttribute("src");
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

  function applyConfig() {
    applyHeroBackground();
    bindRegisterLinks();
  }

  function renderSocialProof() {
    const el = document.getElementById("heroSocialProof");
    if (!el || !CONFIG.socialProof) return;

    const online = CONFIG.socialProof.online.toLocaleString(currentLanguage);
    const profiles = CONFIG.socialProof.profiles.toLocaleString(currentLanguage);
    el.textContent = t("hero.socialProof")
      .replace("{online}", online)
      .replace("{profiles}", profiles);
  }

  function renderHeaderStatus() {
    const el = document.getElementById("headerStatusText");
    if (!el || !CONFIG.socialProof) return;

    const count = CONFIG.socialProof.online.toLocaleString(currentLanguage);
    el.textContent = t("header.statusOnline").replace("{count}", count);
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

    renderSocialProof();
    renderHeaderStatus();
  }

  function createCard(item, animationIndex) {
    let card;
    if (item.type === "video") card = createVideoCard(item);
    else if (item.isPremium) card = createPremiumCard(item);
    else card = createProfileCard(item);
    card.style.animationDelay = `${Math.min(animationIndex * 0.04, 0.36)}s`;
    return card;
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

  function renderCardGrid(items, animationOffset) {
    const grid = document.createElement("div");
    grid.className = "mixed-grid";
    items.forEach((item, index) => {
      grid.appendChild(createCard(item, animationOffset + index));
    });
    return grid;
  }

  function renderContentWall() {
    const container = document.getElementById("contentSections");
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
    const chunks = [
      allCards.slice(0, 6),
      allCards.slice(6, 12),
      allCards.slice(12, 18)
    ];

    container.appendChild(renderCardGrid(chunks[0], 0));
    container.appendChild(createInlineCta("first"));
    container.appendChild(renderCardGrid(chunks[1], 6));
    container.appendChild(createInlineCta("second"));
    container.appendChild(renderCardGrid(chunks[2], 12));

    bindRegisterLinks();
    revealSections();
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
    const counters = document.querySelectorAll("[data-counter]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.done) return;
        entry.target.dataset.done = "true";
        const end = Number(entry.target.dataset.counter);
        const startTime = performance.now();

        function frame(now) {
          const progress = Math.min((now - startTime) / 1400, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          entry.target.textContent = Math.floor(end * eased).toLocaleString(currentLanguage);
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
    animateCounters();
    revealSections();
  });
})();

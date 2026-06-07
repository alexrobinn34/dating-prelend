(function () {
  const supportedLanguages = ["de", "pl", "en", "fr", "it"];
  const langCodes = { de: "DE", pl: "PL", en: "EN", fr: "FR", it: "IT" };
  let currentLanguage = detectLanguage();

  const t = (path) => path.split(".").reduce((value, key) => value && value[key], TRANSLATIONS[currentLanguage]) || path;
  const registerLinks = () => document.querySelectorAll(".js-register");

  function detectLanguage() {
    const saved = localStorage.getItem("vm_language");
    if (supportedLanguages.includes(saved)) return saved;

    const browserLanguage = (navigator.language || "en").slice(0, 2).toLowerCase();
    return supportedLanguages.includes(browserLanguage) && browserLanguage !== "en" ? browserLanguage : "en";
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

  function applyConfig() {
    applyHeroBackground();
    registerLinks().forEach((link) => {
      link.setAttribute("href", CONFIG.registrationUrl);
      link.addEventListener("click", (event) => {
        if (!CONFIG.registrationUrl || CONFIG.registrationUrl === "PASTE_YOUR_LINK_HERE") {
          event.preventDefault();
          console.info("ВСТАВЬТЕ СВОЮ ССЫЛКУ РЕГИСТРАЦИИ в js/config.js");
          return;
        }
        event.preventDefault();
        window.location.href = CONFIG.registrationUrl;
      });
    });
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

  function renderContentWall() {
    const grid = document.getElementById("contentGrid");
    grid.innerHTML = "";

    const profileVariants = ["profile-variant-rose", "profile-variant-teal", "profile-variant-amber"];
    const profiles = shuffle(PROFILES[currentLanguage]).slice(0, 12).map((profile, index) => ({
      type: "profile",
      variant: profileVariants[index % profileVariants.length],
      isPremium: index % 4 === 1,
      ...profile
    }));
    const videos = shuffle(VIDEOS[currentLanguage]).slice(0, 6).map((video) => ({ type: "video", ...video }));
    shuffle([...profiles, ...videos]).forEach((item, index) => {
      let card;
      if (item.type === "video") card = createVideoCard(item);
      else if (item.isPremium) card = createPremiumCard(item);
      else card = createProfileCard(item);
      card.style.animationDelay = `${Math.min(index * 0.04, 0.36)}s`;
      grid.appendChild(card);
    });

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

  function revealSections() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".section-reveal").forEach((section) => observer.observe(section));
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
    applyConfig();
    renderTranslations();
    renderContentWall();
    bindLanguageDropdown();
    bindStickyCta();
    animateCounters();
    revealSections();
  });
})();

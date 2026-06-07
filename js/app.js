(function () {
  const supportedLanguages = ["de", "pl", "en", "fr", "it"];
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

  function applyConfig() {
    document.querySelector(".hero-bg").style.backgroundImage = `url("${CONFIG.backgroundImage}")`;
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

  function renderTranslations() {
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll(".language-switcher button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.lang === currentLanguage);
    });
  }

  function renderContentWall() {
    const grid = document.getElementById("contentGrid");
    grid.innerHTML = "";

    const profiles = shuffle(PROFILES[currentLanguage]).slice(0, 12).map((profile) => ({ type: "profile", ...profile }));
    const videos = shuffle(VIDEOS[currentLanguage]).slice(0, 6).map((video) => ({ type: "video", ...video }));
    shuffle([...profiles, ...videos]).forEach((item) => {
      grid.appendChild(item.type === "profile" ? createProfileCard(item) : createVideoCard(item));
    });
  }

  function createProfileCard(profile) {
      const card = document.createElement("article");
      card.className = "profile-card mixed-card js-register";
      card.tabIndex = 0;
      card.innerHTML = `
        <div class="profile-photo">
          <img src="${profile.photo}" alt="${profile.name}" loading="lazy">
          <div class="lock-overlay"><span>&#128274;</span><strong>${t("common.locked")}</strong></div>
        </div>
        <div class="profile-info">
          <div><strong>${profile.name}</strong><span>${profile.age}</span></div>
          <p>${profile.city}</p>
        </div>
      `;
      attachRegisterAction(card);
      return card;
  }

  function createVideoCard(video) {
      const card = document.createElement("article");
      card.className = `video-card mixed-card ${video.preview}`;
      card.tabIndex = 0;
      card.innerHTML = `
        <div class="live-badge">&#9679; LIVE</div>
        <div class="video-motion" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="lock-overlay"><span>&#128274;</span><strong>${t("common.locked")}</strong></div>
        <div class="video-meta"><strong>${video.title}</strong><span>${video.viewers} online</span></div>
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
    }, { threshold: 0.14 });

    document.querySelectorAll(".section-reveal").forEach((section) => observer.observe(section));
  }

  function bindLanguageSwitcher() {
    document.querySelectorAll(".language-switcher button").forEach((button) => {
      button.addEventListener("click", () => {
        currentLanguage = button.dataset.lang;
        localStorage.setItem("vm_language", currentLanguage);
        renderTranslations();
        renderContentWall();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    applyConfig();
    renderTranslations();
    renderContentWall();
    bindLanguageSwitcher();
    animateCounters();
    revealSections();
  });
})();

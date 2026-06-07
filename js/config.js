// Основные настройки проекта.
const CONFIG = {
  // ВСТАВЬТЕ СВОЮ ССЫЛКУ РЕГИСТРАЦИИ
  registrationUrl: "PASTE_YOUR_LINK_HERE",

  // A/B-тестирование фонов hero: добавьте варианты и смените backgroundImageIndex.
  // Для WebP положите файл рядом с fallback (например bg1.webp + bg1.jpg).
  backgroundImages: [
    {
      webp: "assets/backgrounds/bg1.webp",
      fallback: "assets/backgrounds/bg1.svg"
    }
    // { webp: "assets/backgrounds/bg2.webp", fallback: "assets/backgrounds/bg2.jpg" }
  ],
  backgroundImageIndex: 0,

  // Значения для social proof рядом с CTA (синхронизированы со stats).
  socialProof: {
    online: 3916,
    profiles: 12840
  }
};

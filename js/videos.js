// Здесь добавлять и редактировать live-видеочаты.
// Для реального видео добавьте поле video: "assets/videos/file.mp4".
const VIDEOS = {
  de: ["Berlin Lounge", "Hamburg Night", "München Private", "Köln Live", "Leipzig Chat", "Dresden Room", "Bremen Cam", "Stuttgart Now"],
  pl: ["Warszawa Live", "Kraków Night", "Gdańsk Room", "Wrocław Chat", "Poznań Now", "Łódź Lounge", "Lublin Cam", "Sopot Live"],
  en: ["London Live", "Manchester Room", "Bristol Lounge", "Glasgow Night", "Brighton Chat", "Cardiff Cam", "Oxford Now", "Leeds Live"],
  fr: ["Paris Live", "Lyon Room", "Nice Lounge", "Marseille Night", "Bordeaux Chat", "Lille Cam", "Nantes Now", "Rennes Live"],
  it: ["Roma Live", "Milano Room", "Firenze Lounge", "Napoli Night", "Torino Chat", "Verona Cam", "Bologna Now", "Venezia Live"]
};

Object.keys(VIDEOS).forEach((lang) => {
  VIDEOS[lang] = VIDEOS[lang].map((title, index) => ({
    title,
    viewers: 24 + Math.floor(Math.random() * 70) + index,
    preview: `preview-${(index % 4) + 1}`
  }));
});

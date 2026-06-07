// Здесь добавлять и редактировать анкеты. Данные сгруппированы по языкам.
// Поле photo можно заменить на путь к реальному изображению из assets/profiles/.
const PROFILES = {
  de: [
    ["Lena", 27, "Berlin"], ["Mia", 31, "Hamburg"], ["Sofia", 29, "München"], ["Clara", 34, "Köln"], ["Emma", 26, "Dresden"],
    ["Hannah", 38, "Stuttgart"], ["Lea", 33, "Leipzig"], ["Marie", 30, "Bremen"], ["Anna", 36, "Dortmund"], ["Nora", 28, "Essen"],
    ["Laura", 41, "Hannover"], ["Elisa", 32, "Nürnberg"], ["Greta", 39, "Bonn"], ["Jana", 35, "Mannheim"], ["Amelie", 27, "Mainz"],
    ["Klara", 44, "Augsburg"], ["Sarah", 30, "Freiburg"], ["Paula", 37, "Kiel"], ["Isabel", 42, "Wiesbaden"], ["Nina", 29, "Potsdam"],
    ["Luisa", 33, "Münster"], ["Tina", 40, "Lübeck"], ["Julia", 28, "Erfurt"], ["Carina", 36, "Rostock"], ["Eva", 45, "Kassel"]
  ],
  pl: [
    ["Zofia", 28, "Warszawa"], ["Maja", 31, "Kraków"], ["Julia", 26, "Gdańsk"], ["Oliwia", 34, "Wrocław"], ["Alicja", 29, "Poznań"],
    ["Natalia", 37, "Łódź"], ["Hanna", 32, "Katowice"], ["Emilia", 30, "Lublin"], ["Lena", 27, "Szczecin"], ["Klaudia", 39, "Bydgoszcz"],
    ["Weronika", 35, "Białystok"], ["Martyna", 33, "Toruń"], ["Karolina", 41, "Rzeszów"], ["Magda", 36, "Opole"], ["Ewa", 44, "Gdynia"],
    ["Aneta", 38, "Gliwice"], ["Patrycja", 29, "Radom"], ["Dominika", 31, "Częstochowa"], ["Iza", 42, "Kielce"], ["Basia", 34, "Olsztyn"],
    ["Monika", 40, "Sopot"], ["Kasia", 27, "Zielona Góra"], ["Sandra", 36, "Płock"], ["Joanna", 45, "Elbląg"], ["Paulina", 30, "Koszalin"]
  ],
  en: [
    ["Ava", 27, "London"], ["Olivia", 32, "Manchester"], ["Grace", 29, "Birmingham"], ["Emily", 35, "Liverpool"], ["Mia", 26, "Leeds"],
    ["Sophie", 38, "Bristol"], ["Isla", 31, "Glasgow"], ["Lily", 30, "Cardiff"], ["Ella", 34, "Newcastle"], ["Chloe", 28, "Nottingham"],
    ["Amelia", 41, "Sheffield"], ["Ruby", 33, "Brighton"], ["Freya", 37, "Oxford"], ["Hannah", 42, "Cambridge"], ["Lucy", 36, "York"],
    ["Alice", 29, "Bath"], ["Evie", 44, "Norwich"], ["Maisie", 31, "Reading"], ["Phoebe", 39, "Exeter"], ["Molly", 28, "Derby"],
    ["Scarlett", 40, "Leicester"], ["Charlotte", 35, "Southampton"], ["Zara", 30, "Belfast"], ["Ivy", 43, "Swansea"], ["Georgia", 37, "Plymouth"]
  ],
  fr: [
    ["Camille", 28, "Paris"], ["Léa", 31, "Lyon"], ["Chloé", 27, "Marseille"], ["Emma", 35, "Toulouse"], ["Manon", 29, "Nice"],
    ["Inès", 33, "Nantes"], ["Clara", 36, "Bordeaux"], ["Julie", 30, "Lille"], ["Sarah", 39, "Rennes"], ["Anaïs", 32, "Strasbourg"],
    ["Louise", 41, "Montpellier"], ["Zoé", 26, "Dijon"], ["Alice", 34, "Grenoble"], ["Nina", 38, "Tours"], ["Marie", 43, "Reims"],
    ["Elise", 31, "Metz"], ["Laura", 37, "Angers"], ["Jeanne", 29, "Rouen"], ["Eva", 40, "Caen"], ["Lola", 35, "Nancy"],
    ["Sonia", 44, "Avignon"], ["Maëlle", 30, "Brest"], ["Amélie", 42, "Orléans"], ["Amandine", 33, "Annecy"], ["Célia", 27, "Poitiers"]
  ],
  it: [
    ["Sofia", 28, "Roma"], ["Giulia", 31, "Milano"], ["Aurora", 27, "Napoli"], ["Alice", 34, "Torino"], ["Emma", 29, "Firenze"],
    ["Beatrice", 36, "Bologna"], ["Chiara", 32, "Venezia"], ["Martina", 30, "Verona"], ["Elena", 38, "Palermo"], ["Greta", 35, "Genova"],
    ["Francesca", 41, "Bari"], ["Giorgia", 26, "Catania"], ["Noemi", 33, "Padova"], ["Valentina", 39, "Trieste"], ["Sara", 42, "Parma"],
    ["Alessia", 31, "Perugia"], ["Ilaria", 37, "Modena"], ["Laura", 29, "Rimini"], ["Marta", 44, "Lecce"], ["Viola", 34, "Pisa"],
    ["Anna", 40, "Siena"], ["Elisa", 30, "Como"], ["Nora", 43, "Bergamo"], ["Federica", 36, "Salerno"], ["Camilla", 27, "Cagliari"]
  ]
};

Object.keys(PROFILES).forEach((lang) => {
  PROFILES[lang] = PROFILES[lang].map((item, index) => ({
    name: item[0],
    age: item[1],
    city: item[2],
    photo: `assets/profiles/profile-${String((index % 12) + 1).padStart(2, "0")}.svg`
  }));
});

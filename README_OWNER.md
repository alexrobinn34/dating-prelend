# VelvetMeet — инструкция для владельца сайта

Этот документ поможет вам самостоятельно управлять сайтом без разработчика.

**Сайт:** статическая страница, размещённая на GitHub Pages.  
**Главный файл:** `index.html` — открывает страницу в браузере.

> **Как сохранить изменения на сайте:** после правок загрузите обновлённые файлы в репозиторий GitHub. GitHub Pages обновит сайт автоматически (обычно за 1–3 минуты).

---

## 8. Структура проекта (краткая карта)

```
dating-prelend/
├── index.html          ← главная страница (разметка, кнопки, счётчики)
├── css/
│   └── style.css       ← внешний вид: цвета, отступы, адаптив
├── js/
│   ├── config.js       ← ссылка регистрации, фон, social proof
│   ├── translations.js ← все тексты на 5 языках
│   ├── profiles.js     ← имена, возраст, города профилей
│   ├── videos.js       ← названия live-чатов
│   └── app.js          ← логика сайта (счётчики, карточки, языки)
└── assets/
    ├── backgrounds/    ← фоновые изображения Hero-блока
    └── profiles/       ← фото-заглушки профилей (SVG)
```

| Папка / файл | Назначение |
|---|---|
| `index.html` | Структура страницы: шапка, Hero, блоки, кнопки, счётчики |
| `css/style.css` | Дизайн: цвета, шрифты, кнопки, карточки, мобильная версия |
| `js/config.js` | **Главные настройки:** ссылка регистрации, фон, число «онлайн» |
| `js/translations.js` | **Все тексты** на DE, PL, EN, FR, IT |
| `js/profiles.js` | Данные профилей: имя, возраст, город |
| `js/videos.js` | Названия live-видеочатов по языкам |
| `js/app.js` | Автоматика: счётчики, карточки, переключение языка |
| `assets/backgrounds/` | Фон верхнего блока (Hero) |
| `assets/profiles/` | Изображения для карточек профилей |

---

## 1. Ссылка регистрации

### Где находится

**Файл:** `js/config.js`  
**Строка:** параметр `registrationUrl`

```javascript
const CONFIG = {
  // ВСТАВЬТЕ СВОЮ ССЫЛКУ РЕГИСТРАЦИИ
  registrationUrl: "PASTE_YOUR_LINK_HERE",
  ...
};
```

### Как заменить на новую ссылку

1. Откройте файл `js/config.js`.
2. Найдите строку `registrationUrl`.
3. Замените `PASTE_YOUR_LINK_HERE` на вашу ссылку в кавычках.

**Пример:**

```javascript
registrationUrl: "https://example.com/signup?ref=velvetmeet",
```

> Ссылка должна начинаться с `https://` и быть в кавычках `"..."`.

### Какие кнопки и элементы используют эту ссылку

Все элементы с классом `js-register` ведут на `registrationUrl`:

| Место на сайте | Где в коде |
|---|---|
| Логотип VelvetMeet (шапка) | `index.html`, строка с `class="brand js-register"` |
| Кнопка в Hero-блоке | `index.html`, кнопка `btn-primary js-register` |
| CTA-блоки между карточками (2 шт.) | создаются автоматически в `js/app.js` |
| Карточки профилей (клик по карточке) | создаются в `js/app.js` |
| Карточки live-видео (клик по карточке) | создаются в `js/app.js` |
| Финальный CTA внизу страницы | `index.html`, кнопка `btn-final js-register` |
| Липкая кнопка внизу (только мобильная) | `index.html`, блок `sticky-cta` |

**Итого:** одна ссылка в `config.js` управляет всеми кнопками и кликабельными карточками.

### Дополнительно: ускорение перехода

В том же файле `js/config.js` есть параметр `preconnectUrl`:

```javascript
preconnectUrl: null,
```

Оставьте `null` — сайт сам возьмёт домен из `registrationUrl`.  
Или укажите вручную, например: `"https://example.com"`.

---

## 2. Тексты сайта

### Где находятся все переводы

**Файл:** `js/translations.js`

Внутри объекта `TRANSLATIONS` — блок для каждого языка: `de`, `pl`, `en`, `fr`, `it`.

Структура одного языка (на примере английского `en`):

```javascript
en: {
  common: { cta: "Register for free", ... },
  hero: { kicker: "...", title: "...", subtitle: "..." },
  inlineCta: { first: {...}, second: {...} },
  benefits: { kicker: "...", title: "...", verifiedTitle: "...", ... },
  final: { kicker: "...", title: "...", subtitle: "..." },
  ...
}
```

> **Важно:** если меняете текст — меняйте его во **всех 5 языках** (или хотя бы в тех, которые используете).

---

### Как изменить заголовок Hero

**Файл:** `js/translations.js`  
**Поле:** `hero.title` внутри нужного языка

**Пример (английский):**

Было:
```javascript
title: "Thousands Are Online Right Now",
```

Стало:
```javascript
title: "Find Your Match Tonight",
```

---

### Как изменить подзаголовок Hero

**Файл:** `js/translations.js`  
**Поле:** `hero.subtitle`

**Пример (английский):**

```javascript
subtitle: "Real profiles, real connections — see who's online and start exploring.",
```

Замените текст в кавычках на свой.

---

### Как изменить тексты CTA (блоки между карточками)

**Файл:** `js/translations.js`  
**Раздел:** `inlineCta`

Два блока: `first` (первый CTA) и `second` (второй CTA).

**Пример (английский, первый CTA):**

```javascript
inlineCta: {
  first: {
    title: "Thousands of members are online right now",
    subtitle: "Register for free and explore every profile and live chat.",
    cta: "Register for Free"
  },
  second: {
    title: "Hundreds of live video chats are running now",
    subtitle: "One quick signup — then full access is yours.",
    cta: "Open Access"
  }
},
```

| Поле | Что это |
|---|---|
| `title` | Заголовок CTA-блока |
| `subtitle` | Подзаголовок |
| `cta` | Текст кнопки в этом блоке |

---

### Как изменить блок Why Join (преимущества)

**Файл:** `js/translations.js`  
**Раздел:** `benefits`

**Пример (английский):**

```javascript
benefits: {
  kicker: "Why join",           // маленькая оранжевая подпись
  title: "Fast, private access", // заголовок секции
  verifiedTitle: "Verified profiles",
  verifiedText: "Real members with thoughtful profiles — built for genuine connections.",
  safeTitle: "Data safety",
  safeText: "Your privacy comes first. No spam, no hassle — just discreet access.",
  fastTitle: "Quick registration",
  fastText: "Sign up in minutes and start browsing right away."
},
```

---

### Как изменить финальный CTA (внизу страницы)

**Файл:** `js/translations.js`  
**Раздел:** `final`

**Пример (английский):**

```javascript
final: {
  kicker: "Ready?",
  title: "Your next match could be online now",
  subtitle: "Create your free account and start exploring profiles and live chats today."
},
```

Текст кнопки в финальном CTA берётся из `common.cta` (общая кнопка «Register for free»).

---

### Другие полезные тексты

| Что на сайте | Где в `translations.js` |
|---|---|
| Текст всех основных кнопок | `common.cta` |
| «Заблокировано» на карточках | `common.locked` |
| Счётчик в шапке «X online now» | `header.statusOnline` (шаблон `{count}`) |
| Блок Live Activity | `stats.*` |
| Подвал | `footer.note` |
| Название сайта в `<title>` | `index.html`, тег `<title>VelvetMeet</title>` |

---

## 3. Языки

### Где находятся переводы

| Файл | Что содержит |
|---|---|
| `js/translations.js` | Все тексты интерфейса |
| `js/profiles.js` | Имена и города профилей |
| `js/videos.js` | Названия live-чатов |
| `index.html` | Пункты в выпадающем меню языков |
| `js/app.js` | Список поддерживаемых языков |

Текущие языки: **DE, PL, EN, FR, IT**.

---

### Как изменить существующий перевод

1. Откройте `js/translations.js`.
2. Найдите нужный язык (`de`, `pl`, `en`, `fr`, `it`).
3. Измените текст в кавычках.
4. Сохраните файл.

**Пример — изменить кнопку на немецком:**

```javascript
de: {
  common: { cta: "Kostenlos registrieren", ... },
```

Замените `"Kostenlos registrieren"` на свой текст.

---

### Как добавить новый язык

Нужно отредактировать **4 файла**:

#### Шаг 1 — `js/translations.js`

Скопируйте блок любого языка (например `en`) и вставьте новый блок с кодом языка, например `es`:

```javascript
es: {
  common: { cta: "Regístrate gratis", locked: "...", premium: "Premium" },
  hero: { kicker: "...", title: "...", subtitle: "...", ... },
  // ... скопируйте и переведите все поля
},
```

#### Шаг 2 — `js/profiles.js`

Добавьте массив профилей для нового языка:

```javascript
es: [
  ["Lucía", 28, "Madrid"], ["Carmen", 31, "Barcelona"], ...
],
```

#### Шаг 3 — `js/videos.js`

Добавьте названия чатов:

```javascript
es: ["Madrid Live", "Barcelona Room", "Valencia Night", ...],
```

#### Шаг 4 — `js/app.js`

Найдите в начале файла:

```javascript
const supportedLanguages = ["de", "pl", "en", "fr", "it"];
const langCodes = { de: "DE", pl: "PL", en: "EN", fr: "FR", it: "IT" };
```

Добавьте новый код:

```javascript
const supportedLanguages = ["de", "pl", "en", "fr", "it", "es"];
const langCodes = { de: "DE", pl: "PL", en: "EN", fr: "FR", it: "IT", es: "ES" };
```

#### Шаг 5 — `index.html`

В меню языков добавьте пункт:

```html
<li role="option" data-lang="es"><span class="lang-flag">&#x1F1EA;&#x1F1F8;</span> Espa&ntilde;ol</li>
```

---

### Как удалить язык

Сделайте обратное добавлению:

1. Удалите блок языка из `js/translations.js`.
2. Удалите блок из `js/profiles.js`.
3. Удалите блок из `js/videos.js`.
4. Уберите код из `supportedLanguages` и `langCodes` в `js/app.js`.
5. Удалите пункт `<li>` из `index.html`.

### Язык по умолчанию

**Файл:** `js/app.js`  
**Строка:**

```javascript
const DEFAULT_LANGUAGE = "en";
```

Замените `"en"` на нужный код (`de`, `pl`, `fr`, `it`).

---

## 4. Карточки профилей

### Где хранятся данные

**Файл:** `js/profiles.js`

Каждый профиль задаётся тремя значениями в массиве:

```javascript
["Имя", Возраст, "Город"]
```

**Пример (английский блок):**

```javascript
en: [
  ["Ava", 27, "London"],
  ["Olivia", 32, "Manchester"],
  ["Grace", 29, "Birmingham"],
  ...
],
```

| Позиция | Что это | Пример |
|---|---|---|
| 1-е значение | Имя | `"Ava"` |
| 2-е значение | Возраст (число) | `27` |
| 3-е значение | Город | `"London"` |

> Для каждого языка — свой список имён и городов (25 профилей на язык).

---

### Как добавить новое имя

1. Откройте `js/profiles.js`.
2. Найдите нужный язык (`en`, `de`, и т.д.).
3. Добавьте новую строку в массив:

```javascript
["Sophia", 30, "Edinburgh"],
```

---

### Как добавить новый город

Город указывается третьим значением в строке профиля:

```javascript
["Emma", 28, "Cambridge"],  // Cambridge — город
```

Или измените город у существующего профиля:

```javascript
["Ava", 27, "Oxford"],  // было "London", стало "Oxford"
```

---

### Фотографии профилей

#### Где сейчас хранятся заглушки

**Папка:** `assets/profiles/`

Файлы: `profile-01.svg` … `profile-12.svg` (12 штук).

Сайт автоматически назначает фото по номеру профиля (циклически, 1–12).

Назначение происходит в конце `js/profiles.js`:

```javascript
photo: `assets/profiles/profile-${String((index % 12) + 1).padStart(2, "0")}.svg`
```

---

### Как заменить SVG-заглушки на реальные фотографии

#### Способ 1 — заменить файлы (проще всего)

1. Подготовьте 12 фотографий.
2. Назовите их: `profile-01.webp`, `profile-02.webp`, … `profile-12.webp`.
3. Положите в папку `assets/profiles/`.
4. В `js/profiles.js` в последних строках замените `.svg` на `.webp`:

```javascript
photo: `assets/profiles/profile-${String((index % 12) + 1).padStart(2, "0")}.webp`
```

#### Способ 2 — формат JPG

Те же шаги, но файлы `profile-01.jpg` … `profile-12.jpg` и в коде:

```javascript
photo: `assets/profiles/profile-${String((index % 12) + 1).padStart(2, "0")}.jpg`
```

---

### Рекомендации по фотографиям

| Параметр | Рекомендация |
|---|---|
| Формат | **WebP** (лучше) или **JPG** |
| Количество | 12 файлов (повторяются на 25 профилях) |
| Пропорция | Вертикальная, примерно 3:4 (портрет) |
| Размер | 400×530 px или больше |
| Имена файлов | `profile-01.webp`, `profile-02.webp`, … `profile-12.webp` |
| Папка | `assets/profiles/` |

> Не используйте пробелы и кириллицу в именах файлов. Только латиница, цифры, дефис.

---

## 5. Фон сайта

### Где подключается фон

Фон верхнего блока (Hero) настраивается в **`js/config.js`**:

```javascript
backgroundImages: [
  {
    webp: "assets/backgrounds/bg1.webp",
    fallback: "assets/backgrounds/bg1.svg"
  }
],
backgroundImageIndex: 0,
```

Также в `index.html` есть предзагрузка:

```html
<link rel="preload" href="assets/backgrounds/bg1.webp" as="image" type="image/webp">
<link rel="preload" href="assets/backgrounds/bg1.svg" as="image" type="image/svg+xml">
```

---

### Как заменить фон

1. Положите новое изображение в папку `assets/backgrounds/`.
2. Откройте `js/config.js`.
3. Измените пути в `backgroundImages`:

```javascript
backgroundImages: [
  {
    webp: "assets/backgrounds/my-bg.webp",
    fallback: "assets/backgrounds/my-bg.jpg"
  }
],
```

4. (Рекомендуется) Обновите строки preload в `index.html` на те же имена файлов.

---

### Рекомендации по фону

| Параметр | Рекомендация |
|---|---|
| Папка | `assets/backgrounds/` |
| Формат | **WebP** + **JPG** или **SVG** как запасной |
| Размер | 1920×1080 px или шире (16:9) |
| Пример имени | `bg1.webp` + `bg1.jpg` |
| Вес файла | до 300–500 KB для быстрой загрузки |

### Несколько фонов (A/B-тест)

Добавьте варианты в массив и смените индекс:

```javascript
backgroundImages: [
  { webp: "assets/backgrounds/bg1.webp", fallback: "assets/backgrounds/bg1.jpg" },
  { webp: "assets/backgrounds/bg2.webp", fallback: "assets/backgrounds/bg2.jpg" }
],
backgroundImageIndex: 1,  // 0 = первый, 1 = второй
```

> Общий тёмный фон страницы (не Hero) задаётся в `css/style.css` переменной `--bg` (см. раздел 7).

---

## 6. Счётчики

На сайте три динамических счётчика: **профили**, **онлайн**, **live-видео**.  
Они также отображаются в шапке («X online now»).

### Где находятся настройки

| Что настраивать | Файл | Где именно |
|---|---|---|
| Стартовые значения на странице | `index.html` | атрибут `data-counter` у `.stat-value` |
| Число «онлайн» в шапке | `js/config.js` | `socialProof.online` |
| Логика живых счётчиков | `js/app.js` | `liveStats`, `LIVE_LIMITS`, `scheduleLiveCounters` |

---

### Стартовые значения в `index.html`

```html
<span class="stat-value" data-counter="12840" data-live-counter="profiles">0</span>
<span class="stat-value" data-counter="3916" data-live-counter="online">0</span>
<span class="stat-value" data-counter="724" data-live-counter="videos">0</span>
```

**Пример — изменить стартовое число профилей на 15000:**

```html
<span class="stat-value" data-counter="15000" data-live-counter="profiles">0</span>
```

Также обновите в `js/config.js`:

```javascript
socialProof: {
  online: 3916,
  profiles: 15000   // синхронизируйте с data-counter
}
```

И в `js/app.js` (строка `liveStats`):

```javascript
const liveStats = {
  online: (CONFIG.socialProof && CONFIG.socialProof.online) || 3916,
  profiles: 12840,   // ← измените на 15000
  videos: 724
};
```

---

### Диапазон изменения чисел (мин / макс)

**Файл:** `js/app.js`  
**Блок:** `LIVE_LIMITS`

```javascript
const LIVE_LIMITS = {
  online: { min: 3860, max: 3970, delta: 5 },
  profiles: { min: 12780, max: 12920, delta: 3 },
  videos: { min: 708, max: 742, delta: 3 }
};
```

| Поле | Что делает |
|---|---|
| `min` | Минимальное значение, ниже не опустится |
| `max` | Максимальное значение, выше не поднимется |
| `delta` | На сколько максимум может измениться за один шаг |

**Пример — расширить диапазон «онлайн»:**

```javascript
online: { min: 3500, max: 4500, delta: 8 },
```

---

### Скорость обновления

**Файл:** `js/app.js`  
**Функция:** `scheduleLiveCounters`

```javascript
const delay = 10000 + Math.random() * 10000;
```

| Значение | Интервал |
|---|---|
| `10000` | минимум 10 секунд |
| `10000 + Math.random() * 10000` | случайно от 10 до 20 секунд |

**Пример — обновлять каждые 5–10 секунд:**

```javascript
const delay = 5000 + Math.random() * 5000;
```

**Пример — обновлять каждые 30 секунд:**

```javascript
const delay = 30000;
```

---

## 7. Дизайн

### Где находятся основные цвета

**Файл:** `css/style.css`  
**Блок:** `:root` (первые ~25 строк)

```css
:root {
  --bg: #07090f;              /* основной фон страницы */
  --bg-elevated: #0c1018;     /* приподнятый фон */
  --text: #fff7f3;            /* основной текст */
  --muted: rgba(255, 247, 243, 0.72);  /* приглушённый текст */
  --accent: #ff4d75;          /* розовый акцент */
  --accent-2: #ffc66d;        /* оранжевый акцент */
  --teal: #39d0c2;            /* бирюзовый */
  --stroke: rgba(255, 255, 255, 0.16); /* рамки карточек */
  ...
}
```

---

### Как изменить цвет кнопки

**Файл:** `css/style.css`  
**Класс:** `.btn-primary`

```css
.btn-primary {
  background: linear-gradient(135deg, var(--accent), #ff7b58 55%, var(--accent-2));
  color: #1b0b10;
  box-shadow: 0 16px 40px rgba(255, 77, 117, 0.32), var(--glow);
}
```

**Пример — сделать кнопку синей:**

```css
.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #60a5fa 55%, #93c5fd);
  color: #ffffff;
}
```

Или измените `--accent` и `--accent-2` в `:root` — кнопка подстроится автоматически.

---

### Как изменить цвет фона страницы

**Файл:** `css/style.css`  
**Переменная:** `--bg` в `:root`

```css
--bg: #07090f;
```

**Пример — чуть светлее:**

```css
--bg: #12141c;
```

Фон Hero-изображения — отдельно, через `js/config.js` (раздел 5).

---

### Как изменить цвет карточек

Карточки используют «стеклянный» эффект. Основные места:

| Элемент | Где в `css/style.css` |
|---|---|
| Панели (Hero, CTA, преимущества) | `.glass-panel` |
| Карточки профилей | `.mixed-card` |
| Розовый оттенок карточки | `.profile-variant-rose .card-glass` |
| Бирюзовый оттенок | `.profile-variant-teal .card-glass` |
| Оранжевый оттенок | `.profile-variant-amber .card-glass` |
| Рамка карточек | `--stroke` в `:root` |

**Пример — сделать карточки чуть ярче:**

В `.glass-panel` найдите `background: linear-gradient(...)` и увеличьте прозрачность белого, например с `0.14` до `0.18`.

---

## 9. Быстрые изменения

### Что чаще всего потребуется менять

---

#### 1. Смена ссылки регистрации

| | |
|---|---|
| **Файл** | `js/config.js` |
| **Что менять** | `registrationUrl: "ВАША_ССЫЛКА"` |

```javascript
registrationUrl: "https://partner-site.com/register?id=123",
```

---

#### 2. Смена заголовка Hero

| | |
|---|---|
| **Файл** | `js/translations.js` |
| **Что менять** | `hero.title` для каждого языка |

```javascript
// en:
title: "Your New Headline Here",
```

---

#### 3. Смена текста кнопки

| | |
|---|---|
| **Файл** | `js/translations.js` |
| **Что менять** | `common.cta` |

```javascript
common: { cta: "Join Now — It's Free", ... },
```

---

#### 4. Замена фона

| | |
|---|---|
| **Файл** | положить картинку в `assets/backgrounds/`, прописать путь в `js/config.js` |

```javascript
backgroundImages: [
  { webp: "assets/backgrounds/new-bg.webp", fallback: "assets/backgrounds/new-bg.jpg" }
],
```

---

#### 5. Замена фотографий профилей

| | |
|---|---|
| **Папка** | `assets/profiles/` |
| **Файлы** | `profile-01.webp` … `profile-12.webp` |
| **Код** | в `js/profiles.js` заменить `.svg` на `.webp` в последней строке |

---

#### 6. Добавление города

| | |
|---|---|
| **Файл** | `js/profiles.js` |
| **Что менять** | третье значение в строке профиля |

```javascript
["Anna", 29, "New City"],
```

---

#### 7. Добавление имени

| | |
|---|---|
| **Файл** | `js/profiles.js` |
| **Что менять** | добавить строку в массив нужного языка |

```javascript
["NewName", 26, "Berlin"],
```

---

## Полезные советы

1. **Делайте резервную копию** файла перед изменением (скопируйте файл с суффиксом `.bak`).
2. **Проверяйте сайт** после каждого изменения: откройте в браузере и обновите страницу (Ctrl+F5).
3. **Кавычки** — все тексты и ссылки должны быть в `"двойных кавычках"`.
4. **Запятые** — в JavaScript после каждого блока нужна запятая, кроме последнего элемента в списке.
5. **Не удаляйте** фигурные скобки `{ }` и квадратные `[ ]` — это сломает сайт.
6. Если кнопки не работают — проверьте, что в `config.js` ссылка не равна `PASTE_YOUR_LINK_HERE`.

---

## Шпаргалка: какой файл за что отвечает

| Задача | Файл |
|---|---|
| Ссылка регистрации | `js/config.js` |
| Тексты | `js/translations.js` |
| Имена и города | `js/profiles.js` |
| Названия live-чатов | `js/videos.js` |
| Счётчики (логика) | `js/app.js` |
| Счётчики (старт) | `index.html` |
| Фон Hero | `js/config.js` + `assets/backgrounds/` |
| Фото профилей | `assets/profiles/` + `js/profiles.js` |
| Цвета и дизайн | `css/style.css` |
| Языки (меню) | `index.html` + `js/app.js` |

---

*Документ создан для проекта VelvetMeet (dating-prelend).*

// Здесь менять тексты и добавлять переводы.
const TRANSLATIONS = {
  de: {
    common: { cta: "Kostenlos registrieren", locked: "Nach Registrierung freigeschaltet", premium: "Premium" },
    header: { statusOnline: "{count} online jetzt" },
    hero: {
      kicker: "Private Dating Area 18+",
      title: "Tausende sind gerade online",
      subtitle: "Echte Profile, echte Gespräche – schau rein, wer gerade da ist.",
      microcopy: "",
      valueProfiles: "Private Profile",
      valueLive: "LIVE-Videochats",
      valueOnline: "Aktive Nutzer online",
      socialProof: "{online} online · {profiles} aktive Profile"
    },
    stats: { kicker: "Aktivität jetzt", title: "Heute ist schon viel los", profiles: "aktive Profile", online: "Nutzer online", videos: "Live-Videochats" },
    content: { kicker: "Profile & LIVE", title: "Verfügbare Profile und Live-Chats", subtitle: "Fotos und Live-Vorschauen sind geschützt. Nach der Registrierung siehst du alles.", profilesMore: "{count} Profile nach Registrierung verfügbar" },
    inlineCta: {
      first: { title: "Gerade sind tausende Mitglieder online", subtitle: "Kostenlos registrieren und alle Profile sowie Live-Chats entdecken.", cta: "Kostenlos registrieren" },
      second: { title: "Hunderte Live-Chats laufen gerade", subtitle: "Ein Klick zur Registrierung – danach hast du vollen Zugang.", cta: "Zugang öffnen" }
    },
    profiles: { kicker: "Geschlossene Profile", title: "Verfügbare Profile", subtitle: "Bei jedem Besuch neu gemischt. Fotos und Details nach der Registrierung sichtbar." },
    videos: { kicker: "LIVE", title: "Live-Videochats", subtitle: "Vorschauen laufen ohne Ton. Voller Zugang nach der Registrierung." },
    benefits: {
      kicker: "Warum registrieren",
      title: "Diskret, schnell und unkompliziert",
      verifiedTitle: "Geprüfte Profile",
      verifiedText: "Echte Mitglieder mit durchdachten Profilen – für ein seriöses Dating-Erlebnis.",
      safeTitle: "Datenschutz",
      safeText: "Deine Daten bleiben privat. Kein Spam, kein Druck – nur diskreter Zugang.",
      fastTitle: "Schnelle Registrierung",
      fastText: "In wenigen Minuten registriert – und du kannst sofort loslegen."
    },
    final: { kicker: "Bereit?", title: "Dein nächstes Match könnte schon online sein", subtitle: "Jetzt kostenlos registrieren und Profile sowie Live-Chats ohne Wartezeit entdecken." },
    footer: { note: "18+ | Diskrete Dating-Vorschau" }
  },
  pl: {
    common: { cta: "Zarejestruj się za darmo", locked: "Dostęp po rejestracji", premium: "Premium" },
    header: { statusOnline: "{count} online teraz" },
    hero: {
      kicker: "Prywatna strefa dating 18+",
      title: "Tysiące osób jest teraz online",
      subtitle: "Sprawdź, kto jest online – profile i czaty live czekają na Ciebie.",
      microcopy: "",
      valueProfiles: "Profile użytkowników",
      valueLive: "Czaty LIVE",
      valueOnline: "Aktywni użytkownicy",
      socialProof: "{online} online · {profiles} aktywnych profili"
    },
    stats: { kicker: "Aktywność teraz", title: "Dziś naprawdę dużo się dzieje", profiles: "aktywne profile", online: "użytkowników online", videos: "czaty wideo live" },
    content: { kicker: "Profile i LIVE", title: "Dostępne profile i czaty live", subtitle: "Zdjęcia i podglądy live są chronione. Po rejestracji zobaczysz wszystko.", profilesMore: "{count} profili dostępnych po rejestracji" },
    inlineCta: {
      first: { title: "Tysiące osób jest teraz online", subtitle: "Załóż darmowe konto i odkryj wszystkie profile oraz czaty live.", cta: "Zarejestruj się za darmo" },
      second: { title: "Setki czatów wideo już trwa", subtitle: "Zarejestruj się i odblokuj pełny dostęp w kilka chwil.", cta: "Otwórz dostęp" }
    },
    profiles: { kicker: "Zamknięte profile", title: "Dostępne profile", subtitle: "Lista zmienia się przy każdej wizycie. Zdjęcia i szczegóły widoczne po rejestracji." },
    videos: { kicker: "LIVE", title: "Czaty wideo live", subtitle: "Podglądy bez dźwięku. Pełny dostęp po rejestracji." },
    benefits: {
      kicker: "Dlaczego warto",
      title: "Dyskretnie, szybko i bez zbędnych kroków",
      verifiedTitle: "Sprawdzone profile",
      verifiedText: "Prawdziwi użytkownicy i sensowne profile – bez fejków i pustych kont.",
      safeTitle: "Prywatność",
      safeText: "Twoje dane zostają u Ciebie. Bez spamu i zbędnych formalności.",
      fastTitle: "Szybka rejestracja",
      fastText: "Kilka kliknięć i masz dostęp – od razu możesz przeglądać profile."
    },
    final: { kicker: "Gotowe?", title: "Twoje następne spotkanie może być już online", subtitle: "Załóż darmowe konto i od razu przeglądaj profile oraz czaty live." },
    footer: { note: "18+ | Dyskretny podgląd dating" }
  },
  en: {
    common: { cta: "Register for free", locked: "Available after registration", premium: "Premium" },
    header: { statusOnline: "{count} online now" },
    hero: {
      kicker: "Private dating area 18+",
      title: "Thousands Are Online Right Now",
      subtitle: "Real profiles, real connections — see who's online and start exploring.",
      microcopy: "",
      valueProfiles: "Member profiles",
      valueLive: "LIVE video chats",
      valueOnline: "Active members online",
      socialProof: "{online} online now · {profiles} active profiles"
    },
    stats: { kicker: "Live activity", title: "Fresh activity is happening now", profiles: "active profiles", online: "users online", videos: "live video chats" },
    content: { kicker: "Profiles & LIVE", title: "Available profiles and live chats", subtitle: "Photos and live previews are protected. Full access opens after registration.", profilesMore: "{count} profiles available after registration" },
    inlineCta: {
      first: { title: "Thousands of members are online right now", subtitle: "Register for free and explore every profile and live chat.", cta: "Register for Free" },
      second: { title: "Hundreds of live video chats are running now", subtitle: "One quick signup — then full access is yours.", cta: "Open Access" }
    },
    profiles: { kicker: "Locked profiles", title: "Available profiles", subtitle: "Profiles are shuffled on each visit. Photos and details unlock after registration." },
    videos: { kicker: "LIVE", title: "Live video chats", subtitle: "Muted previews are visible now. Full access opens after registration." },
    benefits: {
      kicker: "Why join",
      title: "Fast, private access",
      verifiedTitle: "Verified profiles",
      verifiedText: "Real members with thoughtful profiles — built for genuine connections.",
      safeTitle: "Data safety",
      safeText: "Your privacy comes first. No spam, no hassle — just discreet access.",
      fastTitle: "Quick registration",
      fastText: "Sign up in minutes and start browsing right away."
    },
    final: { kicker: "Ready?", title: "Your next match could be online now", subtitle: "Create your free account and start exploring profiles and live chats today." },
    footer: { note: "18+ | Discreet dating preview" }
  },
  fr: {
    common: { cta: "S'inscrire gratuitement", locked: "Accès après inscription", premium: "Premium" },
    header: { statusOnline: "{count} en ligne" },
    hero: {
      kicker: "Espace dating privé 18+",
      title: "Des milliers de personnes en ligne maintenant",
      subtitle: "De vrais profils, de vraies rencontres — voyez qui est en ligne.",
      microcopy: "",
      valueProfiles: "Profils membres",
      valueLive: "Chats vidéo LIVE",
      valueOnline: "Membres actifs en ligne",
      socialProof: "{online} en ligne · {profiles} profils actifs"
    },
    stats: { kicker: "Activité en direct", title: "L'activité est déjà bien lancée", profiles: "profils actifs", online: "utilisateurs en ligne", videos: "chats vidéo live" },
    content: { kicker: "Profils & LIVE", title: "Profils disponibles et chats live", subtitle: "Les photos et aperçus live sont protégés. L'accès complet s'ouvre après inscription.", profilesMore: "{count} profils disponibles après inscription" },
    inlineCta: {
      first: { title: "Des milliers de membres sont en ligne", subtitle: "Inscrivez-vous gratuitement et découvrez tous les profils et chats live.", cta: "S'inscrire gratuitement" },
      second: { title: "Des centaines de chats vidéo live en cours", subtitle: "Une inscription rapide — puis accès complet.", cta: "Ouvrir l'accès" }
    },
    profiles: { kicker: "Profils fermés", title: "Profils disponibles", subtitle: "La liste change à chaque visite. Photos et détails visibles après inscription." },
    videos: { kicker: "LIVE", title: "Chats vidéo live", subtitle: "Aperçus sans son. Accès complet après inscription." },
    benefits: {
      kicker: "Pourquoi rejoindre",
      title: "Un accès rapide et discret",
      verifiedTitle: "Profils vérifiés",
      verifiedText: "De vrais membres avec des profils soignés — pour des rencontres sérieuses.",
      safeTitle: "Confidentialité",
      safeText: "Vos données restent privées. Pas de spam, pas de pression — juste un accès discret.",
      fastTitle: "Inscription rapide",
      fastText: "Inscrivez-vous en quelques minutes et commencez tout de suite."
    },
    final: { kicker: "Prêt?", title: "Votre prochaine rencontre est peut-être déjà en ligne", subtitle: "Inscrivez-vous gratuitement et explorez profils et chats live dès maintenant." },
    footer: { note: "18+ | Aperçu dating discret" }
  },
  it: {
    common: { cta: "Registrati gratis", locked: "Accesso dopo la registrazione", premium: "Premium" },
    header: { statusOnline: "{count} online ora" },
    hero: {
      kicker: "Area dating privata 18+",
      title: "Migliaia di persone online adesso",
      subtitle: "Profili veri, incontri veri — scopri chi è online in questo momento.",
      microcopy: "",
      valueProfiles: "Profili membri",
      valueLive: "Videochat LIVE",
      valueOnline: "Membri attivi online",
      socialProof: "{online} online · {profiles} profili attivi"
    },
    stats: { kicker: "Attività live", title: "Oggi c'è già molta attività", profiles: "profili attivi", online: "utenti online", videos: "videochat live" },
    content: { kicker: "Profili e LIVE", title: "Profili disponibili e live chat", subtitle: "Foto e anteprime live sono protette. L'accesso completo si apre dopo la registrazione.", profilesMore: "{count} profili disponibili dopo la registrazione" },
    inlineCta: {
      first: { title: "Migliaia di membri sono online ora", subtitle: "Registrati gratis e scopri tutti i profili e le live chat.", cta: "Registrati gratis" },
      second: { title: "Centinaia di videochat live sono attive", subtitle: "Una registrazione veloce — poi accesso completo.", cta: "Apri l'accesso" }
    },
    profiles: { kicker: "Profili bloccati", title: "Profili disponibili", subtitle: "Le schede cambiano a ogni visita. Foto e dettagli si sbloccano dopo la registrazione." },
    videos: { kicker: "LIVE", title: "Videochat live", subtitle: "Anteprime senza audio. Accesso completo dopo la registrazione." },
    benefits: {
      kicker: "Perché unirti",
      title: "Accesso rapido e discreto",
      verifiedTitle: "Profili verificati",
      verifiedText: "Membri reali con profili curati — per incontri autentici.",
      safeTitle: "Privacy",
      safeText: "I tuoi dati restano privati. Niente spam, niente pressione — solo accesso discreto.",
      fastTitle: "Registrazione veloce",
      fastText: "Registrati in pochi minuti e inizia subito a esplorare."
    },
    final: { kicker: "Pronto?", title: "Il tuo prossimo incontro potrebbe essere già online", subtitle: "Registrati gratis e scopri profili e live chat senza attese." },
    footer: { note: "18+ | Anteprima dating discreta" }
  }
};

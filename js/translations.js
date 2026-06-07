// Здесь менять тексты и добавлять переводы.
const TRANSLATIONS = {
  de: {
    common: { cta: "Kostenlos registrieren", locked: "Zugang nach Registrierung", premium: "Premium" },
    header: { statusOnline: "{count} online jetzt" },
    hero: {
      kicker: "Private Dating Area 18+",
      title: "Entdecke diskrete Profile und Live-Chats in einer Premium-Umgebung",
      subtitle: "Sieh aktive Profile, Live-Vorschauen und aktuelle Aktivität. Voller Zugriff wird nach der Registrierung freigeschaltet.",
      microcopy: "Keine Formulare auf dieser Seite. Ein Klick führt direkt zur Registrierung.",
      valueProfiles: "Private Profile",
      valueLive: "LIVE-Videochats",
      valueOnline: "Aktive Nutzer online",
      socialProof: "{online} online · {profiles} aktive Profile"
    },
    stats: { kicker: "Aktivität jetzt", title: "Heute ist bereits viel los", profiles: "aktive Profile", online: "Nutzer online", videos: "Live-Videochats" },
    content: { kicker: "Profile & LIVE", title: "Verfügbare Profile und Live-Chats", subtitle: "Fotos und Live-Vorschauen sind geschützt. Voller Zugang wird nach der Registrierung freigeschaltet." },
    profiles: { kicker: "Geschlossene Profile", title: "Verfügbare Profile", subtitle: "Die Vorschau wird bei jedem Besuch neu gemischt. Details und Fotos sind nach der Registrierung sichtbar." },
    videos: { kicker: "LIVE", title: "Live-Videochats", subtitle: "Aktive Vorschauen laufen ohne Ton. Voller Zugang wird nach der Registrierung freigegeben." },
    benefits: {
      kicker: "Warum registrieren",
      title: "Schneller, diskreter Zugang",
      verifiedTitle: "Geprüfte Profile",
      verifiedText: "Profile werden kuratiert, damit die Vorschau sauber und glaubwürdig bleibt.",
      safeTitle: "Datensicherheit",
      safeText: "Der Zugriff ist privat aufgebaut und vermeidet unnötige Schritte.",
      fastTitle: "Schnelle Registrierung",
      fastText: "Ein klarer Weg: ansehen, auswählen, registrieren und Zugang erhalten."
    },
    final: { kicker: "Bereit?", title: "Schalte Profile und Live-Chats frei", subtitle: "Registriere dich jetzt und öffne den vollständigen Bereich." },
    footer: { note: "18+ | Diskrete Dating-Vorschau" }
  },
  pl: {
    common: { cta: "Zarejestruj się za darmo", locked: "Dostęp po rejestracji", premium: "Premium" },
    header: { statusOnline: "{count} online teraz" },
    hero: {
      kicker: "Prywatna strefa dating 18+",
      title: "Odkryj ukryte profile i czaty live w nowoczesnym stylu premium",
      subtitle: "Zobacz aktywne profile, podglądy live i aktualną aktywność. Pełny dostęp otrzymasz po rejestracji.",
      microcopy: "Bez formularzy na tej stronie. Kliknięcie prowadzi bezpośrednio do rejestracji.",
      valueProfiles: "Profile użytkowników",
      valueLive: "Czaty LIVE",
      valueOnline: "Aktywni użytkownicy",
      socialProof: "{online} online · {profiles} aktywnych profili"
    },
    stats: { kicker: "Aktywność teraz", title: "Dzisiaj dzieje się naprawdę dużo", profiles: "aktywne profile", online: "użytkowników online", videos: "czaty wideo live" },
    content: { kicker: "Profile i LIVE", title: "Dostępne profile i czaty live", subtitle: "Zdjęcia oraz podglądy live są zabezpieczone. Pełny dostęp zostanie odblokowany po rejestracji." },
    profiles: { kicker: "Zamknięte profile", title: "Dostępne profile", subtitle: "Lista miesza się przy każdej wizycie. Szczegóły i zdjęcia są widoczne po rejestracji." },
    videos: { kicker: "LIVE", title: "Czaty wideo live", subtitle: "Podglądy działają bez dźwięku. Pełny dostęp zostanie odblokowany po rejestracji." },
    benefits: {
      kicker: "Dlaczego warto",
      title: "Szybki, dyskretny dostęp",
      verifiedTitle: "Sprawdzone profile",
      verifiedText: "Karty są przygotowane tak, aby wyglądały wiarygodnie i naturalnie.",
      safeTitle: "Bezpieczeństwo danych",
      safeText: "Ścieżka dostępu jest prosta i bez zbędnych kroków.",
      fastTitle: "Szybka rejestracja",
      fastText: "Oglądasz, wybierasz, rejestrujesz się i otrzymujesz dostęp."
    },
    final: { kicker: "Gotowe?", title: "Odblokuj profile i czaty live", subtitle: "Zarejestruj się teraz i przejdź do pełnej strefy." },
    footer: { note: "18+ | Dyskretny podgląd dating" }
  },
  en: {
    common: { cta: "Register for free", locked: "Available after registration", premium: "Premium" },
    header: { statusOnline: "{count} online now" },
    hero: {
      kicker: "Private dating area 18+",
      title: "Explore locked profiles and live chats in a premium dating space",
      subtitle: "Preview active profiles, live rooms, and real-time activity. Full access opens after registration.",
      microcopy: "No forms on this page. Every main action leads straight to registration.",
      valueProfiles: "Member profiles",
      valueLive: "LIVE video chats",
      valueOnline: "Active members online",
      socialProof: "{online} online now · {profiles} active profiles"
    },
    stats: { kicker: "Live activity", title: "Fresh activity is happening now", profiles: "active profiles", online: "users online", videos: "live video chats" },
    content: { kicker: "Profiles & LIVE", title: "Available profiles and live chats", subtitle: "Photos and live previews are protected. Full access opens after registration." },
    profiles: { kicker: "Locked profiles", title: "Available profiles", subtitle: "Profiles are shuffled on each visit. Photos and details unlock after registration." },
    videos: { kicker: "LIVE", title: "Live video chats", subtitle: "Muted animated previews are visible now. Full access opens after registration." },
    benefits: {
      kicker: "Why join",
      title: "Fast, private access",
      verifiedTitle: "Verified profiles",
      verifiedText: "Profile cards are curated to keep the preview clean and believable.",
      safeTitle: "Data safety",
      safeText: "The path is private, simple, and avoids unnecessary collection steps.",
      fastTitle: "Quick registration",
      fastText: "A simple flow: preview, choose, register, and unlock access."
    },
    final: { kicker: "Ready?", title: "Unlock profiles and live chats", subtitle: "Register now and open the full dating area." },
    footer: { note: "18+ | Discreet dating preview" }
  },
  fr: {
    common: { cta: "S'inscrire gratuitement", locked: "Accès après inscription", premium: "Premium" },
    header: { statusOnline: "{count} en ligne" },
    hero: {
      kicker: "Espace dating privé 18+",
      title: "Explorez des profils verrouillés et des chats live dans un univers premium",
      subtitle: "Apercevez les profils actifs, les salons live et l'activité du moment. L'accès complet s'ouvre après l'inscription.",
      microcopy: "Aucun formulaire ici. Chaque action principale mène directement à l'inscription.",
      valueProfiles: "Profils membres",
      valueLive: "Chats vidéo LIVE",
      valueOnline: "Membres actifs en ligne",
      socialProof: "{online} en ligne · {profiles} profils actifs"
    },
    stats: { kicker: "Activité en direct", title: "L'activité du jour est déjà lancée", profiles: "profils actifs", online: "utilisateurs en ligne", videos: "chats vidéo live" },
    content: { kicker: "Profils & LIVE", title: "Profils disponibles et chats live", subtitle: "Les photos et aperçus live sont protégés. L'accès complet s'ouvre après inscription." },
    profiles: { kicker: "Profils fermés", title: "Profils disponibles", subtitle: "La liste est mélangée à chaque visite. Photos et détails sont visibles après inscription." },
    videos: { kicker: "LIVE", title: "Chats vidéo live", subtitle: "Les aperçus animés sont sans son. L'accès complet est ouvert après inscription." },
    benefits: {
      kicker: "Pourquoi rejoindre",
      title: "Un accès rapide et discret",
      verifiedTitle: "Profils vérifiés",
      verifiedText: "Les cartes sont préparées pour garder une expérience claire et crédible.",
      safeTitle: "Sécurité des données",
      safeText: "Le parcours reste privé, simple et sans étapes inutiles.",
      fastTitle: "Inscription rapide",
      fastText: "Un chemin direct: aperçu, choix, inscription, accès."
    },
    final: { kicker: "Prêt?", title: "Déverrouillez les profils et les chats live", subtitle: "Inscrivez-vous maintenant pour ouvrir l'espace complet." },
    footer: { note: "18+ | Aperçu dating discret" }
  },
  it: {
    common: { cta: "Registrati gratis", locked: "Accesso dopo la registrazione", premium: "Premium" },
    header: { statusOnline: "{count} online ora" },
    hero: {
      kicker: "Area dating privata 18+",
      title: "Scopri profili bloccati e live chat in uno spazio dating premium",
      subtitle: "Guarda profili attivi, anteprime live e attività in tempo reale. L'accesso completo si apre dopo la registrazione.",
      microcopy: "Nessun modulo in questa pagina. Ogni azione principale porta alla registrazione.",
      valueProfiles: "Profili membri",
      valueLive: "Videochat LIVE",
      valueOnline: "Membri attivi online",
      socialProof: "{online} online · {profiles} profili attivi"
    },
    stats: { kicker: "Attività live", title: "Oggi c'è già molta attività", profiles: "profili attivi", online: "utenti online", videos: "videochat live" },
    content: { kicker: "Profili e LIVE", title: "Profili disponibili e live chat", subtitle: "Foto e anteprime live sono protette. L'accesso completo si apre dopo la registrazione." },
    profiles: { kicker: "Profili bloccati", title: "Profili disponibili", subtitle: "Le schede cambiano a ogni visita. Foto e dettagli si sbloccano dopo la registrazione." },
    videos: { kicker: "LIVE", title: "Videochat live", subtitle: "Le anteprime animate sono senza audio. L'accesso completo arriva dopo la registrazione." },
    benefits: {
      kicker: "Perché unirti",
      title: "Accesso rapido e discreto",
      verifiedTitle: "Profili verificati",
      verifiedText: "Le schede sono curate per mantenere la preview pulita e credibile.",
      safeTitle: "Sicurezza dei dati",
      safeText: "Il percorso è privato, semplice e senza passaggi inutili.",
      fastTitle: "Registrazione veloce",
      fastText: "Flusso diretto: guarda, scegli, registrati e sblocca."
    },
    final: { kicker: "Pronto?", title: "Sblocca profili e live chat", subtitle: "Registrati ora e accedi all'area completa." },
    footer: { note: "18+ | Anteprima dating discreta" }
  }
};

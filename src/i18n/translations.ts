export type Locale = "en" | "fr" | "af" | "nl";

interface Translation {
  dashboard: {
    eyebrow: string;
    welcome: string;
    greeting: (name: string) => string;
    statusSectionLabel: string;
    actionsNavLabel: string;
    statusNone: { eyebrow: string; body: string };
    statusNext: { ticket: (t: string) => string; headline: string; body: string };
    statusQueued: {
      ticket: (t: string) => string;
      personAhead: (n: number) => string;
      wait: (minutes: number) => string;
    };
    actions: {
      booking: { label: string; description: string };
      waitTime: { label: string; description: string };
      settings: { label: string; description: string };
    };
  };
  booking: {
    eyebrow: string;
    heading: string;
    closedTitle: string;
    closedBody: string;
    fullNameLabel: string;
    fullNameError: string;
    patientIdLabel: string;
    patientIdOptional: string;
    conditionLabel: string;
    conditionHint: string;
    conditionError: string;
    submitIdle: string;
    submitBusy: string;
  };
  routeTitles: { dashboard: string; booking: string; waitTime: string; settings: string };
  navigatedTo: (page: string) => string;
  settings: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    appearanceSectionTitle: string;
    languageSectionTitle: string;
    themeLabel: string;
    themes: {
      default: string;
      night: string;
      protanopia: string;
      deuteranopia: string;
      tritanopia: string;
      highContrast: string;
    };
    languageLabel: string;
  };
}

export const translations: Record<Locale, Translation> = {
  en: {
    dashboard: {
      eyebrow: "Clinic Dashboard",
      welcome: "Welcome",
      greeting: (name) => `Hi, ${name}`,
      statusSectionLabel: "Your ticket status",
      actionsNavLabel: "Dashboard actions",
      statusNone: {
        eyebrow: "No active ticket",
        body: "Book an appointment to get your place in line.",
      },
      statusNext: {
        ticket: (t) => `Ticket ${t}`,
        headline: "You're next",
        body: "Please head inside when you're called.",
      },
      statusQueued: {
        ticket: (t) => `Ticket ${t}`,
        personAhead: (n) => (n === 1 ? "person ahead of you" : "people ahead of you"),
        wait: (m) => `About ${m} ${m === 1 ? "minute" : "minutes"} until it's your turn.`,
      },
      actions: {
        booking: { label: "Book an appointment", description: "Get a ticket and hold your place in line." },
        waitTime: { label: "Check wait time", description: "See your position and estimated wait." },
        settings: { label: "Settings", description: "Language and notification preferences." },
      },
    },
    booking: {
      heading: "Book an appointment",
      eyebrow: "Your details",
      closedTitle: "The clinic is closed",
      closedBody: "Bookings aren't available right now. Please check back during operating hours.",
      fullNameLabel: "Full name",
      fullNameError: "Enter your full name.",
      patientIdLabel: "Patient ID",
      patientIdOptional: "(optional)",
      conditionLabel: "Reason for your visit",
      conditionHint:
        "Briefly describe how you're feeling. If this is a medical emergency, don't use this form — call your local emergency number instead.",
      conditionError: "Describe the reason for your visit.",
      submitIdle: "Get my ticket",
      submitBusy: "Getting your ticket…",
    },
    routeTitles: { dashboard: "Dashboard", booking: "Book an appointment", waitTime: "Wait time", settings: "Settings" },
    navigatedTo: (page) => `Navigated to ${page}`,
    settings: {
      heading: "Settings",
      eyebrow: "Personalize your experience",
      subtitle: "Customize your experience to suit your needs.",
      appearanceSectionTitle: "Appearance",
      languageSectionTitle: "Language",
      themeLabel: "Theme Options",
      themes: {
        default: "Default",
        night: "Night-time",
        protanopia: "Protanopia-friendly",
        deuteranopia: "Deuteranopia-friendly",
        tritanopia: "Tritanopia-friendly",
        highContrast: "High contrast",
      },
      languageLabel: "Change Interface Language",
    },
  },
  fr: {
    dashboard: {
      heading: "Tableau de bord de la clinique",
      eyebrow: "Bienvenue",
      greeting: (name) => `Bonjour, ${name}`,
      statusSectionLabel: "État de votre ticket",
      actionsNavLabel: "Actions du tableau de bord",
      statusNone: {
        eyebrow: "Aucun ticket actif",
        body: "Prenez rendez-vous pour obtenir votre place dans la file d'attente.",
      },
      statusNext: {
        ticket: (t) => `Ticket ${t}`,
        headline: "C'est à vous",
        body: "Veuillez entrer lorsque vous serez appelé(e).",
      },
      statusQueued: {
        ticket: (t) => `Ticket ${t}`,
        personAhead: (n) => (n === 1 ? "personne devant vous" : "personnes devant vous"),
        wait: (m) => `Environ ${m} ${m === 1 ? "minute" : "minutes"} avant votre tour.`,
      },
      actions: {
        booking: { label: "Prendre rendez-vous", description: "Obtenez un ticket et réservez votre place dans la file." },
        waitTime: { label: "Vérifier le temps d'attente", description: "Consultez votre position et le temps d'attente estimé." },
        settings: { label: "Paramètres", description: "Langue et préférences de notification." },
      },
    },
    booking: {
      heading: "Prendre rendez-vous",
      eyebrow: "Vos informations",
      closedTitle: "La clinique est fermée",
      closedBody: "Les réservations ne sont pas disponibles pour le moment. Veuillez revenir pendant les heures d'ouverture.",
      fullNameLabel: "Nom complet",
      fullNameError: "Veuillez indiquer votre nom complet.",
      patientIdLabel: "Numéro de patient",
      patientIdOptional: "(facultatif)",
      conditionLabel: "Motif de votre visite",
      conditionHint:
        "Décrivez brièvement comment vous vous sentez. S'il s'agit d'une urgence médicale, n'utilisez pas ce formulaire — appelez immédiatement les services d'urgence.",
      conditionError: "Veuillez décrire le motif de votre visite.",
      submitIdle: "Obtenir mon ticket",
      submitBusy: "Attribution de votre ticket…",
    },
    routeTitles: { dashboard: "Tableau de bord", booking: "Prendre rendez-vous", waitTime: "Temps d'attente", settings: "Paramètres" },
    navigatedTo: (page) => `Navigation vers ${page}`,
    settings: {
      eyebrow: "Paramètres",
      heading: "Personnalisez votre expérience",
      subtitle: "Personnalisez votre expérience selon vos besoins.",
      appearanceSectionTitle: "Apparence",
      languageSectionTitle: "Langue",
      themeLabel: "Options de thème",
      themes: {
        default: "Par défaut",
        night: "Mode nuit",
        protanopia: "Adapté à la protanopie",
        deuteranopia: "Adapté à la deutéranopie",
        tritanopia: "Adapté à la tritanopie",
        highContrast: "Contraste élevé",
      },
      languageLabel: "Changer la langue de l'interface",
    },
  },
  af: {
    dashboard: {
      heading: "Kliniek-paneelbord",
      eyebrow: "Welkom",
      greeting: (name) => `Hallo, ${name}`,
      statusSectionLabel: "Status van jou kaartjie",
      actionsNavLabel: "Paneelbord-aksies",
      statusNone: {
        eyebrow: "Geen aktiewe kaartjie nie",
        body: "Maak 'n afspraak om jou plek in die ry te kry.",
      },
      statusNext: {
        ticket: (t) => `Kaartjie ${t}`,
        headline: "Jy is volgende",
        body: "Gaan asseblief in wanneer jy geroep word.",
      },
      statusQueued: {
        ticket: (t) => `Kaartjie ${t}`,
        personAhead: (n) => (n === 1 ? "persoon voor jou" : "mense voor jou"),
        wait: (m) => `Ongeveer ${m} ${m === 1 ? "minuut" : "minute"} voordat dit jou beurt is.`,
      },
      actions: {
        booking: { label: "Maak 'n afspraak", description: "Kry 'n kaartjie en hou jou plek in die ry vas." },
        waitTime: { label: "Gaan wagtyd na", description: "Sien jou posisie en beraamde wagtyd." },
        settings: { label: "Instellings", description: "Taal- en kennisgewingvoorkeure." },
      },
    },
    booking: {
      heading: "Maak 'n afspraak",
      eyebrow: "Jou besonderhede",
      closedTitle: "Die kliniek is gesluit",
      closedBody: "Afsprake is nie tans beskikbaar nie. Kom asseblief terug tydens bedryfsure.",
      fullNameLabel: "Volle naam",
      fullNameError: "Voer jou volle naam in.",
      patientIdLabel: "Pasiënt-ID",
      patientIdOptional: "(opsioneel)",
      conditionLabel: "Rede vir jou besoek",
      conditionHint:
        "Beskryf kortliks hoe jy voel. As dit 'n mediese noodgeval is, moet jy nie hierdie vorm gebruik nie — skakel dadelik jou plaaslike nooddienste.",
      conditionError: "Beskryf die rede vir jou besoek.",
      submitIdle: "Kry my kaartjie",
      submitBusy: "Kry tans jou kaartjie…",
    },
    routeTitles: { dashboard: "Paneelbord", booking: "Maak 'n afspraak", waitTime: "Wagtyd", settings: "Instellings" },
    navigatedTo: (page) => `Beweeg na ${page}`,
    settings: {
      heading: "Instellings",
      eyebrow: "Pas jou ervaring aan",
      subtitle: "Pas jou ervaring aan by jou behoeftes.",
      appearanceSectionTitle: "Voorkoms",
      languageSectionTitle: "Taal",
      themeLabel: "Temakeuses",
      themes: {
        default: "Verstek",
        night: "Nagmodus",
        protanopia: "Protanopie-vriendelik",
        deuteranopia: "Deuteranopie-vriendelik",
        tritanopia: "Tritanopie-vriendelik",
        highContrast: "Hoë kontras",
      },
      languageLabel: "Verander koppelvlaktaal",
    },
  },
  nl: {
    dashboard: {
      heading: "Kliniekdashboard",
      eyebrow: "Welkom",
      greeting: (name) => `Hallo, ${name}`,
      statusSectionLabel: "Status van uw ticket",
      actionsNavLabel: "Dashboardacties",
      statusNone: {
        eyebrow: "Geen actief ticket",
        body: "Maak een afspraak om uw plaats in de rij te krijgen.",
      },
      statusNext: {
        ticket: (t) => `Ticket ${t}`,
        headline: "U bent aan de beurt",
        body: "Kom naar binnen zodra u wordt opgeroepen.",
      },
      statusQueued: {
        ticket: (t) => `Ticket ${t}`,
        personAhead: (n) => (n === 1 ? "persoon voor u" : "personen voor u"),
        wait: (m) => `Nog ongeveer ${m} ${m === 1 ? "minuut" : "minuten"} tot u aan de beurt bent.`,
      },
      actions: {
        booking: { label: "Afspraak maken", description: "Ontvang een ticket en behoud uw plaats in de rij." },
        waitTime: { label: "Wachttijd bekijken", description: "Bekijk uw positie en geschatte wachttijd." },
        settings: { label: "Instellingen", description: "Taal- en meldingsvoorkeuren." },
      },
    },
    booking: {
      heading: "Afspraak maken",
      eyebrow: "Uw gegevens",
      closedTitle: "De kliniek is gesloten",
      closedBody: "Afspraken zijn op dit moment niet beschikbaar. Kom terug tijdens openingstijden.",
      fullNameLabel: "Volledige naam",
      fullNameError: "Vul uw volledige naam in.",
      patientIdLabel: "Patiënt-ID",
      patientIdOptional: "(optioneel)",
      conditionLabel: "Reden van uw bezoek",
      conditionHint:
        "Beschrijf kort hoe u zich voelt. Gaat het om een medisch noodgeval, gebruik dan dit formulier niet — bel direct de hulpdiensten.",
      conditionError: "Beschrijf de reden van uw bezoek.",
      submitIdle: "Mijn ticket ophalen",
      submitBusy: "Ticket wordt aangemaakt…",
    },
    routeTitles: { dashboard: "Dashboard", booking: "Afspraak maken", waitTime: "Wachttijd", settings: "Instellingen" },
    navigatedTo: (page) => `Genavigeerd naar ${page}`,
    settings: {
      heading: "Instellingen",
      eyebrow: "Personaliseer uw ervaring",
      subtitle: "Personaliseer uw ervaring naar uw wensen.",
      appearanceSectionTitle: "Weergave",
      languageSectionTitle: "Taal",
      themeLabel: "Themaopties",
      themes: {
        default: "Standaard",
        night: "Nachtmodus",
        protanopia: "Protanopie-vriendelijk",
        deuteranopia: "Deuteranopie-vriendelijk",
        tritanopia: "Tritanopie-vriendelijk",
        highContrast: "Hoog contrast",
      },
      languageLabel: "Interfacetaal wijzigen",
    },
  },
};

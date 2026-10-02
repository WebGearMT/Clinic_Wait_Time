import { translations, type Locale } from "../i18n/translations";

// 1.2 — maps the literal language name a user clicks to the locale code
// used as a key in translations.ts.
const LANGUAGE_NAME_TO_LOCALE: Record<string, Locale> = {
  English: "en",
  French: "fr",
  Afrikaans: "af",
  Dutch: "nl",
};

// The pages changeLocale knows how to look up a title for — matches the
// keys already defined under translations[locale].routeTitles.
export type PageKey = keyof (typeof translations)["en"]["routeTitles"];

/**
 * Walks a dot-path ("query") string against an object and returns the
 * string found there, e.g. resolvePath(translations, "fr.routeTitles.booking").
 * This is what actually "retrieves" the target translation — the path
 * itself is a real lookup key, not just a label.
 */
function resolvePath(source: unknown, path: string): string {
  const value = path.split(".").reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }
    return undefined;
  }, source);

  if (typeof value !== "string") {
    throw new Error(`No translation string found at path "${path}"`);
  }
  return value;
}

/**
 * Called when the user clicks a language option.
 *
 * English is the app's default for every page, so there's nothing to
 * look up when a user selects English while English is already active —
 * that string is already on screen. Translation only actually runs when
 * the clicked language isn't English, OR when it IS English but the app
 * was previously showing a different language (a real transition back
 * to the default, which does need to re-fetch the English string).
 *
 * @param languageClicked - the literal language name shown in the UI,
 *   e.g. "French" (must be a key in LANGUAGE_NAME_TO_LOCALE).
 * @param currentPage - which page the user is on, as a routeTitles key
 *   (e.g. "dashboard", "booking"). The calling component gets this from
 *   useLocation() and maps the pathname to a PageKey before calling in —
 *   changeLocale itself doesn't touch routing.
 * @param previousLocale - the locale that was active before this click
 *   (e.g. from useLanguage().locale), used only to detect the English-
 *   to-English no-op case. Passed as a locale code, not a display name,
 *   since that's what the caller already has on hand from context —
 *   unlike languageClicked, which comes from the UI as a name.
 * @returns the current page's title translated into the clicked
 *   language, or null when no translation needs to occur.
 */
export function changeLocale(
  languageClicked: string,
  currentPage: PageKey,
  previousLocale: Locale
): string | null {
  // 2 — which language was clicked?
  const localeCode = LANGUAGE_NAME_TO_LOCALE[languageClicked];
  if (!localeCode) {
    throw new Error(`Unknown language: "${languageClicked}"`);
  }

  // Selecting English while already on English: nothing to translate.
  const stayingOnDefaultEnglish = localeCode === "en" && previousLocale === "en";
  if (stayingOnDefaultEnglish) {
    return null;
  }

  // 3.2 — set up the query string for retrieving the target translation.
  const query = `${localeCode}.routeTitles.${currentPage}`;

  return resolvePath(translations, query);
}

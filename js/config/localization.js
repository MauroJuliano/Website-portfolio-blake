export const DEFAULT_LANGUAGE = "en";
export const ENABLED_LANGUAGES = ["en", "pt"];

export const LANGUAGE_TAGS = {
  en: "en",
  pt: "pt-BR",
  de: "de",
  fr: "fr"
};

export const HOME_CONTENT_BINDINGS = {
  "hero-name": "name",
  "hero-title": "title",
  scrollBtn: "cta",
  "career-title": "career_section.title",
  "projects-title": "projects_section.title",
  "projects-subtitle": "projects_section.subtitle",
  "contact-title": "contact.title",
  "contact-description": "contact.description",
  "contact-based-in": "contact.based_in",
  "contact-international": "contact.international",
  "contact-remote": "contact.remote",
  "contact-experience": "contact.experience",
  "contact-email": "contact.email",
  "contact-about-label": "contact.about_label",
  "contact-role": "contact.role",
  "contact-education": "contact.education",
  "contact-stack": "contact.stack",
  "contact-languages": "contact.languages",
  "contact-response-label": "contact.response_label",
  "contact-response": "contact.response",
  "contact-say-hello": "contact.say_hello"
};

export function getSavedLanguage() {
  const savedLanguage = localStorage.getItem("lang");
  return ENABLED_LANGUAGES.includes(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;
}

export function applyDocumentLanguage(language) {
  document.documentElement.lang = LANGUAGE_TAGS[language] || language;
}

import { loadSection } from './loadSections.js';
import { initLanguageSelector } from './language.js';
import { initSocialLinks } from './socialLinks.js';
import { renderCareer } from "./careerRenderer.js";
import { renderProjects } from './projectRenderer.js';
import { initTooltips, updateTooltips } from './tooltip.js';
import { initThemeToggle } from './theme.js';

async function init() {
  try {
    await Promise.all([
      loadSection("hero", "sections/hero.html"),
      loadSection("career", "sections/career.html"),
      loadSection("projects", "sections/projects.html"),
      loadSection("contact", "sections/contact.html")
    ]);
  } catch (error) {
    console.error("Failed to initialize portfolio:", error);
    document.body.insertAdjacentHTML(
      "beforeend",
      '<p class="load-error">Unable to load the portfolio. Please refresh the page.</p>'
    );
    return;
  }

  const btn = document.getElementById('scrollBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({
        behavior: "smooth"
      });
    });
  }

  initThemeToggle();
  initSocialLinks();
  initTooltips();
  initLanguageSelector({
    jsonPath: "./data/",
    defaultLang: "en",
    elementsToUpdate: {
      "hero-name": "name",
      "hero-title": "title",
      "scrollBtn": "cta",
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
      "contact-stack": "contact.stack",
      "contact-languages": "contact.languages",
      "contact-response-label": "contact.response_label",
      "contact-response": "contact.response",
      "contact-say-hello": "contact.say_hello"
    },
    onLanguageChange(lang, json) {
      document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
      renderCareer(json.career);
      renderProjects(json.projects);
      updateTooltips(json);
    }
  });
}

init();

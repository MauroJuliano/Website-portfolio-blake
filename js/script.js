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
      "contact-eyebrow": "contact.eyebrow",
      "contact-title": "contact.title",
      "contact-description": "contact.description",
      "contact-email-label": "contact.email_label",
      "contact-social-label": "contact.social_label",
      "contact-based-in": "contact.based_in",
      "contact-email": "contact.email",
      "contact-phone": "contact.phone"
    },
    onLanguageChange(lang, json) {
      document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
      renderCareer(json.career);
      renderProjects(json.projects);
      updateTooltips(json);

      const emailLink = document.getElementById("contact-email-link");
      if (emailLink) emailLink.href = `mailto:${json.contact.email}`;
    }
  });
}

init();

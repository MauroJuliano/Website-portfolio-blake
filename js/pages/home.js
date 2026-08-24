import { initLanguageSelector } from '../components/language-selector.js';
import { initSocialLinks } from '../components/social-links.js';
import { initThemeToggle } from '../components/theme.js';
import { initTooltips, updateTooltips } from '../components/tooltips.js';
import {
  applyDocumentLanguage,
  DEFAULT_LANGUAGE,
  HOME_CONTENT_BINDINGS
} from '../config/localization.js';
import { renderCareer } from '../sections/career.js';
import { renderProjects } from '../sections/projects.js';
import { loadSection } from '../services/section-loader.js';

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
    jsonPath: "./data/home/",
    defaultLang: DEFAULT_LANGUAGE,
    elementsToUpdate: HOME_CONTENT_BINDINGS,
    onLanguageChange(lang, json) {
      applyDocumentLanguage(lang);
      renderCareer(json.career);
      renderProjects(json.projects);
      updateTooltips(json);
    }
  });

  const requestedSection = window.location.hash;
  if (requestedSection) {
    requestAnimationFrame(() => {
      document.querySelector(requestedSection)?.scrollIntoView();
    });
  }
}

init();

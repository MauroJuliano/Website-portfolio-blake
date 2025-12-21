import { loadSection } from './loadSections.js';
import { initItensAnimationScroll } from "./scrollAnimations.js";
import { initLanguageSelector } from './language.js';
import { initSocialLinks } from './socialLinks.js';
import { renderCareer } from "./careerRenderer.js";
import { renderProjects } from './projectRenderer.js';

let currentLanguageJson = null;

// HERO
loadSection("hero", "sections/hero.html", () => {
  
  // scrollBtn só existe depois que hero.html foi carregado!
  const btn = document.getElementById('scrollBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({
        behavior: "smooth"
      });
    });
  }

  const toggle = document.getElementById("toggle-icon");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});


  initLanguageSelector({
  jsonPath: "./data/",
  defaultLang: "en",
  elementsToUpdate: {
    "hero-name": "name",
    "hero-title": "title",
    "scrollBtn": "cta",

    // CONTACT
    "contact-title": "contact.title",
    "contact-description": "contact.description",
    "contact-based-in": "contact.based_in",
    "contact-email": "contact.email",
    "contact-phone": "contact.phone"
  },

  onLanguageChange(lang, json) {
    currentLanguageJson = json;

    renderCareer(json.career);

    if (document.querySelector(".gallery")) {
      renderProjects(json.projects);
    }

    initItensAnimationScroll();
  }
});


    initSocialLinks();
});

// CAREER
loadSection("career", "sections/career.html", () => {
  initItensAnimationScroll();
});


// PROJECTS
loadSection("projects", "sections/projects.html", () => {
  if (currentLanguageJson) {
    renderProjects(currentLanguageJson.projects);
  }

  initItensAnimationScroll();
});

// CONTACT
loadSection("contact", "sections/contact.html", () => {
    initSocialLinks();
}); 

import { loadSection } from './loadSections.js';
import { initItensAnimationScroll } from "./scrollAnimations.js";
import { initCarousel } from './carousel.js';
import { initLanguageSelector } from './language.js';
import { initSocialLinks } from './socialLinks.js';

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

  // Aqui está PERFEITO
   initLanguageSelector({
        jsonPath: "./data/", // pasta onde ficam os JSON
        defaultLang: "en",
        elementsToUpdate: {
            "hero-name": "name",
            "hero-title": "title",
            "scrollBtn": "cta"
        }
    });

    initSocialLinks();
});

// CAREER
loadSection("career", "sections/career.html", initItensAnimationScroll);

// PROJECTS
loadSection("projects", "sections/projects.html", () => {
  initCarousel();
});

// CONTACT
loadSection("contact", "sections/contact.html");

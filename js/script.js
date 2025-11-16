import { loadSection } from './loadSections.js';
import { initItensAnimationScroll } from "./scrollAnimations.js";
import { initCarousel } from './carousel.js';



loadSection("hero", "sections/hero.html");
loadSection("career", "sections/career.html", initItensAnimationScroll);
loadSection("projects", "sections/projects.html", () => {
    initCarousel(".carousel-wrapper");
  });
loadSection("contact", "sections/contact.html");



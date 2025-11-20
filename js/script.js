import { loadSection } from './loadSections.js';
import { initItensAnimationScroll } from "./scrollAnimations.js";
import { initCarousel } from './carousel.js';



loadSection("hero", "sections/hero.html", () => {
  const btn = document.getElementById('scrollBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({
        behavior: "smooth"
      });
    });
  }
});


loadSection("career", "sections/career.html", initItensAnimationScroll);
loadSection("projects", "sections/projects.html", () => {
    initCarousel();
  });
loadSection("contact", "sections/contact.html");


  document.getElementById('scrollBtn').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({
      behavior: "smooth"
    });
  });

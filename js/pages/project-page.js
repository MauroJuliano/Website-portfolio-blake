import { initThemeToggle } from '../components/theme.js';
import { applyDocumentLanguage, getSavedLanguage } from '../config/localization.js';
import { loadProject } from './project-content.js';

function initBackToTop() {
  const button = document.getElementById('back-to-top');
  if (!button) return;

  let ticking = false;
  const updateVisibility = () => {
    const isVisible = window.scrollY > 560;
    button.classList.toggle('is-visible', isVisible);
    button.setAttribute('aria-hidden', String(!isVisible));
    button.tabIndex = isVisible ? 0 : -1;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateVisibility);
  }, { passive: true });

  button.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  updateVisibility();
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle('themeToggle');
  initBackToTop();
  const language = getSavedLanguage();
  applyDocumentLanguage(language);
  loadProject(language);
});

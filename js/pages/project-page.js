import { initThemeToggle } from '../components/theme.js';
import { initBackToTop } from '../components/back-to-top.js';
import { initProgressiveImages } from '../components/progressive-images.js';
import { applyDocumentLanguage, getSavedLanguage } from '../config/localization.js';
import { loadProject } from './project-content.js';

document.addEventListener('DOMContentLoaded', () => {
  initProgressiveImages();
  initThemeToggle('themeToggle');
  initBackToTop();
  const language = getSavedLanguage();
  applyDocumentLanguage(language);
  loadProject(language);
});

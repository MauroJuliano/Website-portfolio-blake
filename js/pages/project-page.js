import { initThemeToggle } from '../components/theme.js';
import { applyDocumentLanguage, getSavedLanguage } from '../config/localization.js';
import { loadProject } from './project-content.js';


document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle('themeToggle');
  const language = getSavedLanguage();
  applyDocumentLanguage(language);
  loadProject(language);
});

import { initThemeToggle } from './theme.js';
import { loadProject } from './project-loader.js';


document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle('themeToggle');
  const savedLanguage = localStorage.getItem('lang');
  const language = ['en', 'pt'].includes(savedLanguage) ? savedLanguage : 'en';
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  loadProject(language);
});

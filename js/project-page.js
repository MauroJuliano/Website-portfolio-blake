import { initThemeToggle } from './theme.js';
import { loadProject } from './project-loader.js';


document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  loadProject();
});

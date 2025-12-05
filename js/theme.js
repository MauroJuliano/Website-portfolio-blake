export function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  if (!themeToggle) {
    console.warn('Theme toggle button not found');
    return;
  }

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  updateToggleIcon(themeToggle, currentTheme);

  themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(themeToggle, newTheme);
  });
}

function updateToggleIcon(element, theme) {
  element.textContent = theme === 'light' ? '🌙' : '☀️';
}
export function initThemeToggle(toggleId = 'toggle-icon') {
  const themeToggle = document.getElementById(toggleId);
  const html = document.documentElement;

  if (!themeToggle) {
    console.warn('Theme toggle button not found');
    return;
  }

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  themeToggle.checked = currentTheme === 'dark';

  themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

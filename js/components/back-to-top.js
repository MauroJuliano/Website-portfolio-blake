export function initBackToTop(buttonId = 'back-to-top') {
  const button = document.getElementById(buttonId);
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

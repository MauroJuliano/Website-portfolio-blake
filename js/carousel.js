export function initCarousel() {
  const gallery = document.querySelector('.gallery');

  if (!gallery) return;

  const flkty = new Flickity(gallery, {
    wrapAround: true,
    cellAlign: 'center',
    contain: false,
    pageDots: true,
    prevNextButtons: false
  });

  // Force Flickity to recalc after a slight delay (fixes dynamic loading issues)
  setTimeout(() => {
    flkty.resize();
  }, 50);

  return flkty;
}

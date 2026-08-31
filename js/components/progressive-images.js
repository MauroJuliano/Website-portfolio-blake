const preparedImages = new WeakSet();

function getImageShell(image) {
  return image.closest(
    '.carousel-cell, .project-mockup, .device-frame, .case-device, .other-flow-thumbnail, .feature-card'
  ) || image.parentElement;
}

function prepareImage(image) {
  if (!(image instanceof HTMLImageElement) || preparedImages.has(image)) return;
  preparedImages.add(image);

  if (image.getAttribute('src')?.includes('assets/icons/')) {
    image.classList.add('is-image-loaded');
    return;
  }

  const shell = getImageShell(image);
  if (!shell) return;

  image.classList.add('progressive-image');
  shell.classList.add('image-loading-shell', 'is-image-loading');

  const reveal = async () => {
    if (image.decode) {
      try {
        await image.decode();
      } catch {
        // A load event can still provide a usable image when decode is unavailable.
      }
    }

    shell.classList.remove('is-image-loading');
    shell.classList.add('is-image-loaded');
    image.classList.add('is-image-loaded');

    window.setTimeout(() => {
      shell.classList.remove('image-loading-shell', 'is-image-loaded');
    }, 360);
  };

  const stopLoading = () => {
    shell.classList.remove('image-loading-shell', 'is-image-loading');
    image.classList.add('is-image-loaded', 'image-load-error');
  };

  if (image.complete && image.naturalWidth > 0) {
    reveal();
    return;
  }

  image.addEventListener('load', reveal, { once: true });
  image.addEventListener('error', stopLoading, { once: true });
}

function prepareImagesInside(node) {
  if (!(node instanceof Element)) return;
  if (node.matches('img')) prepareImage(node);
  node.querySelectorAll('img').forEach(prepareImage);
}

export function initProgressiveImages(root = document.body) {
  prepareImagesInside(root);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(prepareImagesInside);
    });
  });

  observer.observe(root, { childList: true, subtree: true });
  return () => observer.disconnect();
}

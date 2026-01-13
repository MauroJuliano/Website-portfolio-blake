export function initCareerCarousel() {
  const gallery = document.getElementById("careerGallery");
  if (!gallery) return;

  function render(images = []) {
    if (!images.length) return;

    // 1️⃣ Destroy previous instance
    if (gallery.flickityInstance) {
      gallery.flickityInstance.destroy();
      gallery.flickityInstance = null;
    }

    // 2️⃣ Clear + rebuild DOM
    gallery.innerHTML = "";

    images.forEach(src => {
      const cell = document.createElement("div");
      cell.className = "gallery-cell";

      cell.innerHTML = `
        <figure class="media-frame">
          <img src="${src}" draggable="false" />
        </figure>
      `;

      gallery.appendChild(cell);
    });

    // 3️⃣ Init Flickity after layout
    requestAnimationFrame(() => {
      const flkty = new Flickity(gallery, {
        wrapAround: false,
        cellAlign: "center",
        contain: false,
        pageDots: true
      });

      gallery.flickityInstance = flkty;

      // 4️⃣ Resize after images load
      imagesLoaded(gallery, () => {
        flkty.resize();
      });
    });
  }

  return {
    render
  };
}

export function renderProjects(projects) {
  const gallery = document.querySelector(".gallery");
  if (!gallery || !projects?.length) return;

  // 1️⃣ Destroy first
  if (gallery.flickityInstance) {
    gallery.flickityInstance.destroy();
    gallery.flickityInstance = null;
  }

  // 2️⃣ Clear + rebuild
  gallery.innerHTML = "";

  projects.forEach(project => {
    const cell = document.createElement("div");
    cell.className = "gallery-cell";

    cell.innerHTML = `
      <div class="card-left">
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <p><strong>Tecnologias:</strong> ${project.technologies.join(", ")}</p>
        ${project.status ? `<p><strong>Status:</strong> ${project.status}</p>` : ""}
        <button>Ver Mais</button>
      </div>

      <div class="card-right">
        <img src="${project.image ?? 'milkshake.gif'}" alt="${project.title}">
      </div>
    `;

    gallery.appendChild(cell);
  });

  // 3️⃣ Init after layout
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

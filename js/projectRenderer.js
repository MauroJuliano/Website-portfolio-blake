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
        <button type="button" class="project-details">${document.documentElement.lang === "pt-BR" ? "Ver mais" : "View more"}</button>
      </div>

      <div class="card-right">
        <img src="${project.image ?? 'milkshake.gif'}" alt="${project.title}">
      </div>
    `;

    gallery.appendChild(cell);

    const projectId = project.id || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    cell.querySelector(".project-details").addEventListener("click", () => {
      window.location.href = `sections/projectPage.html?id=${encodeURIComponent(projectId)}`;
    });
  });

  // 3️⃣ Init after layout
  requestAnimationFrame(() => {
    const flkty = new Flickity(gallery, {
      wrapAround: false,
      cellAlign: "center",
      contain: false,
      pageDots: true,
      prevNextButtons: false,
      adaptiveHeight: false,
      setGallerySize: true,
      percentPosition: true
    });

    gallery.flickityInstance = flkty;

    const images = [...gallery.querySelectorAll("img")];
    Promise.all(images.map(image => image.decode?.().catch(() => undefined)))
      .finally(() => flkty.resize());
  });
}

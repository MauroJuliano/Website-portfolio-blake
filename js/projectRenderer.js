export function renderProjects(projects) {
  const gallery = document.querySelector(".gallery");
  if (!gallery || !projects?.length) return;

  const isPortuguese = document.documentElement.lang === "pt-BR";
  const technologyIcons = {
    Swift: "◆",
    SwiftUI: "◒",
    Combine: "ϟ",
    "Core Data": "▤",
    Firebase: "△",
    Jira: "◇"
  };

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

    const technologies = project.technologies.map(technology => `
      <li><span aria-hidden="true">${technologyIcons[technology] || "◇"}</span>${technology}</li>
    `).join("");

    cell.innerHTML = `
      <div class="project-visual">
        <div class="device-frame">
          <span class="device-speaker" aria-hidden="true"></span>
          <img src="${project.image ?? 'assets/flux.png'}" alt="${project.title}">
        </div>
      </div>

      <article class="project-content">
        <img class="project-icon" src="${project.image ?? 'assets/flux.png'}" alt="">
        <h3>${project.title}</h3>
        <p class="project-tagline">${project.tagline || project.status || ""}</p>
        <p class="project-description">${project.description}</p>
        <ul class="project-technologies" aria-label="Technologies">${technologies}</ul>
        <div class="project-actions">
          ${project.caseStudy === false ? "" : `<button type="button" class="project-details">${isPortuguese ? "Ver case" : "View case study"}<span aria-hidden="true">→</span></button>`}
          ${project.github ? `<a class="project-github" href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">●</span></a>` : ""}
        </div>
      </article>
    `;

    gallery.appendChild(cell);

    const projectId = project.id || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const detailsButton = cell.querySelector(".project-details");
    if (detailsButton) {
      detailsButton.addEventListener("click", () => {
        window.location.href = `sections/projectPage.html?id=${encodeURIComponent(projectId)}`;
      });
    }
  });

  // 3️⃣ Init after layout
  requestAnimationFrame(() => {
    const hasMultipleProjects = projects.length > 1;
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

    const previousButton = document.querySelector(".projects-arrow--previous");
    const nextButton = document.querySelector(".projects-arrow--next");
    [previousButton, nextButton].forEach(button => {
      button.hidden = !hasMultipleProjects;
    });
    previousButton.onclick = () => flkty.previous();
    nextButton.onclick = () => flkty.next();

    const images = [...gallery.querySelectorAll("img")];
    Promise.all(images.map(image => image.decode?.().catch(() => undefined)))
      .finally(() => flkty.resize());
  });
}

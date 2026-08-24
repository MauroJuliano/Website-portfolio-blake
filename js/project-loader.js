function renderList(containerId, items, renderer) {
  const container = document.getElementById(containerId);
  container.innerHTML = items.map(renderer).join("");
}

export async function loadProject() {
  const projectId = new URLSearchParams(window.location.search).get("id");
  const root = document.getElementById("project-root");

  if (!projectId) {
    root.innerHTML = '<p class="project-error">Project not found.</p>';
    return;
  }

  try {
    const response = await fetch("../data/projects-EN.json");
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const project = (await response.json())[projectId];
    if (!project) {
      root.innerHTML = '<p class="project-error">Project not found.</p>';
      return;
    }

    document.title = `${project.title} | Mauro Figueiredo`;
    document.getElementById("project-title").textContent = project.title;
    document.getElementById("project-tagline").textContent = project.tagline;
    document.getElementById("project-summary").textContent = project.summary;
    document.getElementById("project-main-image").src = project.mainImage;
    document.getElementById("project-main-image").alt = `${project.title} app artwork`;
    if (project.imagePresentation === "mockup") {
      document.querySelector(".case-device").classList.add("is-mockup");
    }

    const githubLink = document.getElementById("project-github");
    githubLink.href = project.github;
    if (!project.github) githubLink.hidden = true;

    const demoLink = document.getElementById("project-demo");
    if (project.demo) {
      demoLink.href = project.demo;
      demoLink.hidden = false;
    }

    renderList("hero-technologies", project.technologies, technology => `<li>${technology}</li>`);
    document.getElementById("overview-title").textContent = project.overviewTitle;
    document.getElementById("overview-description").textContent = project.overview;
    renderList("project-goals", project.goals, goal => `<li>${goal}</li>`);
    renderList("focus-areas", project.focusAreas, area => `
      <article class="focus-card">
        <span class="focus-icon" aria-hidden="true">${area.icon}</span>
        <div><h3>${area.title}</h3><p>${area.description}</p></div>
      </article>
    `);
    renderList("feature-walkthrough", project.features, feature => {
      const media = feature.video
        ? `<video class="feature-media"${feature.poster ? ` poster="${feature.poster}"` : ""} autoplay loop muted playsinline controls preload="metadata" aria-label="${feature.title} demo">
            <source src="${feature.video}">
            Your browser does not support embedded videos.
          </video>`
        : `<img class="feature-media" src="${feature.image}" alt="${feature.title}">`;

      return `
        <article class="feature-card${feature.video ? " feature-card--video" : ""}">
          ${media}
          <div><h3>${feature.title}</h3><p>${feature.description}</p></div>
        </article>
      `;
    });
    renderList("tech-stack", project.techStack, technology => `<li>${technology}</li>`);
  } catch (error) {
    console.error("Failed to load project:", error);
    root.innerHTML = '<p class="project-error">Unable to load this project.</p>';
  }
}

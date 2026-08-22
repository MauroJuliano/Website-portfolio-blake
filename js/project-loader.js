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

    document.title = `${project.title} | Mauro G.`;
    document.getElementById("project-title").textContent = project.title;
    document.getElementById("project-tagline").textContent = project.tagline;
    document.getElementById("project-summary").textContent = project.summary;
    document.getElementById("project-main-image").src = project.mainImage;
    document.getElementById("project-main-image").alt = `${project.title} app artwork`;

    const githubLink = document.getElementById("project-github");
    githubLink.href = project.github;
    if (!project.github) githubLink.hidden = true;

    const demoLink = document.getElementById("project-demo");
    if (project.demo) {
      demoLink.href = project.demo;
      demoLink.hidden = false;
    }

    renderList("hero-technologies", project.technologies, technology => `<li>${technology}</li>`);
    renderList("project-facts", project.facts, fact => `
      <article class="fact">
        <span class="fact-icon" aria-hidden="true">${fact.icon}</span>
        <div><strong>${fact.label}</strong><span>${fact.value}</span></div>
      </article>
    `);

    document.getElementById("overview-title").textContent = project.overviewTitle;
    document.getElementById("overview-description").textContent = project.overview;
    renderList("project-goals", project.goals, goal => `<li>${goal}</li>`);
    renderList("focus-areas", project.focusAreas, area => `
      <article class="focus-card">
        <span class="focus-icon" aria-hidden="true">${area.icon}</span>
        <div><h3>${area.title}</h3><p>${area.description}</p></div>
      </article>
    `);
    renderList("feature-walkthrough", project.features, feature => `
      <article class="feature-card">
        <img src="${feature.image}" alt="${feature.title}">
        <div><h3>${feature.title}</h3><p>${feature.description}</p></div>
      </article>
    `);
    renderList("tech-stack", project.techStack, technology => `<li>${technology}</li>`);

    const architecture = document.getElementById("architecture-flow");
    architecture.innerHTML = project.architectureFlow.map((node, index) => `
      ${index ? '<span class="architecture-arrow" aria-hidden="true">→</span>' : ""}
      <span class="architecture-node">${node}</span>
    `).join("");
  } catch (error) {
    console.error("Failed to load project:", error);
    root.innerHTML = '<p class="project-error">Unable to load this project.</p>';
  }
}

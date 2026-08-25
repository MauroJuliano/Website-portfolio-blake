function renderList(containerId, items, renderer) {
  const container = document.getElementById(containerId);
  container.innerHTML = items.map(renderer).join("");
}

const PAGE_COPY = {
  en: {
    navContact: "Get in touch",
    back: "← Back to projects",
    featured: "Featured project",
    viewGitHub: "View on GitHub ↗",
    watchDemo: "Watch demo ▷",
    capabilities: "What this app does",
    inside: "Inside the app",
    insideDescription: "Explore the core flows that make banking simple and intuitive.",
    builtWith: "Built with",
    ctaTitle: "Interested in this project?",
    ctaDescription: "Let's build something amazing together.",
    ctaContact: "Get in touch ↗",
    ctaBack: "Back to projects",
    notFound: "Project not found.",
    loadError: "Unable to load this project.",
    demoLabel: "demo"
  },
  pt: {
    navContact: "Entre em contato",
    back: "← Voltar aos projetos",
    featured: "Projeto em destaque",
    viewGitHub: "Ver no GitHub ↗",
    watchDemo: "Ver demonstração ▷",
    capabilities: "O que este app faz",
    inside: "Por dentro do app",
    insideDescription: "Explore os principais fluxos que tornam a experiência bancária simples e intuitiva.",
    builtWith: "Desenvolvido com",
    ctaTitle: "Gostou deste projeto?",
    ctaDescription: "Vamos construir algo incrível juntos.",
    ctaContact: "Entre em contato ↗",
    ctaBack: "Voltar aos projetos",
    notFound: "Projeto não encontrado.",
    loadError: "Não foi possível carregar este projeto.",
    demoLabel: "demonstração"
  }
};

function applyPageCopy(copy) {
  const textById = {
    "project-nav-contact": copy.navContact,
    "project-back-link": copy.back,
    "project-featured-label": copy.featured,
    "project-capabilities-title": copy.capabilities,
    "project-inside-title": copy.inside,
    "project-inside-description": copy.insideDescription,
    "project-built-with-label": copy.builtWith,
    "project-cta-title": copy.ctaTitle,
    "project-cta-description": copy.ctaDescription,
    "project-cta-contact": copy.ctaContact,
    "project-cta-back": copy.ctaBack
  };

  Object.entries(textById).forEach(([id, text]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
  });
}

export async function loadProject(language = "en") {
  const projectId = new URLSearchParams(window.location.search).get("id");
  const root = document.getElementById("project-root");
  let selectedLanguage = PAGE_COPY[language] ? language : "en";
  let copy = PAGE_COPY[selectedLanguage];

  applyPageCopy(copy);

  if (!projectId) {
    root.innerHTML = `<p class="project-error">${copy.notFound}</p>`;
    return;
  }

  try {
    let response = await fetch(`../data/projects/${selectedLanguage}.json`);
    if (!response.ok && selectedLanguage !== "en") {
      selectedLanguage = "en";
      copy = PAGE_COPY.en;
      applyPageCopy(copy);
      document.documentElement.lang = "en";
      response = await fetch("../data/projects/en.json");
    }
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const project = (await response.json())[projectId];
    if (!project) {
      root.innerHTML = `<p class="project-error">${copy.notFound}</p>`;
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
    githubLink.textContent = copy.viewGitHub;
    githubLink.href = project.github;
    if (!project.github) githubLink.hidden = true;

    const demoLink = document.getElementById("project-demo");
    demoLink.textContent = copy.watchDemo;
    if (project.demo) {
      demoLink.href = project.demo;
      demoLink.hidden = false;
    }

    renderList("hero-technologies", project.technologies, technology => `<li>${technology}</li>`);
    document.getElementById("overview-title").textContent = project.overviewTitle;
    document.getElementById("overview-description").textContent = project.overview;
    renderList("project-goals", project.goals, goal => `<li>${goal}</li>`);
    renderList("focus-areas", project.focusAreas, area => {
      const icon = area.iconImage
        ? `<img src="${area.iconImage}" alt="">`
        : area.icon;

      return `
        <article class="focus-card">
          <span class="focus-icon" aria-hidden="true">${icon}</span>
          <div><h3>${area.title}</h3><p>${area.description}</p></div>
        </article>
      `;
    });
    renderList("feature-walkthrough", project.features, feature => {
      const media = feature.video
        ? `<video class="feature-media"${feature.poster ? ` poster="${feature.poster}"` : ""} autoplay loop muted playsinline controls preload="metadata" aria-label="${feature.title} ${copy.demoLabel}">
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
    root.innerHTML = `<p class="project-error">${copy.loadError}</p>`;
  }
}

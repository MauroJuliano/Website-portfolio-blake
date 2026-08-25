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
    capabilities: "Built as a complete product",
    inside: "Inside the app",
    insideDescription: "Explore the core flows that make banking simple and intuitive.",
    mainFlows: "Main flows",
    otherFlows: "Other flows",
    otherFlowsDescription: "Complementary journeys that complete the experience.",
    moreFlows: "More screens coming soon",
    previous: "← Previous",
    next: "Next →",
    comingSoon: "Video coming soon",
    close: "Close",
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
    capabilities: "Construído como um produto completo",
    inside: "Por dentro do app",
    insideDescription: "Explore os principais fluxos que tornam a experiência bancária simples e intuitiva.",
    mainFlows: "Principais fluxos",
    otherFlows: "Outros fluxos",
    otherFlowsDescription: "Jornadas complementares que completam a experiência.",
    moreFlows: "Mais telas em breve",
    previous: "← Anterior",
    next: "Próximo →",
    comingSoon: "Vídeo em breve",
    close: "Fechar",
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
    "project-main-flows-title": copy.mainFlows,
    "project-other-flows-title": copy.otherFlows,
    "project-other-flows-description": copy.otherFlowsDescription,
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

function initOtherFlowModal(flows, copy) {
  const modal = document.getElementById("flow-modal");
  const media = document.getElementById("flow-modal-media");
  const title = document.getElementById("flow-modal-title");
  const subtitle = document.getElementById("flow-modal-subtitle");
  const description = document.getElementById("flow-modal-description");
  const position = document.getElementById("flow-modal-position");
  const previous = document.getElementById("flow-modal-previous");
  const next = document.getElementById("flow-modal-next");
  const close = document.getElementById("flow-modal-close");
  let activeIndex = 0;

  const stopVideo = () => {
    const video = media.querySelector("video");
    if (video) video.pause();
  };

  const renderFlow = index => {
    stopVideo();
    activeIndex = (index + flows.length) % flows.length;
    const flow = flows[activeIndex];

    title.textContent = flow.title;
    subtitle.textContent = flow.subtitle || "";
    description.textContent = flow.description;
    position.textContent = `${activeIndex + 1} / ${flows.length}`;
    media.innerHTML = flow.video
      ? `<video playsinline controls autoplay muted aria-label="${flow.title} ${copy.demoLabel}"><source src="${flow.video}" type="video/mp4"></video>`
      : `<div class="flow-modal-placeholder"><span>${flow.icon || "◇"}</span><p>${copy.comingSoon}</p></div>`;

    const video = media.querySelector("video");
    if (video) video.play().catch(() => {});
  };

  document.querySelectorAll("[data-flow-index]").forEach(card => {
    card.addEventListener("click", () => {
      renderFlow(Number(card.dataset.flowIndex));
      modal.showModal();
    });
  });

  previous.textContent = copy.previous;
  next.textContent = copy.next;
  close.setAttribute("aria-label", copy.close);
  previous.addEventListener("click", () => renderFlow(activeIndex - 1));
  next.addEventListener("click", () => renderFlow(activeIndex + 1));
  close.addEventListener("click", () => modal.close());
  modal.addEventListener("click", event => {
    if (event.target === modal) modal.close();
  });
  modal.addEventListener("close", () => {
    stopVideo();
    media.innerHTML = "";
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
        ? `<video class="feature-media"${feature.poster ? ` poster="${feature.poster}"` : ""} playsinline controls preload="metadata" aria-label="${feature.title} ${copy.demoLabel}">
            <source src="${feature.video}" type="video/mp4">
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
    const otherFlows = project.otherFlows || [];
    const otherFlowsHeading = document.querySelector(".other-flows-heading");
    const otherFlowsGrid = document.getElementById("other-flow-walkthrough");
    otherFlowsHeading.hidden = otherFlows.length === 0;
    otherFlowsGrid.hidden = otherFlows.length === 0;

    renderList("other-flow-walkthrough", otherFlows, (flow, index) => `
      <button class="other-flow-card" type="button" data-flow-index="${index}" aria-label="${flow.title}: ${flow.subtitle}">
        <span class="other-flow-thumbnail">
          ${flow.thumbnail
            ? `<img class="other-flow-media" src="${flow.thumbnail}" alt="">`
            : flow.video
            ? `<video class="other-flow-media" playsinline muted preload="metadata" tabindex="-1"><source src="${flow.video}" type="video/mp4"></video>`
            : `<span class="other-flow-preview" aria-hidden="true"><span>${flow.icon || "◇"}</span></span>`}
          <span class="other-flow-play" aria-hidden="true">▶</span>
        </span>
        <span class="other-flow-meta"><strong>${flow.title}</strong><span>${flow.duration}</span></span>
        <span class="other-flow-summary">${flow.description}</span>
      </button>
    `);
    document.querySelectorAll(".other-flow-media").forEach(video => {
      video.addEventListener("loadedmetadata", () => {
        video.currentTime = Math.min(0.1, video.duration / 2);
      }, { once: true });
    });
    if (otherFlows.length) {
      otherFlowsGrid.insertAdjacentHTML("beforeend", `
        <article class="other-flow-card other-flow-card--soon">
          <span aria-hidden="true">＋</span>
          <p>${copy.moreFlows}</p>
        </article>
      `);
      initOtherFlowModal(otherFlows, copy);
    }
    renderList("tech-stack", project.techStack, technology => `<li>${technology}</li>`);
  } catch (error) {
    console.error("Failed to load project:", error);
    root.innerHTML = `<p class="project-error">${copy.loadError}</p>`;
  }
}

export async function loadProject() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  if (!projectId) {
    alert("Project not found.");
    return;
  }

  try {
    const response = await fetch("../data/projects-EN.json");
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const projects = await response.json();

    const project = projects[projectId];

    if (!project) {
      alert("Invalid project.");
      return;
    }

    // Populate data
    document.getElementById("title").textContent = project.title;
    document.title = `${project.title} | Mauro G.`;
    document.getElementById("status").textContent = project.status;
    document.getElementById("mainImage").src = project.mainImage;
    document.getElementById("shortDescription").textContent = project.shortDescription;
    document.getElementById("longDescription").textContent = project.longDescription;

    // Github button
    document.getElementById("githubBtn").onclick = () => {
      window.open(project.github, "_blank", "noopener,noreferrer");
    };

    // Technologies
    const techContainer = document.getElementById("technologies");
    techContainer.innerHTML = "";

    project.technologies.forEach(tech => {
      const btn = document.createElement("button");
      btn.textContent = tech;
      techContainer.appendChild(btn);
    });

    // Thumbnails
    const thumbnailsContainer = document.getElementById("thumbnails");
    thumbnailsContainer.innerHTML = "";

    project.thumbnails.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.onclick = () => {
        document.getElementById("mainImage").src = src;
      };
      thumbnailsContainer.appendChild(img);
    });

  } catch (error) {
    console.error("Failed to load project:", error);
    document.querySelector("main").textContent = "Unable to load this project.";
  }
}

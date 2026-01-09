export function renderCareer(experienceArray, containerSelector = "#career-list") {
  const container = document.querySelector(containerSelector);

  if (!container || !Array.isArray(experienceArray)) return;

  // limpa itens anteriores se a função for chamada novamente
  container.innerHTML = "";

  experienceArray.forEach((exp, index) => {
    const li = document.createElement("li");
    li.classList.add("item");
    if (index === 0) li.classList.add("active");


    if (exp.image) {
      li.setAttribute("data-img", exp.image);
    }

    li.innerHTML = `
      <header class="item__head">
        <h3 class="item__title">${exp.company_name}</h3>
        <div class="item__meta">
          <span class="item__role">${exp.role}</span>
          <span class="item__dot">•</span>
          <time class="item__date">${exp.duration}</time>
        </div>
      </header>

      <ul class="item__bullets">
        ${exp.responsibilities?.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;

    container.appendChild(li);
  });
}

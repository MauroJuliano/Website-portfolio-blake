export function loadSection(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    });
}

export function reloadAllSections(lang) {
  const base = `sections/${lang}`;

  loadSection("hero", `${base}/hero.html`, () => {
    initHeroLanguageSelector({
      enRadio: "#en",
      ptRadio: "#pt",
      nameSelector: ".blake",
      titleSelector: ".title"
    });
  });

  loadSection("career", `${base}/career.html`, initItensAnimationScroll);

  loadSection("projects", `${base}/projects.html`, () => {
    initCarousel();
  });

  loadSection("contact", `${base}/contact.html`);
}

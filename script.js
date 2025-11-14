async function loadSection(id, file, callback) {
  const html = await fetch(file).then(res => res.text());
  document.getElementById(id).innerHTML = html;

  if (callback) callback();
}

// Load sections
loadSection("hero", "sections/hero.html");
loadSection("career", "sections/career.html", initItensAnimationScroll);
loadSection("projects", "sections/projects.html");

// -----------------------------------
//  SCROLL ANIMATION
// -----------------------------------
function initItensAnimationScroll() {
  const items = document.querySelectorAll(".item");
  const image = document.querySelector("#detailImage");

  if (!items.length || !image) return;

  // Activate only the first item initially
  items.forEach(item => item.classList.remove("active"));
  items[0].classList.add("active");
  image.src = items[0].dataset.img;

  function onScroll() {
    const imageRect = image.getBoundingClientRect();
    const triggerOffset = imageRect.top + imageRect.height / 2;

    let activeItem = null;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top <= triggerOffset) {
        activeItem = item;
      }
    });

    if (activeItem) {
      items.forEach(i => i.classList.remove("active"));
      activeItem.classList.add("active");

      const newImg = activeItem.dataset.img;

      if (!image.src.includes(newImg)) {
        image.classList.add("is-changing");
        setTimeout(() => {
          image.src = newImg;
          image.classList.remove("is-changing");
        }, 200);
      }
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
}

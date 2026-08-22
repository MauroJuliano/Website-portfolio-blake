let activeScrollHandler = null;
let activeFlickityInstances = [];

export function renderCareer(careerData) {
  const list = document.getElementById("career-list");
  const carouselContainer = document.querySelector(".media-shift");
  
  if (!list || !carouselContainer) return;

  list.innerHTML = "";
  carouselContainer.innerHTML = "";

  if (activeScrollHandler) {
    window.removeEventListener("scroll", activeScrollHandler);
  }
  activeFlickityInstances.forEach(instance => instance.destroy());

  const flickityInstances = [];

  careerData.forEach((item, index) => {
    // Render list item
    const li = document.createElement("li");
    li.className = "item";
    if (index === 0) li.classList.add("active");
    li.dataset.index = index;

    const bullets = item.bullets.map(b => `<li>${b}</li>`).join("");

    li.innerHTML = `
      <h3 class="item__title">${item.title}</h3>
      <div class="item__meta">
        <span>${item.company}</span>
        <span>•</span>
        <span>${item.period}</span>
      </div>
      <ul class="item__bullets">${bullets}</ul>
    `;

    list.appendChild(li);

    // Create a separate carousel for each item
    const carousel = document.createElement("div");
    carousel.className = "career-carousel";
    carousel.dataset.careerIndex = index;
    if (index !== 0) carousel.style.display = "none"; // Hide all except first

    // Add images to this carousel
    item.images.forEach(imgSrc => {
      const cell = document.createElement("div");
      cell.className = "carousel-cell";
      cell.innerHTML = `<img src="${imgSrc}" alt="${item.title}">`;
      carousel.appendChild(cell);
    });

    carouselContainer.appendChild(carousel);

    // Initialize Flickity for this carousel
    if (typeof Flickity !== 'undefined') {
      const flickity = new Flickity(carousel, {
        wrapAround: item.images.length > 1, // Only wrap if more than 1 image
        cellAlign: 'center',
        pageDots: item.images.length > 1, // Only show dots if more than 1 image
        prevNextButtons: false,
        draggable: item.images.length > 1 // Only draggable if more than 1 image
      });
      flickityInstances.push(flickity);
    }
  });

  // Handle scroll-based item activation using the same logic as before
  const items = list.querySelectorAll(".item");
  const carousels = carouselContainer.querySelectorAll(".career-carousel");
  
  function onScroll() {
    // Get the middle point of the carousel container
    const containerRect = carouselContainer.getBoundingClientRect();
    const triggerOffset = containerRect.top + containerRect.height / 2;

    let activeItem = null;

    // Find which item is aligned with the carousel
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top <= triggerOffset) {
        activeItem = item;
      }
    });

    if (activeItem) {
      const index = parseInt(activeItem.dataset.index);
      
      // Remove active from all items
      items.forEach(i => i.classList.remove("active"));
      activeItem.classList.add("active");

      // Show only the corresponding carousel
      carousels.forEach((carousel, i) => {
        if (i === index) {
          if (carousel.style.display === "none") {
            carousel.style.display = "block";
            // Resize Flickity when showing
            if (flickityInstances[i]) {
              flickityInstances[i].resize();
            }
          }
        } else {
          carousel.style.display = "none";
        }
      });
    }
  }

  window.addEventListener("scroll", onScroll);
  activeScrollHandler = onScroll;
  activeFlickityInstances = flickityInstances;
  onScroll(); // Run once on load
}

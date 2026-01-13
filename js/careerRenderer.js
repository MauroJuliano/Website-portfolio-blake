export function renderCareer(careerData) {
  const list = document.getElementById("career-list");
  const carouselContainer = document.querySelector(".media-shift");
  
  if (!list || !carouselContainer) return;

  list.innerHTML = "";
  carouselContainer.innerHTML = "";

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
        wrapAround: true,
        cellAlign: 'center',
        pageDots: true,
        prevNextButtons: false,
        draggable: true
      });
      flickityInstances.push(flickity);
    }
  });

  // Handle scroll-based item activation
  const items = list.querySelectorAll(".item");
  const carousels = carouselContainer.querySelectorAll(".career-carousel");
  
  const observer = new IntersectionObserver(
    (entries) => {
      // Find the most visible item
      let mostVisible = null;
      let maxRatio = 0;

      entries.forEach((entry) => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisible = entry.target;
        }
      });

      // Only activate if we have a clear winner
      if (mostVisible && maxRatio > 0.3) {
        items.forEach(i => i.classList.remove("active"));
        mostVisible.classList.add("active");
        
        const index = parseInt(mostVisible.dataset.index);
        
        // Hide all carousels and show only the active one
        carousels.forEach((carousel, i) => {
          if (i === index) {
            carousel.style.display = "block";
            // Resize Flickity when showing
            if (flickityInstances[i]) {
              flickityInstances[i].resize();
            }
          } else {
            carousel.style.display = "none";
          }
        });
      }
    },
    { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] }
  );

  items.forEach(item => observer.observe(item));
}
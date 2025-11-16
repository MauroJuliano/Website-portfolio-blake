export function initCarousel(selector = ".carousel-wrapper") {
  const wrapper = document.querySelector(selector);
  if (!wrapper) return;

  const items = [...wrapper.querySelectorAll(".carousel-item")];

  let dragging = false;
  let startX = 0;
  let scrollStart = 0;
  let moved = false;

  /** ───── DRAG SUAVE ───────────────────────────────────── */
  wrapper.addEventListener("pointerdown", e => {
    dragging = true;
    moved = false;

    wrapper.style.scrollSnapType = "none";      // <── remove resistência
    wrapper.style.cursor = "grabbing";

    startX = e.clientX;
    scrollStart = wrapper.scrollLeft;

    wrapper.setPointerCapture(e.pointerId);
  });

  wrapper.addEventListener("pointermove", e => {
    if (!dragging) return;

    const dx = e.clientX - startX;

    // micro threshold para impedir "travamento"
    if (Math.abs(dx) > 1) moved = true;
    if (!moved) return;

    wrapper.scrollLeft = scrollStart - dx;
    updateScales(); // atualizar efeito coverflow
  });

  wrapper.addEventListener("pointerup", stopDrag);
  wrapper.addEventListener("pointerleave", stopDrag);
  wrapper.addEventListener("pointercancel", stopDrag);


  /** ───────────────── STOP DRAG ─────────────────────────── */
  function stopDrag(e) {
    if (!dragging) return;
    dragging = false;

    wrapper.style.cursor = "grab";
    wrapper.style.scrollSnapType = "x mandatory"; // <── reativa

    snapToCenter(); // centra o item mais próximo

    if (e.pointerId) wrapper.releasePointerCapture(e.pointerId);
  }


  /** ───── SNAP AO CENTRO ───────────────────────────────── */
  function snapToCenter() {
    const rect = wrapper.getBoundingClientRect();
    const center = wrapper.scrollLeft + rect.width / 2;

    let closest = items[0];
    let minDist = Infinity;

    items.forEach(item => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(itemCenter - center);
      if (dist < minDist) {
        minDist = dist;
        closest = item;
      }
    });

    wrapper.scrollTo({
      left: closest.offsetLeft - rect.width / 2 + closest.offsetWidth / 2,
      behavior: "smooth",
    });

    items.forEach(item => item.classList.remove("active"));
    closest.classList.add("active");
  }


  /** ───── COVERFLOW ESCALING ───────────────────────────── */
  function updateScales() {
    const rect = wrapper.getBoundingClientRect();
    const center = wrapper.scrollLeft + rect.width / 2;

    items.forEach(item => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(itemCenter - center);
      const maxDist = rect.width / 2;

      const scale = 1 - Math.min(dist / maxDist, 1) * 0.25; // 1 → 0.75
      const brightness = 1 - Math.min(dist / maxDist, 1) * 0.4;

      item.style.transform = `scale(${scale})`;
      item.style.filter = `brightness(${brightness})`;
    });
  }

  // inicial
  updateScales();
  snapToCenter();
}

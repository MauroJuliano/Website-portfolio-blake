const mainImage = document.querySelector('.main-image');
const thumbnails = document.querySelectorAll('.thumbnails img');

// Start with first thumbnail active
if (thumbnails.length > 0) {
  thumbnails[0].classList.add('active');
  mainImage.src = thumbnails[0].src;
}

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    if (thumbnail.classList.contains('active')) return;

    thumbnails.forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');

    mainImage.style.opacity = 0;

    setTimeout(() => {
      mainImage.src = thumbnail.src;
      mainImage.style.opacity = 1;
    }, 200);
  });
});
 async function loadSection(id, file) {
  const html = await fetch(file).then(res => res.text());
  document.getElementById(id).innerHTML = html;
}

loadSection("hero", "sections/hero.html");
loadSection("career", "sections/career.html");

// Example JS file - currently empty
console.log("Hero page loaded");

const items = [...document.querySelectorAll('.item')];
const imgEl = document.getElementById('detailImage');

// Observa apenas os títulos, para disparar no cruzamento da faixa central
const headings = items.map(it => it.querySelector('.item__title'));

// Define uma faixa estreita no centro do viewport.
// Ex.: -45% top e -45% bottom => ~10% central de ativação.
const observer = new IntersectionObserver((entries) => {
  // Ordena pelo quanto intersecta, para estabilidade quando dois cruzam ao mesmo tempo
  entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio).forEach(entry => {
    if (!entry.isIntersecting) return;

    // Encontra o item correspondente a este heading
    const h = entry.target;
    const el = h.closest('.item');

    // Marca ativo único
    items.forEach(i => i.classList.remove('active'));
    el.classList.add('active');

    // Troca da imagem somente quando o heading cruza a faixa
    const next = el.getAttribute('data-img');
    if (next && imgEl && imgEl.src !== new URL(next, location.href).href) {
      imgEl.style.transition = 'opacity .25s ease';
      imgEl.style.opacity = '0';
      imgEl.addEventListener('transitionend', function onEnd() {
        imgEl.removeEventListener('transitionend', onEnd);
        imgEl.src = next;
        requestAnimationFrame(() => { imgEl.style.opacity = '1'; });
      }, { once: true });
    }
  });
}, {
  root: null,                        // viewport
  threshold: [0, 0.5, 1],            // detecta entrada robusta
  rootMargin: '-45% 0px -45% 0px'    // faixa central (~10% da viewport)
});

// Observar os headings
headings.forEach(h => observer.observe(h));

const list = document.querySelector('.split__left .timeline');
const mediaShift = document.querySelector('.split__right .media-shift');

// Limite de quanto a imagem pode “descer”
const MAX_SHIFT_PX = 660; // ajuste conforme a estética/print

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

function updateMediaShift() {
  if (!list || !mediaShift) return;

  const rect = list.getBoundingClientRect();
  const vh = window.innerHeight;

  // Progresso 0..1: 0 quando o topo da lista alinha ao topo da viewport,
  // 1 quando a base da lista alinha ao fundo da viewport.
  const totalTravel = rect.height + vh; // faixa de movimento visível
  const scrolled = vh - rect.top;       // quanto a viewport “entrou” na lista
  const t = clamp(scrolled / totalTravel, 0, 1);

  // Desloca a imagem para baixo enquanto a lista sobe
  const dy = t * MAX_SHIFT_PX;
  mediaShift.style.transform = `translateY(${dy}px)`;
}

// Atualiza em scroll e resize
addEventListener('scroll', updateMediaShift, { passive: true });
addEventListener('resize', updateMediaShift);
updateMediaShift();


  const toggleBtn = document.getElementById('themeToggle');

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    toggleBtn.textContent = isLight ? '☼' : '☾';
  });



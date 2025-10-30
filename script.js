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

const list = document.querySelector('.split__left .timeline');
const sticky = document.querySelector('.split__right .sticky');
const mediaFrame = document.querySelector('.split__right .media-frame');
const mediaShift = document.querySelector('.split__right .media-shift');

let visibleProgress = 0; // 0..1 do que está visível da lista

function clamp(v, a, b){ return Math.min(b, Math.max(a, v)); }

// Observa a lista inteira para saber quanto dela está visível
const visObserver = new IntersectionObserver((entries) => {
  // Deve haver só 1 entry (a da lista)
  const entry = entries[0];
  if (!entry) return;

  // Fração visível (0..1) independentemente da posição inicial fora da tela
  const ratio = entry.intersectionRatio; // já é 0..1
  visibleProgress = clamp(ratio, 0, 1);

  // Atualiza deslocamento imediatamente
  applyShift();
}, {
  root: null,                 // viewport
  threshold: Array.from({length: 21}, (_,i)=> i/20), // passos finos de 0..1
  rootMargin: '0px 0px 0px 0px'
});

visObserver.observe(list);

function applyShift(){
  if (!sticky || !mediaFrame || !mediaShift) return;

  const stickyRect = sticky.getBoundingClientRect();
  const frameRect  = mediaFrame.getBoundingClientRect();

  // Espaço útil dentro do sticky
  const available = Math.max(0, stickyRect.height - frameRect.height);

  // Deslocamento proporcional ao que a lista tem visível
  const dy = visibleProgress * available;
  mediaShift.style.transform = `translateY(${dy}px)`;
}

// Atualiza limites quando layout muda
addEventListener('resize', applyShift);

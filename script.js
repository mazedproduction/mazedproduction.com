const topbar = document.querySelector('.topbar');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu-panel');
const menuLinks = document.querySelectorAll('.menu-panel a');

// Refined editorial palette: muted ochre, slate blue, sage, dusty mauve, terracotta.
const editorialPalette = document.createElement('style');
editorialPalette.textContent = `
  .hero-title .ideas-rainbow span:nth-child(1){color:#C8A96B !important}
  .hero-title .ideas-rainbow span:nth-child(2){color:#6F7FA8 !important}
  .hero-title .ideas-rainbow span:nth-child(3){color:#7E9478 !important}
  .hero-title .ideas-rainbow span:nth-child(4){color:#9A7F91 !important}
  .hero-title .ideas-rainbow span:nth-child(5){color:#C77A5A !important}
  .menu-inner a:nth-child(1):hover{color:#C8A96B !important}
  .menu-inner a:nth-child(2):hover{color:#6F7FA8 !important}
  .menu-inner a:nth-child(3):hover{color:#7E9478 !important}
  .menu-inner a:nth-child(4):hover{color:#9A7F91 !important}
  .menu-inner a:nth-child(5):hover{color:#C77A5A !important}
`;
document.head.appendChild(editorialPalette);

window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 20);
});

function setMenu(open){
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? 'CLOSE' : 'MENU';
  document.body.style.overflow = open ? 'hidden' : '';
}
menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menuLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));

const slides = [...document.querySelectorAll('[data-slide]')];
const current = document.querySelector('[data-current]');
let index = 0;
function showSlide(next){
  index = (next + slides.length) % slides.length;
  slides.forEach((slide,i) => slide.classList.toggle('active', i === index));
  current.textContent = String(index + 1).padStart(2,'0');
}
document.querySelector('[data-prev]').addEventListener('click', () => showSlide(index - 1));
document.querySelector('[data-next]').addEventListener('click', () => showSlide(index + 1));

let touchX = null;
const slider = document.querySelector('[data-slider]');
slider.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, {passive:true});
slider.addEventListener('touchend', e => {
  if(touchX === null) return;
  const delta = e.changedTouches[0].clientX - touchX;
  if(Math.abs(delta) > 55) showSlide(index + (delta < 0 ? 1 : -1));
  touchX = null;
}, {passive:true});
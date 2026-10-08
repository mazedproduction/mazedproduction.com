const topbar = document.querySelector('.topbar');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu-panel');
const menuLinks = document.querySelectorAll('.menu-panel a');
const langToggle = document.querySelector('[data-lang-toggle]');

const requestedAdjustments = document.createElement('style');
requestedAdjustments.textContent = `
  .menu-inner p,
  .studio-kicker,
  .abilities > .section-label,
  .callout > p { display:none!important; }
  .contact-bottom { grid-template-columns:1fr!important; }
  .contact-bottom a {
    display:inline-block!important;
    width:auto!important;
    max-width:100%!important;
    white-space:nowrap!important;
    word-break:normal!important;
    overflow-wrap:normal!important;
    font-size:clamp(16px,2.5vw,42px)!important;
  }
  .footer-mid{
    display:flex!important;
    flex-direction:column!important;
    align-items:center!important;
    gap:6px!important;
  }
  .footer-copyright{
    display:block;
    font:9px "DM Mono",monospace;
    letter-spacing:.04em;
    white-space:nowrap;
  }
  html[lang="fr"] .hero-title {
    font-size:min(5.4vw,88px,20svh)!important;
    line-height:.86!important;
    letter-spacing:-.055em!important;
  }
  html[lang="fr"] .hero-title > span { display:block!important; white-space:nowrap; }
  html[lang="en"] .hero-title {
    font-size:min(8vw,132px,20svh)!important;
    line-height:.86!important;
    letter-spacing:-.055em!important;
  }
  .hero-title > span { display:block; white-space:nowrap; }
  html body .hero-title-wrap {
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:clamp(12px,3svh,28px) 0!important;
    overflow:visible!important;
  }
  html body .hero-title { width:100%; text-align:center; overflow:visible!important; }
  html body .studio-grid { grid-template-columns:minmax(0,1fr)!important; gap:0!important; }
  html body .studio h2 {
    font-size:min(7vw,112px)!important;
    line-height:.9!important;
    letter-spacing:-.055em!important;
    overflow-wrap:normal!important;
  }
  html[lang="fr"] body .studio h2 {font-size:min(6.4vw,104px)!important;}
  .studio h2 > span {display:block;white-space:nowrap;}
  html body .studio p {max-width:900px!important;margin-left:0;line-height:1.4;}
  .hero-bottom { display:none!important; }
  .hero-bottom > p:not(.hero-copy) { display:none!important; }
  html body .hero-bottom { grid-template-columns:minmax(0,1fr)!important; }
  html body .hero-copy {
    font-family:Inter,Arial,sans-serif;
    font-weight:600;
    font-size:clamp(20px,2.1vw,32px)!important;
    line-height:1.22!important;
    letter-spacing:-.035em;
    max-width:1000px!important;
    margin:0 0 0 auto;
  }
  html body .callout h2 {
    font-size:min(11.4vw,180px)!important;
    line-height:.88!important;
    letter-spacing:-.055em;
    overflow-wrap:normal!important;
  }
  @media(max-width:820px){
    html body .hero-copy {font-size:clamp(18px,4.5vw,25px)!important;line-height:1.25!important;}
    html body .callout h2 {font-size:12vw!important;line-height:.9!important;}
    .contact-bottom a{font-size:clamp(11px,3.5vw,17px)!important}
    html[lang="fr"] .hero-title{font-size:min(5.4vw,20svh)!important;line-height:.9!important}
    .footer-mid{align-items:flex-start!important}
    .footer-copyright{font-size:8px}
  }
`;
document.head.appendChild(requestedAdjustments);

let currentLang = 'en';

const copy = {
  en: {
    title: 'MAZED — Creative Production Studio',
    description: 'MAZED Production — creative studio in Paris. Art direction, film, photography, branding, digital and culture.',
    menu: ['WORK', 'SERVICES', 'ABOUT', 'CONTACT'],
    menuOpen: 'MENU',
    menuClose: 'CLOSE',
    startProject: 'START A PROJECT ↗',
    heroHTML: '<span>LOST IN IDEAS</span><span>FOUND IN CREATION.</span>',
    heroLead: '',
    heroCopy: '',
    projects: [
      ['PROJECT 001 / EDITORIAL', 'DAZED<br>LOVER BOY', ['ART DIRECTION','PHOTOGRAPHY','EDITORIAL','CREATIVE DIRECTION']],
      ['PROJECT 002 / FILM', 'AFTER<br>MIDNIGHT', ['FILM','PRODUCTION','EDITING','COLOR']],
      ['PROJECT 003 / IDENTITY', 'OBJECTS<br>OF DESIRE', ['BRANDING','CAMPAIGN','SOCIAL','VISUAL IDENTITY']]
    ],
    viewProject: '[ VIEW PROJECT ]',
    marquee: ['GRAPHIC DESIGN','BRANDING','ADVERTISING','VISUAL IDENTITY','SOCIAL MEDIA','WEB DESIGN','FILM','PHOTOGRAPHY','CREATIVE DIRECTION'],
    studioTitle: '<span>MAZED IS A CREATIVE</span><span>PRODUCTION STUDIO</span>',
    studioCopy: 'MAZED is a creative production studio shaping ideas into images, stories and experiences.<br><br>Working across photography, film, design and digital, we bring together creative direction and production to build distinctive visual worlds for brands, artists and culture.',
    abilities: [
      ['STRATEGY','Creative Strategy / Brand Positioning / Creative Consulting / Communication Strategy / Audience Research / Content Planning'],
      ['CONTENT & PRODUCTION','Photography / Film Production / Creative Direction / Production Planning / Casting / Location Scouting / Video Editing / Motion Design / Animation / Post-Production'],
      ['BRAND & DIGITAL','Art Direction / Brand Identity / Visual Guidelines / Website Design / Campaign Assets / Content Systems / Social Content / Social Strategy']
    ],
    calloutTitle: 'WE THINK,<br>WE CREATE,<br>WE BUILD.',
    contactTitle: "LET'S MAKE<br>SOMETHING<br>WORTH FINDING.",
    backTop: 'BACK TO TOP ↑'
  },
  fr: {
    title: 'MAZED — Studio de production créative',
    description: 'MAZED Production — studio créatif à Paris. Direction artistique, film, photographie, branding, digital et culture.',
    menu: ['PROJETS', 'SERVICES', 'À PROPOS', 'CONTACT'],
    menuOpen: 'MENU',
    menuClose: 'FERMER',
    startProject: 'DÉMARRER UN PROJET ↗',
    heroHTML: '<span>Se perdre dans les idées,</span><span>se trouver dans la création.</span>',
    heroLead: '',
    heroCopy: '',
    projects: [
      ['PROJET 001 / ÉDITORIAL', 'DAZED<br>LOVER BOY', ['DIRECTION ARTISTIQUE','PHOTOGRAPHIE','ÉDITORIAL','DIRECTION CRÉATIVE']],
      ['PROJET 002 / FILM', 'AFTER<br>MIDNIGHT', ['FILM','PRODUCTION','MONTAGE','ÉTALONNAGE']],
      ['PROJET 003 / IDENTITÉ', 'OBJECTS<br>OF DESIRE', ['BRANDING','CAMPAGNE','SOCIAL','IDENTITÉ VISUELLE']]
    ],
    viewProject: '[ VOIR LE PROJET ]',
    marquee: ['DESIGN GRAPHIQUE','BRANDING','PUBLICITÉ','IDENTITÉ VISUELLE','RÉSEAUX SOCIAUX','WEB DESIGN','FILM','PHOTOGRAPHIE','DIRECTION CRÉATIVE'],
    studioTitle: '<span>MAZED EST UN STUDIO</span><span>DE PRODUCTION CRÉATIVE.</span>',
    studioCopy: 'MAZED est un studio de production créative qui transforme les idées en images, en récits et en expériences.<br><br>À travers la photographie, le film, le design et le digital, nous réunissons direction créative et production pour construire des univers visuels singuliers pour les marques, les artistes et la culture.',
    abilities: [
      ['STRATEGY','Creative Strategy / Brand Positioning / Creative Consulting / Communication Strategy / Audience Research / Content Planning'],
      ['CONTENT & PRODUCTION','Photography / Film Production / Creative Direction / Production Planning / Casting / Location Scouting / Video Editing / Motion Design / Animation / Post-Production'],
      ['BRAND & DIGITAL','Art Direction / Brand Identity / Visual Guidelines / Website Design / Campaign Assets / Content Systems / Social Content / Social Strategy']
    ],
    calloutTitle: 'WE THINK,<br>WE CREATE,<br>WE BUILD.',
    contactTitle: 'CRÉONS<br>QUELQUE CHOSE<br>QUI MÉRITE D’ÊTRE TROUVÉ.',
    backTop: 'RETOUR EN HAUT ↑'
  }
};

function setHTML(selector, value){
  const el = document.querySelector(selector);
  if (el) el.innerHTML = value;
}

function setText(selector, value){
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function applyLanguage(lang){
  currentLang = lang;
  const t = copy[lang];
  document.documentElement.lang = lang;
  document.title = t.title;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute('content', t.description);

  menuLinks.forEach((link, i) => {
    if (t.menu[i]) link.textContent = t.menu[i];
  });

  menuBtn.textContent = menu.classList.contains('open') ? t.menuClose : t.menuOpen;
  setText('[data-i18n="startProject"]', t.startProject);
  setHTML('.hero-title', t.heroHTML);
  setHTML('.hero-bottom > p:first-child', t.heroLead);
  setText('.hero-copy', t.heroCopy);

  document.querySelectorAll('.slide').forEach((slide, i) => {
    const project = t.projects[i];
    if (!project) return;
    const kicker = slide.querySelector('.slide-info > p');
    const title = slide.querySelector('.slide-info h2');
    const tags = slide.querySelectorAll('.tags span');
    const view = slide.querySelector('.bracket-link');
    if (kicker) kicker.textContent = project[0];
    if (title) title.innerHTML = project[1];
    tags.forEach((tag, j) => { if (project[2][j]) tag.textContent = project[2][j]; });
    if (view) view.textContent = t.viewProject;
  });

  const marqueeSpans = document.querySelectorAll('.marquee-track span');
  marqueeSpans.forEach((span, i) => span.textContent = t.marquee[i % t.marquee.length]);

  setHTML('.studio h2', t.studioTitle);
  setHTML('.studio p', t.studioCopy);

  document.querySelectorAll('.ability-grid a').forEach((row, i) => {
    const item = t.abilities[i];
    if (!item) {
      row.style.display = 'none';
      return;
    }
    row.style.display = '';
    const number = row.querySelector('span');
    const strong = row.querySelector('strong');
    const em = row.querySelector('em');
    if (number) number.textContent = String(i + 1).padStart(2, '0');
    if (strong) strong.textContent = item[0];
    if (em) em.textContent = item[1];
  });

  setHTML('.callout h2', t.calloutTitle);
  setHTML('.contact h2', t.contactTitle);
  setHTML('.footer-mid', '<a href="#top">' + t.backTop + '</a><span class="footer-copyright">©2023 MAZEDPRODUCTION. ALL RIGHTS RESERVED</span>');

  const emailLink = document.querySelector('.contact-bottom a[href^="mailto:"]');
  if (emailLink) emailLink.textContent = '↗ CONTACT@MAZEDPRODUCTION.COM';

  if (langToggle) {
    langToggle.setAttribute('aria-label', lang === 'en' ? 'Passer le site en français' : 'Switch site to English');
  }
}

window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 20);
});

function setMenu(open){
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? copy[currentLang].menuClose : copy[currentLang].menuOpen;
  document.body.style.overflow = open ? 'hidden' : '';
}

menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menuLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
if (langToggle) langToggle.addEventListener('click', () => applyLanguage(currentLang === 'en' ? 'fr' : 'en'));

const slides = [...document.querySelectorAll('[data-slide]')];
const current = document.querySelector('[data-current]');
let index = 0;

function showSlide(next){
  index = (next + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  if (current) current.textContent = String(index + 1).padStart(2, '0');
}

document.querySelector('[data-prev]')?.addEventListener('click', () => showSlide(index - 1));
document.querySelector('[data-next]')?.addEventListener('click', () => showSlide(index + 1));

let touchX = null;
const slider = document.querySelector('[data-slider]');
if (slider) {
  slider.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, {passive:true});
  slider.addEventListener('touchend', e => {
    if (touchX === null) return;
    const delta = e.changedTouches[0].clientX - touchX;
    if (Math.abs(delta) > 55) showSlide(index + (delta < 0 ? 1 : -1));
    touchX = null;
  }, {passive:true});
}

applyLanguage('en');
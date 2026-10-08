const topbar = document.querySelector('.topbar');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu-panel');
const menuLinks = document.querySelectorAll('.menu-panel a');
const langToggle = document.querySelector('[data-lang-toggle]');

const requestedAdjustments = document.createElement('style');
requestedAdjustments.textContent = `

  html body .contact {
    min-height:0!important;
    padding-top:36px!important;
    padding-bottom:36px!important;
    justify-content:flex-start;
    gap:24px;
  }
  html body .contact h2 {margin:0!important;}
  html body .contact-bottom {
    display:flex!important;
    flex-direction:column;
    align-items:center;
    gap:14px!important;
    overflow:visible!important;
  }
  .contact-label {
    margin:0;
    font:14px "DM Mono",monospace;
    letter-spacing:.04em;
  }
  .contact-socials {display:flex;align-items:center;justify-content:center;gap:20px;}
  html body .contact-bottom .contact-social {
    display:inline-flex!important;
    align-items:center;
    justify-content:center;
    width:44px!important;
    height:44px;
    padding:8px;
    color:inherit;
    line-height:1;
    transition:opacity .2s;
  }
  .contact-social svg {display:block;width:28px;height:28px;}
  .contact-socials a:hover {opacity:.65;}
  .contact-socials a:focus-visible {outline:2px solid currentColor;outline-offset:3px;}
  html body .topbar,
  html body .topbar.scrolled {
    height:56px!important;
    padding:10px 22px!important;
    transition:background .25s,border-color .25s;
  }
  html body .topbar .logo {font-size:30px!important;}
  html body .topbar .menu-btn {font-size:12px!important;padding:4px 6px!important;}
  html body .studio h2 {
    width:100%;
    max-width:100%;
    margin:0;
    text-align:left;
    font-weight:900;
    line-height:.92!important;
  }
  html body .studio h2 > span {
    display:block;
    line-height:.92;
    letter-spacing:-.04em;
  }
  .studio-grid > div:last-child {
    width:min(100%,1200px);
    margin:0 auto;
    display:grid;
    grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);
    gap:clamp(32px,6vw,88px);
    align-items:center;
  }
  .studio-copy {
    width:100%;
    min-width:0;
    margin:0;
    text-align:left;
  }
  html body .studio {padding-top:40px!important;padding-bottom:40px!important;}
  html body .studio .studio-copy p {
    margin:0;
    max-width:none!important;
    font-family:Inter,Arial,sans-serif;
    font-size:clamp(18px,1.65vw,24px);
    font-weight:500;
    line-height:1.45;
    letter-spacing:-.025em;
    text-wrap:pretty;
    text-shadow:none;
  }
  .studio-copy strong {font-weight:700;}
  @media(max-width:820px){
    html body .studio {padding-top:30px!important;padding-bottom:30px!important;}
    .studio-grid > div:last-child {grid-template-columns:minmax(0,1fr);gap:24px;}
  }
  @media(max-width:820px){
    html body .topbar,
    html body .topbar.scrolled {height:50px!important;padding:10px 16px!important;}
    html body .topbar .logo {font-size:clamp(20px,5.8vw,24px)!important;}
    html body .topbar .menu-btn {font-size:11px!important;}
  }
  .menu-inner p,
  .studio-kicker,
  .callout > p { display:none!important; }
  .abilities {scroll-margin-top:90px;}
  .services-heading {margin:0 0 30px;}
  .services-title {
    font-family:"Archivo Black",sans-serif;
    font-size:clamp(32px,6vw,88px);
    line-height:1;
    letter-spacing:-.055em;
    margin:0;
  }
  html body .callout {padding-top:32px!important;padding-bottom:32px!important;}
  @media(max-width:820px){
    html body .callout {padding-top:24px!important;padding-bottom:24px!important;}
    .services-heading {margin-bottom:24px;}
    .abilities {scroll-margin-top:72px;}
  }
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
    font-size:min(4.5vw,76px)!important;
    white-space:nowrap;
    text-align:center;
    line-height:.88!important;
    letter-spacing:-.055em;
    overflow-wrap:normal!important;
  }
  html[lang="fr"] body .callout h2 {font-size:min(3.3vw,58px)!important;}
  html body .contact h2 {
    font-size:min(4.3vw,74px)!important;
    line-height:1!important;
    letter-spacing:-.055em!important;
    white-space:nowrap;
    text-align:center;
    overflow:visible!important;
  }
  html[lang="fr"] body .contact h2 {font-size:min(3.1vw,54px)!important;}
  .hero-title .hero-word {display:inline!important;transition:color .18s ease;}
  @media(hover:hover){
    .hero-title .hero-word[data-color="yellow"]:hover {color:#FFE600;}
    .hero-title .hero-word[data-color="blue"]:hover {color:#145BFF;}
    .hero-title .hero-word[data-color="pink"]:hover {color:#FF3FB4;}
    .hero-title .hero-word[data-color="orange"]:hover {color:#FF6500;}
  }
  @media(max-width:820px){
    html body .hero-copy {font-size:clamp(18px,4.5vw,25px)!important;line-height:1.25!important;}
    html body .callout h2 {font-size:4.5vw!important;line-height:.9!important;}
    .contact-bottom a{font-size:clamp(11px,3.5vw,17px)!important}
    html[lang="fr"] .hero-title{font-size:min(5.4vw,20svh)!important;line-height:.9!important}
    .footer-mid{align-items:flex-start!important}
    .footer-copyright{font-size:8px}
  }
`;
document.head.appendChild(requestedAdjustments);
setHTML('.contact-bottom', "<p class=\"contact-label\">CONTACT ME</p><div class=\"contact-socials\"><a class=\"contact-social\" href=\"mailto:contact@mazedproduction.com\" aria-label=\"Email\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"m3 6 9 7 9-7\"/></svg></a><span class=\"contact-social\" role=\"img\" aria-label=\"LinkedIn\"><svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.89a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM19 18.75h-2.95V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.76V9.2h2.83v1.31h.04c.39-.74 1.36-1.52 2.8-1.52 3 0 3.57 1.98 3.57 4.56v5.2Z\"/></svg></span><a class=\"contact-social\" href=\"https://www.instagram.com/mazedproduction/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Instagram\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg></a></div>");

const studioParagraph = document.querySelector('.studio-grid p');
if (studioParagraph) {
  const article = document.createElement('div');
  article.className = 'studio-copy';
  studioParagraph.replaceWith(article);
}

function fitStudioTitle(){
  const title = document.querySelector('.studio h2');
  if (!title || !title.clientWidth) return;
  title.querySelectorAll(':scope > span').forEach(line => {
    line.style.fontSize = '100px';
    const range = document.createRange();
    range.selectNodeContents(line);
    const width = range.getBoundingClientRect().width;
    if (width > 0) line.style.fontSize = (100 * title.clientWidth / width) + 'px';
  });
}
window.addEventListener('resize', fitStudioTitle);
document.fonts?.ready.then(fitStudioTitle);


const servicesSection = document.querySelector('.abilities');
const creativeSlogan = document.querySelector('.callout');
if (servicesSection && creativeSlogan) {
  servicesSection.before(creativeSlogan);
}

const servicesHeading = document.querySelector('.abilities > .section-label');
if (servicesHeading) {
  servicesHeading.className = 'services-heading';
  servicesHeading.innerHTML = '<h2 class="services-title">SERVICES</h2>';
}

let currentLang = 'en';

const copy = {
  en: {
    title: 'MAZED — Creative Production Studio',
    description: 'MAZED Production — creative studio in Paris. Art direction, film, photography, branding, digital and culture.',
    menu: ['WORK', 'SERVICES', 'ABOUT', 'CONTACT'],
    menuOpen: 'MENU',
    menuClose: 'CLOSE',
    startProject: 'START A PROJECT ↗',
    heroHTML: '<span><span class="hero-word" data-color="yellow">LOST IN</span> <span class="hero-word" data-color="blue">IDEAS</span></span><span><span class="hero-word" data-color="pink">FOUND IN</span> <span class="hero-word" data-color="orange">CREATION.</span></span>',
    heroLead: '',
    heroCopy: '',
    projects: [
      ['PROJECT 001 / EDITORIAL', 'DAZED<br>LOVER BOY', ['ART DIRECTION','PHOTOGRAPHY','EDITORIAL','CREATIVE DIRECTION']],
      ['PROJECT 002 / FILM', 'AFTER<br>MIDNIGHT', ['FILM','PRODUCTION','EDITING','COLOR']],
      ['PROJECT 003 / IDENTITY', 'OBJECTS<br>OF DESIRE', ['BRANDING','CAMPAIGN','SOCIAL','VISUAL IDENTITY']]
    ],
    viewProject: '[ VIEW PROJECT ]',
    marquee: ['GRAPHIC DESIGN','BRANDING','ADVERTISING','VISUAL IDENTITY','SOCIAL MEDIA','WEB DESIGN','FILM','PHOTOGRAPHY','CREATIVE DIRECTION'],
    studioTitle: '<span>MAZED PRODUCTION IS</span><span>A CREATIVE</span><span>PRODUCTION STUDIO</span>',
    studioCopy: '<p>shaping ideas into images, stories and experiences. Working across photography, film, design and digital, we bring together creative direction and production to build distinctive visual worlds for brands, artists and culture.</p>',
    abilities: [
      ['STRATEGY','Creative Strategy / Brand Positioning / Creative Consulting / Communication Strategy / Audience Research / Content Planning'],
      ['CONTENT & PRODUCTION','Photography / Film Production / Creative Direction / Production Planning / Casting / Location Scouting / Video Editing / Motion Design / Animation / Post-Production'],
      ['BRAND & DIGITAL','Art Direction / Brand Identity / Visual Guidelines / Website Design / Campaign Assets / Content Systems / Social Content / Social Strategy']
    ],
    calloutTitle: 'WE THINK, WE CREATE, WE BUILD.',
    contactTitle: "LET’S MAKE SOMETHING WORTH FINDING.",
    backTop: 'BACK TO TOP ↑'
  },
  fr: {
    title: 'MAZED — Studio de production créative',
    description: 'MAZED Production — studio créatif à Paris. Direction artistique, film, photographie, branding, digital et culture.',
    menu: ['PROJETS', 'SERVICES', 'À PROPOS', 'CONTACT'],
    menuOpen: 'MENU',
    menuClose: 'FERMER',
    startProject: 'DÉMARRER UN PROJET ↗',
    heroHTML: '<span><span class="hero-word" data-color="yellow">Se perdre</span> <span class="hero-word" data-color="blue">dans les idées,</span></span><span><span class="hero-word" data-color="pink">se trouver</span> <span class="hero-word" data-color="orange">dans la création.</span></span>',
    heroLead: '',
    heroCopy: '',
    projects: [
      ['PROJET 001 / ÉDITORIAL', 'DAZED<br>LOVER BOY', ['DIRECTION ARTISTIQUE','PHOTOGRAPHIE','ÉDITORIAL','DIRECTION CRÉATIVE']],
      ['PROJET 002 / FILM', 'AFTER<br>MIDNIGHT', ['FILM','PRODUCTION','MONTAGE','ÉTALONNAGE']],
      ['PROJET 003 / IDENTITÉ', 'OBJECTS<br>OF DESIRE', ['BRANDING','CAMPAGNE','SOCIAL','IDENTITÉ VISUELLE']]
    ],
    viewProject: '[ VOIR LE PROJET ]',
    marquee: ['DESIGN GRAPHIQUE','BRANDING','PUBLICITÉ','IDENTITÉ VISUELLE','RÉSEAUX SOCIAUX','WEB DESIGN','FILM','PHOTOGRAPHIE','DIRECTION CRÉATIVE'],
    studioTitle: '<span>MAZED PRODUCTION EST</span><span>UN STUDIO DE</span><span>PRODUCTION CRÉATIVE.</span>',
    studioCopy: '<p>qui transforme les idées en images, en récits et en expériences. À travers la photographie, le film, le design et le digital, nous réunissons direction créative et production pour construire des univers visuels singuliers pour les marques, les artistes et la culture.</p>',
    abilities: [
      ['STRATEGY','Creative Strategy / Brand Positioning / Creative Consulting / Communication Strategy / Audience Research / Content Planning'],
      ['CONTENT & PRODUCTION','Photography / Film Production / Creative Direction / Production Planning / Casting / Location Scouting / Video Editing / Motion Design / Animation / Post-Production'],
      ['BRAND & DIGITAL','Art Direction / Brand Identity / Visual Guidelines / Website Design / Campaign Assets / Content Systems / Social Content / Social Strategy']
    ],
    calloutTitle: 'NOUS PENSONS, NOUS CRÉONS, NOUS CONSTRUISONS.',
    contactTitle: 'CRÉONS QUELQUE CHOSE QUI MÉRITE D’ÊTRE TROUVÉ.',
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
  setHTML('.studio-copy', t.studioCopy);
  fitStudioTitle();

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
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
  html[lang="fr"] .hero-title {
    font-size:clamp(54px,10vw,150px)!important;
    line-height:.82!important;
    letter-spacing:-.065em!important;
  }
  html[lang="fr"] .hero-title > span { display:block!important; white-space:nowrap; }
  @media(max-width:820px){
    .contact-bottom a{font-size:clamp(11px,3.5vw,17px)!important}
    html[lang="fr"] .hero-title{font-size:clamp(42px,12.3vw,70px)!important;line-height:.88!important}
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
    heroHTML: '<span>LOST IN</span><span class="outline ideas-rainbow"><span>I</span><span>D</span><span>E</span><span>A</span><span>S</span></span><span>FOUND IN</span><span>CREATION.</span>',
    heroLead: 'WE THINK, WE CREATE, WE BUILD.',
    heroCopy: 'MAZED is a creative production studio shaping bold visual worlds through film, photography and design. From the first thought to the final frame, we turn ideas into images that move culture forward.',
    projects: [
      ['PROJECT 001 / EDITORIAL', 'DAZED<br>LOVER BOY', ['ART DIRECTION','PHOTOGRAPHY','EDITORIAL','CREATIVE DIRECTION']],
      ['PROJECT 002 / FILM', 'AFTER<br>MIDNIGHT', ['FILM','PRODUCTION','EDITING','COLOR']],
      ['PROJECT 003 / IDENTITY', 'OBJECTS<br>OF DESIRE', ['BRANDING','CAMPAIGN','SOCIAL','VISUAL IDENTITY']]
    ],
    viewProject: '[ VIEW PROJECT ]',
    marquee: ['GRAPHIC DESIGN','BRANDING','ADVERTISING','VISUAL IDENTITY','SOCIAL MEDIA','WEB DESIGN','FILM','PHOTOGRAPHY','CREATIVE DIRECTION'],
    studioTitle: 'MAZED IS A<br>CREATIVE<br>PRODUCTION<br>STUDIO',
    studioCopy: 'working across photography, film, branding and digital. From the first idea to its final expression, we bring together creativity, strategy and production to shape bold visual worlds and turn ideas into meaningful experiences.',
    abilities: [
      ['STRATEGY','Creative Strategy / Brand Positioning / Creative Consulting / Communication Strategy / Audience Research / Content Planning'],
      ['CONTENT & PRODUCTION','Photography / Film Production / Creative Direction / Production Planning / Casting / Location Scouting / Video Editing / Motion Design / Animation / Post-Production'],
      ['BRAND & DIGITAL','Art Direction / Brand Identity / Visual Guidelines / Website Design / Campaign Assets / Content Systems / Social Content / Social Strategy']
    ],
    calloutTitle: 'IMPOSSIBLE<br>TO IGNORE.',
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
    heroHTML: '<span>OÙ LES IDÉES</span><span>SE PERDENT,</span><span>LA CRÉATION</span><span>COMMENCE</span>',
    heroLead: 'WE THINK, WE CREATE, WE BUILD.',
    heroCopy: 'De la première idée à la dernière image, MAZED construit des univers visuels à travers le film, la photographie, le design et les récits culturels.',
    projects: [
      ['PROJET 001 / ÉDITORIAL', 'DAZED<br>LOVER BOY', ['DIRECTION ARTISTIQUE','PHOTOGRAPHIE','ÉDITORIAL','DIRECTION CRÉATIVE']],
      ['PROJET 002 / FILM', 'AFTER<br>MIDNIGHT', ['FILM','PRODUCTION','MONTAGE','ÉTALONNAGE']],
      ['PROJET 003 / IDENTITÉ', 'OBJECTS<br>OF DESIRE', ['BRANDING','CAMPAGNE','SOCIAL','IDENTITÉ VISUELLE']]
    ],
    viewProject: '[ VOIR LE PROJET ]',
    marquee: ['DESIGN GRAPHIQUE','BRANDING','PUBLICITÉ','IDENTITÉ VISUELLE','RÉSEAUX SOCIAUX','WEB DESIGN','FILM','PHOTOGRAPHIE','DIRECTION CRÉATIVE'],
    studioTitle: 'MAZED EST UN<br>STUDIO DE<br>PRODUCTION<br>CRÉATIVE.',
    studioCopy: 'Nous travaillons avec des artistes, des marques et des personnes qui veulent plus que du contenu. Nous transformons les idées en langage visuel — capable de devenir un film, une image, une identité, une campagne ou un univers entier.',
    abilities: [
      ['STRATEGY','Creative Strategy / Brand Positioning / Creative Consulting / Communication Strategy / Audience Research / Content Planning'],
      ['CONTENT & PRODUCTION','Photography / Film Production / Creative Direction / Production Planning / Casting / Location Scouting / Video Editing / Motion Design / Animation / Post-Production'],
      ['BRAND & DIGITAL','Art Direction / Brand Identity / Visual Guidelines / Website Design / Campaign Assets / Content Systems / Social Content / Social Strategy']
    ],
    calloutTitle: 'IMPOSSIBLE<br>À IGNORER.',
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
  setText('.studio p', t.studioCopy);

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
  setHTML('.footer-mid', '<a href="#top">' + t.backTop + '</a>');

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
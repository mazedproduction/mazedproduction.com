const topbar = document.querySelector('.topbar');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu-panel');
const menuLinks = document.querySelectorAll('.menu-panel a');
const langToggle = document.querySelector('[data-lang-toggle]');

const psychedelicIdeasStyle = document.createElement('style');
psychedelicIdeasStyle.textContent = `
  .hero-title .ideas-rainbow > span{
    display:inline-block!important;
    position:relative;
  }
  .hero-title .ideas-rainbow > span:nth-child(1){
    color:#FFE600!important;
    text-shadow:2px 0 0 #111,-2px 0 0 #111,0 2px 0 #111,0 -2px 0 #111,5px 5px 0 #FF3FB4!important;
  }
  .hero-title .ideas-rainbow > span:nth-child(2){
    color:#FF1F1F!important;
    text-shadow:2px 0 0 #111,-2px 0 0 #111,0 2px 0 #111,0 -2px 0 #111,5px 5px 0 #FFE600!important;
  }
  .hero-title .ideas-rainbow > span:nth-child(3){
    color:#FF3FB4!important;
    text-shadow:2px 0 0 #111,-2px 0 0 #111,0 2px 0 #111,0 -2px 0 #111,5px 5px 0 #145BFF!important;
  }
  .hero-title .ideas-rainbow > span:nth-child(4){
    color:#145BFF!important;
    text-shadow:2px 0 0 #111,-2px 0 0 #111,0 2px 0 #111,0 -2px 0 #111,5px 5px 0 #FF6500!important;
  }
  .hero-title .ideas-rainbow > span:nth-child(5){
    color:#FF6500!important;
    text-shadow:2px 0 0 #111,-2px 0 0 #111,0 2px 0 #111,0 -2px 0 #111,5px 5px 0 #FFE600!important;
  }
  html[lang="fr"] .hero-title{
    font-size:clamp(58px,9.3vw,146px);
    line-height:.84;
    letter-spacing:-.06em;
  }
  html[lang="fr"] .hero-title-wrap{padding:3vh 0 2vh}
  html[lang="fr"] .hero-title > span:nth-child(4){display:none}
  @media(max-width:820px){
    html[lang="fr"] .hero-title{font-size:clamp(44px,13.2vw,74px);line-height:.88}
  }
`;
document.head.appendChild(psychedelicIdeasStyle);

let currentLang = 'en';

const copy = {
  en: {
    title: 'MAZED — Creative Production Studio',
    description: 'MAZED Production — creative studio in Paris. Art direction, film, photography, branding, digital and culture.',
    menu: ['WORK', 'STUDIO', 'ABILITIES', 'ABOUT', 'CONTACT'],
    menuFooter: 'PARIS / AVAILABLE WORLDWIDE',
    menuOpen: 'MENU',
    menuClose: 'CLOSE',
    startProject: 'START A PROJECT ↗',
    hero: ['LOST IN', 'IDEAS', 'FOUND IN', 'CREATION.'],
    heroLead: "WE DON'T JUST FIND DIRECTION —<br>WE CREATE IT.",
    heroCopy: 'From the first thought to the final frame, MAZED builds visual worlds through film, photography, design and cultural storytelling.',
    checkWork: '[ CHECK OUT OUR WORK ]',
    featured: 'FEATURED WORK',
    projects: [
      ['PROJECT 001 / EDITORIAL', 'DAZED<br>LOVER BOY', ['ART DIRECTION','PHOTOGRAPHY','EDITORIAL','CREATIVE DIRECTION']],
      ['PROJECT 002 / FILM', 'AFTER<br>MIDNIGHT', ['FILM','PRODUCTION','EDITING','COLOR']],
      ['PROJECT 003 / IDENTITY', 'OBJECTS<br>OF DESIRE', ['BRANDING','CAMPAIGN','SOCIAL','VISUAL IDENTITY']]
    ],
    viewProject: '[ VIEW PROJECT ]',
    marquee: ['GRAPHIC DESIGN','BRANDING','ADVERTISING','VISUAL IDENTITY','SOCIAL MEDIA','WEB DESIGN','FILM','PHOTOGRAPHY','CREATIVE DIRECTION'],
    studioKicker: 'CRAFTING CULTURE<br>[ TELLING STORIES ]<br>SHAPING TOMORROW',
    studioTitle: 'MAZED IS A<br>CREATIVE<br>PRODUCTION<br>STUDIO.',
    studioCopy: 'We work with artists, brands and people who want more than content. We turn ideas into a visual language — one that can live as a film, an image, an identity, a campaign or an entire world.',
    abilitiesLabel: 'SERVICES',
    abilities: [
      ['CONTENT','Photography / Film Production / Video Editing / Motion Design / Animation / Social Content / Creative Direction'],
      ['BRAND STRATEGY','Creative Strategy / Brand Positioning / Art Direction / Brand Identity / Visual Guidelines / Creative Consulting'],
      ['PRODUCTION','Creative Concepts / Production Planning / Crew Coordination / Casting / Location Scouting / Post Production'],
      ['DIGITAL','Website Design / Content Systems / Campaign Assets / Social Strategy'],
      ['CONSULTING','Creative Audit / Brand Workshops / Communication Strategy / Audience Research / Content Planning']
    ],
    galleryThe: 'THE',
    galleryTitle: 'GALLERY',
    galleryCopy: 'OUR PERSONAL VISUAL MOODBOARD —<br>CURATED FOR ENDLESS INSPIRATION.',
    galleryNote: 'PLACEHOLDERS — REPLACE WITH YOUR OWN WORK / IMAGES BEFORE LAUNCH',
    calloutLead: 'WE REVEAL WHAT MAKES YOU',
    calloutTitle: 'IMPOSSIBLE<br>TO IGNORE.',
    contactTop: ['NEW BUSINESS / COLLABORATION','PARIS · WORLDWIDE'],
    contactTitle: "LET'S MAKE<br>SOMETHING<br>WORTH FINDING.",
    contactServices: 'FILM · PHOTO · ART DIRECTION · BRANDING · DIGITAL · CULTURE',
    footerMid: 'LOST IN IDEAS<br>[ FOUND IN CREATION ]',
    backTop: 'BACK TO TOP ↑'
  },
  fr: {
    title: 'MAZED — Studio de production créative',
    description: 'MAZED Production — studio créatif à Paris. Direction artistique, film, photographie, branding, digital et culture.',
    menu: ['PROJETS', 'STUDIO', 'SAVOIR-FAIRE', 'À PROPOS', 'CONTACT'],
    menuFooter: 'PARIS / DISPONIBLE PARTOUT',
    menuOpen: 'MENU',
    menuClose: 'FERMER',
    startProject: 'DÉMARRER UN PROJET ↗',
    hero: ['PERDU DANS', 'IDÉES', 'RETROUVÉ DANS LA CRÉATION.'],
    heroLead: 'NOUS NE CHERCHONS PAS SEULEMENT UNE DIRECTION —<br>NOUS LA CRÉONS.',
    heroCopy: 'De la première idée à la dernière image, MAZED construit des univers visuels à travers le film, la photographie, le design et les récits culturels.',
    checkWork: '[ VOIR NOS PROJETS ]',
    featured: 'PROJETS À LA UNE',
    projects: [
      ['PROJET 001 / ÉDITORIAL', 'DAZED<br>LOVER BOY', ['DIRECTION ARTISTIQUE','PHOTOGRAPHIE','ÉDITORIAL','DIRECTION CRÉATIVE']],
      ['PROJET 002 / FILM', 'AFTER<br>MIDNIGHT', ['FILM','PRODUCTION','MONTAGE','ÉTALONNAGE']],
      ['PROJET 003 / IDENTITÉ', 'OBJECTS<br>OF DESIRE', ['BRANDING','CAMPAGNE','SOCIAL','IDENTITÉ VISUELLE']]
    ],
    viewProject: '[ VOIR LE PROJET ]',
    marquee: ['DESIGN GRAPHIQUE','BRANDING','PUBLICITÉ','IDENTITÉ VISUELLE','RÉSEAUX SOCIAUX','WEB DESIGN','FILM','PHOTOGRAPHIE','DIRECTION CRÉATIVE'],
    studioKicker: 'CRÉER LA CULTURE<br>[ RACONTER DES HISTOIRES ]<br>FAÇONNER DEMAIN',
    studioTitle: 'MAZED EST UN<br>STUDIO DE<br>PRODUCTION<br>CRÉATIVE.',
    studioCopy: 'Nous travaillons avec des artistes, des marques et des personnes qui veulent plus que du contenu. Nous transformons les idées en langage visuel — capable de devenir un film, une image, une identité, une campagne ou un univers entier.',
    abilitiesLabel: 'SERVICES',
    abilities: [
      ['CONTENU','Photographie / Production film / Montage vidéo / Motion design / Animation / Contenu social / Direction créative'],
      ['STRATÉGIE DE MARQUE','Stratégie créative / Positionnement de marque / Direction artistique / Identité de marque / Guidelines visuelles / Conseil créatif'],
      ['PRODUCTION','Concepts créatifs / Planification de production / Coordination d’équipe / Casting / Repérage / Post-production'],
      ['DIGITAL','Design de site web / Systèmes de contenu / Assets de campagne / Stratégie social media'],
      ['CONSEIL','Audit créatif / Workshops de marque / Stratégie de communication / Étude d’audience / Planification de contenu']
    ],
    galleryThe: 'LA',
    galleryTitle: 'GALERIE',
    galleryCopy: 'NOTRE MOODBOARD VISUEL PERSONNEL —<br>CURATÉ POUR UNE INSPIRATION SANS FIN.',
    galleryNote: 'VISUELS TEMPORAIRES — À REMPLACER PAR VOS PROPRES IMAGES / PROJETS AVANT LE LANCEMENT',
    calloutLead: 'NOUS RÉVÉLONS CE QUI VOUS REND',
    calloutTitle: 'IMPOSSIBLE<br>À IGNORER.',
    contactTop: ['NOUVEAUX PROJETS / COLLABORATIONS','PARIS · MONDE ENTIER'],
    contactTitle: 'CRÉONS<br>QUELQUE CHOSE<br>QUI MÉRITE D’ÊTRE TROUVÉ.',
    contactServices: 'FILM · PHOTO · DIRECTION ARTISTIQUE · BRANDING · DIGITAL · CULTURE',
    footerMid: 'PERDU DANS LES IDÉES<br>[ RETROUVÉ DANS LA CRÉATION ]',
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
  setText('.menu-inner p', t.menuFooter);
  menuBtn.textContent = menu.classList.contains('open') ? t.menuClose : t.menuOpen;
  setText('[data-i18n="startProject"]', t.startProject);

  const heroLines = document.querySelectorAll('.hero-title > span');
  if (heroLines[0]) heroLines[0].textContent = t.hero[0];
  const ideaLine = heroLines[1];
  if (ideaLine) {
    if (lang === 'en') {
      ideaLine.innerHTML = '<span>I</span><span>D</span><span>E</span><span>A</span><span>S</span>';
    } else {
      ideaLine.innerHTML = 'LES <span>I</span><span>D</span><span>É</span><span>E</span><span>S</span>';
    }
  }
  if (heroLines[2]) heroLines[2].textContent = lang === 'fr' ? t.hero[2] : t.hero[2];
  if (heroLines[3]) {
    heroLines[3].textContent = lang === 'en' ? t.hero[3] : '';
    heroLines[3].style.display = lang === 'en' ? '' : 'none';
  }
  setHTML('.hero-bottom > p:first-child', t.heroLead);
  setText('.hero-copy', t.heroCopy);
  setText('.hero-bottom .bracket-link', t.checkWork);
  setText('.featured .section-label span:first-child', t.featured);

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
  setHTML('.studio-kicker', t.studioKicker);
  setHTML('.studio h2', t.studioTitle);
  setText('.studio p', t.studioCopy);
  setText('.abilities .section-label span:first-child', t.abilitiesLabel);
  document.querySelectorAll('.ability-grid a').forEach((row, i) => {
    const item = t.abilities[i];
    if (!item) return;
    const strong = row.querySelector('strong');
    const em = row.querySelector('em');
    if (strong) strong.textContent = item[0];
    if (em) em.textContent = item[1];
  });
  setText('.gallery-head .mono', t.galleryThe);
  setText('.gallery-head h2', t.galleryTitle);
  setHTML('.gallery-head > p', t.galleryCopy);
  setText('.gallery-note', t.galleryNote);
  setText('.callout > p', t.calloutLead);
  setHTML('.callout h2', t.calloutTitle);

  const contactTop = document.querySelectorAll('.contact-top span');
  if (contactTop[0]) contactTop[0].textContent = t.contactTop[0];
  if (contactTop[1]) contactTop[1].textContent = t.contactTop[1];
  setHTML('.contact h2', t.contactTitle);
  setText('.contact-bottom p', t.contactServices);
  setHTML('.footer-mid', t.footerMid);
  setText('.footer-end a', t.backTop);

  if (langToggle) langToggle.setAttribute('aria-label', lang === 'en' ? 'Passer le site en français' : 'Switch site to English');
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

applyLanguage('en');
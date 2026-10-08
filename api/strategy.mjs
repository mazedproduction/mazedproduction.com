import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE = '__Host-mazed_strategy';
const TTL = 8 * 60 * 60;
const digest = value => createHash('sha256').update(value).digest();
const equal = (a, b) => timingSafeEqual(digest(a), digest(b));
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const sign = (payload, secret) => createHmac('sha256', secret).update('mazed-strategy-v1:' + payload).digest('base64url');
function session(secret) {
  const payload = Buffer.from(JSON.stringify({exp:Math.floor(Date.now()/1000)+TTL})).toString('base64url');
  return payload + '.' + sign(payload, secret);
}
function authenticated(cookie, secret) {
  try {
    const token = (cookie || '').split(';').map(item => item.trim()).find(item => item.startsWith(COOKIE + '='))?.slice(COOKIE.length+1);
    if (!token || token.length > 512) return false;
    const parts = token.split('.');
    if (parts.length !== 2 || !equal(parts[1], sign(parts[0], secret))) return false;
    const {exp} = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
    const now = Math.floor(Date.now()/1000);
    return Number.isInteger(exp) && exp > now && exp <= now+TTL;
  } catch { return false; }
}
const words = {
  fr: {
    back:'RETOUR AU SITE', client:'ESPACE CLIENT', intro:'Une direction claire. Des idées qui prennent forme.',
    lead:'Nous donnons à votre projet un cap créatif, un positionnement et un plan concret avant de passer à la production.',
    label:'CODE D’ACCÈS', enter:'ACCÉDER À STRATEGY', ask:'Entrez le code partagé par MAZED PRODUCTION.',
    invalid:'Ce code n’est pas valide. Veuillez réessayer.', pending:'L’accès client est en cours de préparation. Contactez MAZED pour votre accès.',
    help:'DEMANDER UN ACCÈS', logout:'FERMER LA SESSION', deliver:'Livrables possibles', method:'COMMENT NOUS TRAVAILLONS',
    cta:'DONNONS UNE DIRECTION À VOTRE PROJET', discuss:'PARLONS DE VOTRE PROJET', note:'Le périmètre et les livrables sont définis ensemble, selon votre projet.',
    services:[
      ['Creative Strategy','Transformer une intention en direction créative : concept, angle narratif, références et territoire d’expression.','Note d’intention / Concept créatif / Moodboard / Pistes de campagne'],
      ['Brand Positioning','Clarifier ce qui vous distingue, à qui vous vous adressez et la place que votre marque souhaite occuper.','Audit de marque / Proposition de valeur / Positionnement / Messages clés'],
      ['Creative Consulting','Prendre du recul sur vos idées, vos images ou une campagne pour identifier la direction à développer.','Session de conseil / Analyse des supports / Recommandations / Priorités créatives'],
      ['Communication Strategy','Organiser vos messages et vos prises de parole autour d’un objectif et des canaux adaptés.','Objectifs de communication / Messages par audience / Choix des canaux / Plan de lancement'],
      ['Audience Research','Mieux comprendre les personnes que vous souhaitez toucher, leurs attentes et leur rapport à votre univers.','Analyse des publics / Entretiens selon le périmètre / Synthèse des enseignements / Opportunités'],
      ['Content Planning','Définir les sujets, les formats et le rythme de publication pour préparer une production cohérente.','Piliers de contenu / Calendrier éditorial / Matrice de formats / Briefs de production']
    ],
    steps:[['01 — COMPRENDRE','Nous échangeons sur votre projet, vos objectifs, vos publics et vos contraintes.'],['02 — DÉFINIR','Nous construisons une direction et des recommandations concrètes à discuter ensemble.'],['03 — ACTIVER','Vous repartez avec un cadre exploitable ; nous pouvons ensuite accompagner sa production.']]
  },
  en: {
    back:'BACK TO WEBSITE', client:'CLIENT SPACE', intro:'A clear direction. Ideas ready to take shape.',
    lead:'We give your project a creative direction, a positioning and a practical plan before moving into production.',
    label:'ACCESS CODE', enter:'EXPLORE STRATEGY', ask:'Enter the code shared by MAZED PRODUCTION.',
    invalid:'This code is not valid. Please try again.', pending:'Client access is being prepared. Contact MAZED for access.',
    help:'REQUEST ACCESS', logout:'SIGN OUT', deliver:'Possible deliverables', method:'HOW WE WORK',
    cta:'LET’S GIVE YOUR PROJECT DIRECTION', discuss:'LET’S DISCUSS YOUR PROJECT', note:'We define the scope and deliverables together around your project.',
    services:[
      ['Creative Strategy','Turn an intention into a creative direction through concepts, narrative angles, references and visual territories.','Creative rationale / Creative concept / Moodboard / Campaign directions'],
      ['Brand Positioning','Clarify what makes you distinctive, who you speak to and the place your brand wants to occupy.','Brand audit / Value proposition / Positioning / Key messages'],
      ['Creative Consulting','Step back from an idea, a set of images or a campaign to identify the direction worth developing.','Consulting session / Asset review / Recommendations / Creative priorities'],
      ['Communication Strategy','Organise messages and communication around a clear objective and the right channels.','Communication objectives / Audience messages / Channel choices / Launch plan'],
      ['Audience Research','Understand the people you want to reach, their expectations and their relationship with your world.','Audience analysis / Interviews within scope / Findings / Opportunities'],
      ['Content Planning','Define topics, formats and publishing rhythm to prepare a coherent production.','Content pillars / Editorial calendar / Format matrix / Production briefs']
    ],
    steps:[['01 — UNDERSTAND','We discuss your project, objectives, audience and constraints.'],['02 — DEFINE','We build a direction and practical recommendations to develop together.'],['03 — ACTIVATE','You leave with a usable framework; we can then help bring it into production.']]
  }
};
const css = `*{box-sizing:border-box}html{color-scheme:light}body{margin:0;background:#f2efe7;color:#0a0a0a;font-family:Inter,Arial,sans-serif}a{color:inherit;text-decoration:none}header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 24px;border-bottom:1px solid #0a0a0a}header>a:first-child{font-family:'Archivo Black',sans-serif;font-size:24px;letter-spacing:-.055em}nav{display:flex;align-items:center;gap:24px;font:12px 'DM Mono',monospace}button,input{font:inherit}button,a,input{touch-action:manipulation}a:hover{color:#145BFF}a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #145BFF;outline-offset:4px}.mono{font:12px 'DM Mono',monospace;letter-spacing:.04em}.wrap{max-width:1280px;margin:auto;padding:56px 24px}h1,h2,h3{font-family:'Archivo Black',sans-serif;letter-spacing:-.055em}h1{font-size:clamp(64px,12vw,172px);line-height:.9;margin:24px 0 32px}.intro{max-width:760px;font-size:clamp(24px,3vw,38px);line-height:1.15;margin:0 0 22px}.lead{max-width:640px;font-size:19px;line-height:1.5;margin:0}.kicker{display:inline-block;background:#d7ff2f;padding:8px 12px}.lock{max-width:600px;margin:0 auto;padding:64px 0}.lock h1{font-size:clamp(56px,9vw,106px)}.lock p{font-size:18px;line-height:1.5}label{display:block;margin:32px 0 10px}input{width:100%;padding:16px;background:transparent;border:1px solid #0a0a0a;border-radius:0;font-size:20px}button.primary{width:100%;background:#0a0a0a;color:#f2efe7;border:1px solid #0a0a0a;padding:17px;margin-top:12px;cursor:pointer;font:14px 'DM Mono',monospace}button.primary:hover{background:#145BFF;border-color:#145BFF}.error{font-size:16px!important;color:#a31c10;min-height:24px}.help{display:inline-block;margin-top:20px}.services{margin-top:56px;border-top:1px solid #0a0a0a}.service{display:grid;grid-template-columns:48px minmax(0,1fr) minmax(0,1fr);gap:24px;padding:32px 0;border-bottom:1px solid #0a0a0a}.service h2{font-size:clamp(26px,3vw,44px);line-height:1.02;margin:0}.service p{font-size:17px;line-height:1.5;margin:0 0 18px}.service small{font:12px 'DM Mono',monospace;display:block;margin-bottom:8px}.service .deliver{font-size:14px;line-height:1.6;margin:0}.method{margin-top:64px}.method h2{font-size:clamp(28px,5vw,64px)}.steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px}.steps h3{font-size:23px}.steps p{font-size:17px;line-height:1.5}.note{margin-top:32px;font-size:14px;line-height:1.5}.cta{background:#ff5035;padding:36px 24px}.cta>div{max-width:1232px;margin:auto}.cta h2{font-size:clamp(28px,4.5vw,70px);margin:0 0 24px;line-height:1}.cta a{font:14px 'DM Mono',monospace;text-decoration:underline;text-underline-offset:5px}footer{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;background:#0a0a0a;color:#f2efe7;padding:24px}.signout{background:none;border:0;padding:0;color:inherit;cursor:pointer;font:12px 'DM Mono',monospace}@media(max-width:700px){header{padding:16px;align-items:flex-start}header>a:first-child{font-size:20px}nav{flex-wrap:wrap;justify-content:flex-end;gap:12px}.wrap{padding:32px 16px}.lock{padding:24px 0}.service{grid-template-columns:28px minmax(0,1fr);gap:16px}.service>div{grid-column:2}.steps{grid-template-columns:1fr;gap:8px}.method{margin-top:40px}footer{padding:20px 16px}}`;
function shell(lang, body) {
  const t=words[lang];
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>STRATEGY — MAZED PRODUCTION</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"><style>${css}</style></head><body><header><a href="/">MAZED PRODUCTION</a><nav><a href="/#services">${t.back}</a><a href="/strategy?lang=${lang==='fr'?'en':'fr'}">${lang==='fr'?'EN':'FR'}</a></nav></header>${body}</body></html>`;
}
function locked(lang, message='') {
  const t=words[lang];
  return shell(lang, `<main class="wrap"><div class="lock"><span class="mono kicker">${t.client}</span><h1>STRATEGY</h1><p>${t.ask}</p><form method="post" action="/strategy?lang=${lang}"><label class="mono" for="code">${t.label}</label><input id="code" name="code" type="password" autocomplete="current-password" maxlength="256" required aria-describedby="error"><button class="primary" type="submit">${t.enter}</button><p id="error" class="error" role="status">${escape(message)}</p></form><a class="help mono" href="mailto:contact@mazedproduction.com">${t.help}</a></div></main>`);
}
function privatePage(lang) {
  const t=words[lang];
  const services=t.services.map((item,i)=>`<article class="service"><span class="mono">${String(i+1).padStart(2,'0')}</span><h2>${escape(item[0])}</h2><div><p>${escape(item[1])}</p><small>${t.deliver}</small><p class="deliver">${escape(item[2])}</p></div></article>`).join('');
  const steps=t.steps.map(item=>`<article><h3>${escape(item[0])}</h3><p>${escape(item[1])}</p></article>`).join('');
  return shell(lang, `<main class="wrap"><span class="mono kicker">${t.client} / 01</span><h1>STRATEGY</h1><p class="intro">${t.intro}</p><p class="lead">${t.lead}</p><section class="services" aria-label="Strategy">${services}</section><section class="method"><h2>${t.method}</h2><div class="steps">${steps}</div><p class="note">${t.note}</p></section></main><section class="cta"><div><h2>${t.cta}</h2><a href="mailto:contact@mazedproduction.com">${t.discuss}</a></div></section><footer><span class="mono">©2023 MAZEDPRODUCTION. ALL RIGHTS RESERVED</span><form method="post" action="/strategy?lang=${lang}"><input type="hidden" name="action" value="logout"><button class="signout">${t.logout}</button></form></footer>`);
}
function reply(body, status=200, extra={}) {
  return new Response(body,{status,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'private, no-store, max-age=0','Vercel-CDN-Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow, noarchive','X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin','Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",...extra}});
}
export default {
  async fetch(request) {
    const url=new URL(request.url);
    const lang=url.searchParams.get('lang')==='fr'?'fr':'en';
    const secret=process.env.STRATEGY_ACCESS_CODE;
    if(!['GET','HEAD','POST'].includes(request.method)) return reply('',405,{'Allow':'GET, HEAD, POST'});
    if (!secret || secret.length<16) return reply(request.method==='HEAD'?null:locked(lang,words[lang].pending),503);
    if(request.method==='POST') {
      const origin=request.headers.get('origin');
      if(!origin || origin!==url.origin) return reply(locked(lang,words[lang].invalid),403);
      const type=request.headers.get('content-type')||'';
      if(!type.startsWith('application/x-www-form-urlencoded')) return reply('',415);
      const body=await request.text();
      if(body.length>2048) return reply('',413);
      const form=new URLSearchParams(body);
      if(form.get('action')==='logout') return reply(null,303,{'Location':'/strategy?lang='+lang,'Set-Cookie':COOKIE+'=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'});
      const code=form.get('code')||'';
      if(code.length>256 || !equal(code,secret)) return reply(locked(lang,words[lang].invalid),401);
      return reply(null,303,{'Location':'/strategy?lang='+lang,'Set-Cookie':COOKIE+'='+session(secret)+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age='+TTL});
    }
    const allowed=authenticated(request.headers.get('cookie'),secret);
    return reply(request.method==='HEAD'?null:(allowed?privatePage(lang):locked(lang)));
  }
};

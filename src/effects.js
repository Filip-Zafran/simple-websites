import {languages,translator} from './content.js';
export const effects = [
 ['grow',['Hover grow','Beim Überfahren vergrößern','Povećanje pri prelasku']],
 ['lift',['Hover lift','Beim Überfahren anheben','Podizanje pri prelasku']],
 ['highlight',['Highlight','Hervorheben','Isticanje']],
 ['glow',['Soft glow','Sanftes Leuchten','Blagi sjaj']],
 ['fade',['Fade in','Einblenden','Postupno pojavljivanje']],
 ['fly',['Fly in','Hereinfliegen','Ulijetanje']],
 ['slide',['Slide up','Nach oben gleiten','Klizanje prema gore']],
 ['zoom',['Zoom in','Heranzoomen','Približavanje']],
 ['bounce',['Gentle bounce','Sanftes Hüpfen','Blagi odskok']],
 ['pulse',['Pulse','Pulsieren','Pulsiranje']],
 ['tilt',['Tilt','Neigen','Naginjanje']],
 ['rotate',['Rotate in','Hereindrehen','Pojavljivanje uz rotaciju']],
 ['reveal',['Wipe reveal','Schrittweise aufdecken','Postupno otkrivanje']],
 ['border',['Animated border','Animierter Rahmen','Animirani obrub']],
 ['press',['Button press','Tastendruck','Pritisak gumba']],
 ['float',['Float','Schweben','Lebdenje']]
];
export function renderEffects(lang){
 const t=translator(lang),i=languages.indexOf(lang);
 return `<fieldset class="effects-picker"><legend>${t('effectsTitle')}</legend><p class="hint">${t('effectsIntro')}</p><div class="effect-options">${effects.map(([id,names],index)=>`<div class="effect-option"><button type="button" data-effect="${id}" aria-pressed="${index===0}" aria-controls="effect-preview">${names[i]}</button><label title="${t('effectInclude')}"><input type="checkbox" name="effects" value="${id}" aria-label="${t('effectInclude')}: ${names[i]}"><span aria-hidden="true">+</span></label></div>`).join('')}</div><div class="effect-preview" id="effect-preview"><div class="effect-preview-heading"><b id="effect-name" aria-live="polite">${effects[0][1][i]}</b><button type="button" class="small-button" id="effect-replay">↻ ${t('effectReplay')}</button></div><p class="hint">${t('effectTry')}</p><div class="effect-stage"><button type="button" class="effect-sample" data-demo="grow"><span class="effect-sample-icon" aria-hidden="true">✦</span><strong>${t('effectSample')}</strong><span>${t('effectSampleHint')}</span></button></div><p class="hint effect-reduced">${t('effectReduced')}</p></div><p class="hint" id="effect-selection" role="status">${t('effectNone')}</p></fieldset>`;
}
export function initEffects(form,lang){
 const t=translator(lang),i=languages.indexOf(lang),sample=form.querySelector('.effect-sample');
 function play(){sample.classList.remove('effect-playing');void sample.offsetWidth;sample.classList.add('effect-playing')}
 function preview(id){sample.dataset.demo=id;form.querySelector('#effect-name').textContent=effects.find(effect=>effect[0]===id)[1][i];form.querySelectorAll('[data-effect]').forEach(button=>button.setAttribute('aria-pressed',button.dataset.effect===id));play()}
 form.querySelectorAll('[data-effect]').forEach(button=>button.addEventListener('click',()=>preview(button.dataset.effect)));
 form.querySelectorAll('[name=effects]').forEach(input=>input.addEventListener('change',()=>{
  if(input.checked)preview(input.value);
  const selected=[...form.querySelectorAll('[name=effects]:checked')].map(input=>effects.find(effect=>effect[0]===input.value)[1][i]);
  form.querySelector('#effect-selection').textContent=selected.length?`${t('effectSelected')}: ${selected.join(', ')}`:t('effectNone');
 }));
 form.querySelector('#effect-replay').addEventListener('click',play);
 sample.addEventListener('pointerenter',play);sample.addEventListener('focus',play);sample.addEventListener('click',play);
}

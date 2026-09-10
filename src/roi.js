const copy={
 title:['When does a custom website pay off?','Wann lohnt sich eine individuelle Website?','Kada se isplati prilagođena stranica?'],
 intro:['Compare total costs over time. Change the example figures to match your quote and subscription.','Vergleiche die Gesamtkosten über die Zeit. Passe die Beispielwerte an dein Angebot und dein Abonnement an.','Usporedi ukupne troškove kroz vrijeme. Prilagodi primjere svojoj ponudi i pretplati.'],
 build:['Development · € once','Entwicklung · € einmalig','Izrada · € jednokratno'],
 hosting:['Custom hosting · €/month','Individuelles Hosting · €/Monat','Prilagođeni hosting · €/mjesečno'],
 maintenance:['Maintenance · €/month','Wartung · €/Monat','Održavanje · €/mjesečno'],
 customDomain:['Custom domain · €/year','Eigene Domain · €/Jahr','Vlastita domena · €/godišnje'],
 builder:['Builder subscription · €/year','Baukasten-Abo · €/Jahr','Pretplata na alat · €/godišnje'],
 builderDomain:['Builder domain · €/year','Baukasten-Domain · €/Jahr','Domena uz alat · €/godišnje'],
 months:['Period · months','Zeitraum · Monate','Razdoblje · mjeseci'],
 custom:['Custom website','Individuelle Website','Prilagođena stranica'],
 subscription:['Website builder','Website-Baukasten','Alat za izradu stranica'],
 axis:['Months','Monate','Mjeseci'],
 total:['Cumulative cost (€)','Kumulierte Kosten (€)','Kumulativni trošak (€)'],
 breakEven:['Break-even','Kostengleichheit','Točka pokrića'],
 month:['months','Monate','mjeseci'],
 never:['No break-even at these costs','Keine Amortisation bei diesen Kosten','Nema povrata uz ove troškove'],
 immediate:['Already cheaper at the start','Bereits zu Beginn günstiger','Jeftinije već na početku'],
 equal:['Same costs throughout','Durchgehend gleiche Kosten','Jednaki troškovi kroz cijelo razdoblje'],
 savings:['Net savings over this period','Nettoersparnis im Zeitraum','Neto ušteda u ovom razdoblju'],
 extra:['Extra cost over this period','Mehrkosten im Zeitraum','Dodatni trošak u ovom razdoblju'],
 roi:['Cost-saving ROI','ROI durch Kostenersparnis','ROI na temelju uštede'],
 undefined:['Not applicable with €0 development','Bei 0 € Entwicklung nicht anwendbar','Nije primjenjivo uz izradu od 0 €'],
 assumptions:['Example, not a guaranteed return. The €486/year subscription is the estimate from the comparison above, not a live quote. Both options must provide equivalent features. Costs are spread evenly by month; annual prepayments, taxes, future changes and revenue or time savings are not modelled. Use prices on the same tax basis.','Beispiel, keine garantierte Rendite. Das Abo für 486 €/Jahr ist der Schätzwert aus dem Vergleich oben, kein aktuelles Angebot. Beide Optionen müssen gleichwertige Funktionen bieten. Kosten werden gleichmäßig auf Monate verteilt; jährliche Vorauszahlungen, Steuern, spätere Änderungen sowie Umsatz- oder Zeitgewinne werden nicht modelliert. Preise auf derselben Steuerbasis verwenden.','Primjer, a ne zajamčeni povrat. Pretplata od 486 €/godišnje procjena je iz gornje usporedbe, a ne aktualna ponuda. Obje opcije moraju nuditi jednake funkcije. Troškovi su ravnomjerno raspoređeni po mjesecima; godišnje pretplate, porezi, buduće izmjene te ušteda vremena ili dodatni prihod nisu modelirani. Koristi cijene na istoj poreznoj osnovi.'],
 formula:['Monthly savings = builder recurring costs − custom recurring costs. Break-even = development ÷ monthly savings. ROI = (recurring savings over the period − development) ÷ development × 100.','Monatliche Ersparnis = laufende Baukastenkosten − laufende individuelle Kosten. Amortisation = Entwicklung ÷ monatliche Ersparnis. ROI = (laufende Ersparnis im Zeitraum − Entwicklung) ÷ Entwicklung × 100.','Mjesečna ušteda = tekući troškovi alata − tekući troškovi prilagođene stranice. Povrat = izrada ÷ mjesečna ušteda. ROI = (ušteda tekućih troškova u razdoblju − izrada) ÷ izrada × 100.'],
 details:['Calculation details','Berechnungsdetails','Detalji izračuna'],
 recurring:['Recurring costs / month','Laufende Kosten / Monat','Tekući troškovi / mjesečno'],
 invalid:['Enter non-negative amounts and a period from 1 to 120 months.','Gib nicht negative Beträge und einen Zeitraum von 1 bis 120 Monaten ein.','Unesi nenegativne iznose i razdoblje od 1 do 120 mjeseci.']
};
const defaults={build:500,hosting:7.5,maintenance:10,customDomain:15,builder:486,builderDomain:15,months:60};
function translate(lang){const i=['en','de','hr'].indexOf(lang);return key=>copy[key][i]}
export function calculateRoi(v){
 const customMonthly=v.hosting+v.maintenance+v.customDomain/12;
 const builderMonthly=(v.builder+v.builderDomain)/12;
 const monthlySavings=builderMonthly-customMonthly;
 const customTotal=v.build+customMonthly*v.months,builderTotal=builderMonthly*v.months;
 const savings=builderTotal-customTotal;
 return {customMonthly,builderMonthly,monthlySavings,customTotal,builderTotal,savings,breakEven:monthlySavings>0?v.build/monthlySavings:null,roi:v.build>0?savings/v.build*100:null};
}
const locale=lang=>({en:'en-IE',de:'de-DE',hr:'hr-HR'}[lang]);
function output(v,lang){
 const t=translate(lang),r=calculateRoi(v),money=n=>new Intl.NumberFormat(locale(lang),{style:'currency',currency:'EUR',maximumFractionDigits:2}).format(n),num=n=>new Intl.NumberFormat(locale(lang),{maximumFractionDigits:1}).format(n);
 const crossing=r.breakEven===null?(v.build===0&&r.monthlySavings===0?t('equal'):t('never')):r.breakEven===0?t('immediate'):`${num(r.breakEven)} ${t('month')}`;
 const w=760,h=340,left=78,right=25,top=30,bottom=52,max=Math.max(r.customTotal,r.builderTotal,1)*1.12;
 const x=m=>left+m/v.months*(w-left-right),y=cost=>h-bottom-cost/max*(h-top-bottom);
 const line=(start,monthly)=>`M ${x(0)} ${y(start)} L ${x(v.months)} ${y(start+monthly*v.months)}`;
 const ticks=Array.from({length:5},(_,i)=>{const cost=max*i/4,month=v.months*i/4;return `<line x1="${left}" x2="${w-right}" y1="${y(cost)}" y2="${y(cost)}" stroke="#dce3ed"/><text x="${left-12}" y="${y(cost)+5}" text-anchor="end">${Math.round(cost)}</text><text x="${x(month)}" y="${h-bottom+25}" text-anchor="middle">${num(month)}</text>`}).join('');
 const marker=r.breakEven!==null&&r.breakEven>0&&r.breakEven<=v.months?`<line x1="${x(r.breakEven)}" x2="${x(r.breakEven)}" y1="${top}" y2="${h-bottom}" stroke="#586775" stroke-dasharray="5 5"/><circle cx="${x(r.breakEven)}" cy="${y(r.builderMonthly*r.breakEven)}" r="7" fill="#fff" stroke="#071a2b" stroke-width="3"/>`:'';
 return `<div class="roi-metrics"><div><span>${t('breakEven')}</span><strong>${crossing}</strong></div><div><span>${t(r.savings>=0?'savings':'extra')}</span><strong>${money(Math.abs(r.savings))}</strong></div><div><span>${t('roi')}</span><strong>${r.roi===null?t('undefined'):num(r.roi)+'%'}</strong></div></div><div class="roi-chart-legend"><span class="custom-line">${t('custom')}: <b>${money(r.customTotal)}</b></span><span class="builder-line">${t('subscription')}: <b>${money(r.builderTotal)}</b></span></div><div class="roi-chart-scroll"><svg class="roi-chart" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="roi-chart-title roi-chart-desc"><title id="roi-chart-title">${t('total')}</title><desc id="roi-chart-desc">${v.months} ${t('month')}. ${t('custom')}: ${money(r.customTotal)}. ${t('subscription')}: ${money(r.builderTotal)}. ${t('breakEven')}: ${crossing}.</desc>${ticks}<path d="${line(0,r.builderMonthly)}" fill="none" stroke="#b62968" stroke-width="4" stroke-dasharray="9 6"/><path d="${line(v.build,r.customMonthly)}" fill="none" stroke="#0874dd" stroke-width="4"/>${marker}<text x="${left}" y="18">${t('total')}</text><text x="${(left+w-right)/2}" y="${h-4}" text-anchor="middle">${t('axis')}</text></svg></div><p class="roi-recurring">${t('recurring')}: ${t('custom')} ${money(r.customMonthly)} · ${t('subscription')} ${money(r.builderMonthly)}</p><details class="roi-formula"><summary>${t('details')} <span>+</span></summary><p>${t('formula')}</p><p>${money(v.build)} ÷ (${money(r.builderMonthly)} − ${money(r.customMonthly)}) ${r.breakEven!==null?'= '+num(r.breakEven)+' '+t('month'):': '+t('never')}</p></details>`;
}
export function renderRoi(lang){const t=translate(lang);return `<section class="roi-calculator" aria-labelledby="roi-heading"><h3 id="roi-heading">${t('title')}</h3><p>${t('intro')}</p><div class="roi-inputs">${Object.entries(defaults).map(([key,value])=>`<label>${t(key)}<input data-roi="${key}" type="number" value="${value}" min="${key==='months'?1:0}" ${key==='months'?'max="120" step="1"':'max="1000000" step="0.01"'} required inputmode="decimal"></label>`).join('')}</div><p id="roi-error" role="alert" hidden>${t('invalid')}</p><div id="roi-output" aria-live="polite">${output(defaults,lang)}</div><p class="roi-assumptions">${t('assumptions')}</p></section>`}
export function initRoi(lang){const root=document.querySelector('.roi-calculator');if(!root)return;root.addEventListener('input',()=>{const inputs=[...root.querySelectorAll('[data-roi]')],valid=inputs.every(input=>input.checkValidity()&&Number.isFinite(input.valueAsNumber));root.querySelector('#roi-error').hidden=valid;root.querySelector('#roi-output').hidden=!valid;if(valid)root.querySelector('#roi-output').innerHTML=output(Object.fromEntries(inputs.map(input=>[input.dataset.roi,input.valueAsNumber])),lang)})}

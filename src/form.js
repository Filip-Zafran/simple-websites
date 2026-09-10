import {pageTemplates} from './page-templates.js';
import {translator,palettes,languages} from './content.js';
import {renderPageFields,renderImageUrlRow} from './components.js';
export function initForm(lang){
 const t=translator(lang), form=document.getElementById('request-form'), $=s=>form.querySelector(s), $$=s=>[...form.querySelectorAll(s)];
 let step=0,pageId=1,dirty=false;
 const local=document.documentElement.dataset.formBackend!=='netlify';
 const error=$('#form-error'),status=$('#form-status');
 form.noValidate=true;
 form.addEventListener('input',()=>{dirty=true});
 window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});
 function updatePages(){const pages=$$('.page-fields');pages.forEach((p,i)=>{p.querySelector('.page-number').textContent=i+1;p.querySelector('[data-move="-1"]').disabled=i===0;p.querySelector('[data-move="1"]').disabled=i===pages.length-1;p.querySelector('[data-remove]').disabled=pages.length===1})}
 function showStep(n){step=n;$$('.form-step').forEach((el,i)=>el.hidden=i!==n);document.querySelectorAll('.form-progress li').forEach((el,i)=>{if(i===n)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current')});$('#form-back').hidden=n===0;$('#form-next').hidden=n===4;$('#form-submit').hidden=n!==4;$('#step-count').textContent=`${n+1} / 5`;$('#local-notice').hidden=!local;$('#download-request').hidden=n!==4;error.textContent='';const title=$(`[data-step="${n}"] h2`);title.tabIndex=-1;title.focus();}
 function languageCount(){return $$('[name=websiteLanguages]:checked').filter(x=>x.value!=='other').length+($('[name=websiteLanguages][value=other]').checked?$('[name=otherLanguages]').value.split(/[,;\n]+/).filter(x=>x.trim()).length:0)}
 function validate(n){
  error.textContent='';
  const panel=$(`[data-step="${n}"]`);
  for(const el of panel.querySelectorAll('input,textarea')){
   el.setCustomValidity('');
   if(el.hasAttribute('data-urls')&&el.value.trim()) {try{for(const line of el.value.trim().split(/\n/)){if(!line.trim())continue;const url=new URL(line.trim());if(!['http:','https:'].includes(url.protocol))throw Error()}}catch{el.setCustomValidity(t('urlsError'))}}
   if(!el.checkValidity()){el.reportValidity();return false}
  }
  if(n===2&&$('[name=siteType]:checked').value==='simple'&&languageCount()>2){error.textContent=t('validationLang');return false}
  if(n===3){const files=$$('input[type=file]').flatMap(i=>[...i.files]);if(files.length>20||files.some(f=>!['image/png','image/jpeg','image/webp','image/gif'].includes(f.type)||f.size>5*1024*1024)||files.reduce((s,f)=>s+f.size,0)>8*1024*1024){error.textContent=t('fileError');return false}}
  return true;
 }
 $('#form-next').addEventListener('click',()=>{if(validate(step))showStep(step+1)});
 $('#form-back').addEventListener('click',()=>showStep(step-1));
 function conditions(){const otherLanguage=$('[name=websiteLanguages][value=other]').checked;$('#other-language').hidden=!otherLanguage;$('[name=otherLanguages]').required=otherLanguage;$('[name=otherLanguages]').disabled=!otherLanguage;const features=$$('[name=features]:checked').map(x=>x.value);$('#other-feature').hidden=!features.includes('other');$('[name=otherFeatures]').disabled=!features.includes('other');$('#complex-notice').hidden=!features.some(x=>['booking','crm','login','payments','database','calendar'].includes(x));}
 form.addEventListener('change',conditions);
 $('#add-page').addEventListener('click',()=>{$('#page-list').insertAdjacentHTML('beforeend',renderPageFields(lang,pageId++));updatePages();dirty=true;$$('.page-fields').at(-1).querySelector('input').focus()});
 for(const button of $$('[data-page-template]'))button.addEventListener('click',()=>{
  const template=pageTemplates.find(item=>item.id===button.dataset.pageTemplate),index=languages.indexOf(lang),id=pageId++;
  $('#page-list').insertAdjacentHTML('beforeend',renderPageFields(lang,id,template.name[index]));
  const page=$$('.page-fields').at(-1);
  page.querySelector(`[name="page-${id}-purpose"]`).value=template.purpose[index];
  page.querySelector(`[name="page-${id}-headline"]`).value=template.name[index];
  page.querySelector(`[name="page-${id}-content"]`).value=template.content[index];
  page.querySelector(`[name="page-${id}-content"]`).rows=10;
  if(['privacy','imprint'].includes(template.id)){
   const hint=document.createElement('p');hint.className='hint';hint.textContent=t('legalTemplateHint');
   page.querySelector(`[name="page-${id}-content"]`).before(hint);
  }
  updatePages();dirty=true;page.querySelector('input').focus();
 });
 $('#page-list').addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;const page=button.closest('.page-fields');if(button.hasAttribute('data-remove'))page.remove();else if(button.dataset.move==='-1'&&page.previousElementSibling)page.previousElementSibling.before(page);else if(button.dataset.move==='1'&&page.nextElementSibling)page.nextElementSibling.after(page);updatePages();dirty=true});

 function clearPalette(){for(const button of $$('[data-palette]'))button.setAttribute('aria-pressed','false')}
 function addColor(value='#1687f8'){
  const row=document.createElement('div');row.className='color-row';
  row.innerHTML=`<input type="color" value="${value}" aria-label="${t('colors')}"><input type="text" name="colors" value="${value}" pattern="#[0-9a-fA-F]{6}" aria-label="${t('hex')}" maxlength="7"><button type="button">${t('remove')}</button>`;
  const picker=row.querySelector('[type=color]'),hex=row.querySelector('[type=text]');
  picker.addEventListener('input',()=>{hex.value=picker.value;clearPalette()});
  hex.addEventListener('input',()=>{if(/^#[0-9a-f]{6}$/i.test(hex.value))picker.value=hex.value;clearPalette()});
  row.querySelector('button').addEventListener('click',()=>{row.remove();clearPalette();dirty=true});
  $('#color-list').append(row);
 }
 $('#add-color').addEventListener('click',()=>{addColor();clearPalette();dirty=true});
 for(const button of $$('[data-palette]'))button.addEventListener('click',()=>{
  $('#color-list').replaceChildren();palettes[Number(button.dataset.palette)].forEach(addColor);clearPalette();button.setAttribute('aria-pressed','true');dirty=true;
 });
 form.addEventListener('click',event=>{
  const add=event.target.closest('[data-add-url]'),remove=event.target.closest('[data-remove-url]');
  if(add){const group=add.closest('.image-url-group');group.querySelector('.image-url-list').insertAdjacentHTML('beforeend',renderImageUrlRow(lang,group.dataset.urlName));group.querySelector('.image-url-row:last-child input').focus();dirty=true}
  if(remove){const group=remove.closest('.image-url-group'),row=remove.closest('.image-url-row');if(group.querySelectorAll('.image-url-row').length===1){row.querySelector('input').value='';row.querySelector('input').focus()}else{row.remove();group.querySelector('input').focus()}dirty=true}
 });

 function payload(){const data=new FormData(form),result={language:lang,pages:[],files:[]};for(const [key,value] of data){if(value instanceof File){if(value.name)result.files.push({field:key,name:value.name,size:value.size,type:value.type});continue}if(key.startsWith('page-')||['form-name','company-url'].includes(key))continue;if(['features','websiteLanguages','colors','imageUrls'].includes(key)){if(value.trim())(result[key]??=[]).push(value)}else result[key]=value}
  for(const page of $$('.page-fields')){const entry={};for(const el of page.querySelectorAll('input,textarea')){const key=el.name.replace(/^page-\d+-/,'');if(key==='imageUrls'){if(el.value.trim())(entry.imageUrls??=[]).push(el.value.trim())}else entry[key]=el.type==='file'?[...el.files].map(f=>f.name):el.value}result.pages.push(entry)}return result;
 }
 function download(){const blob=new Blob([JSON.stringify(payload(),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='website-request.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent=t('saved')}
 $('#download-request').addEventListener('click',download);
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(step<4){if(validate(step))showStep(step+1);return}
  for(let i=0;i<5;i++){showStep(i);if(!validate(i))return}showStep(4);
  if(local){$('#local-notice').hidden=false;download();return}
  const submit=$('#form-submit');submit.disabled=true;submit.textContent=t('submitting');
  try{const data=new FormData();data.set('form-name','website-request');data.set('company-url',$('[name=company-url]').value);data.set('name',$('[name=name]').value);data.set('email',$('[name=email]').value);data.set('request',JSON.stringify(payload()));let index=0;for(const input of $$('input[type=file]'))for(const file of input.files)data.append(`attachment-${index++}`,file);if(index>20)throw new Error('Too many attachments');const response=await fetch('/',{method:'POST',body:data});if(!response.ok)throw new Error('Submission failed');dirty=false;form.innerHTML=`<div class="success-panel" role="status"><h2>${t('thanks')}</h2></div>`;
  }catch{error.textContent=t('failure');submit.disabled=false;submit.textContent=t('submit')}
 });
 updatePages();conditions();$('#local-notice').hidden=!local;
}

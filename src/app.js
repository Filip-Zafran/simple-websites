import {renderPage,pageTitle} from './components.js';
import {initForm} from './form.js';
import {languages,translator} from './content.js';
const params=new URLSearchParams(location.search);
const lang=languages.includes(params.get('lang'))?params.get('lang'):'en';
const route=location.pathname.replace(/^\/+|\/+$/g,'');
if(lang!=='en') document.getElementById('app').innerHTML=renderPage(route,lang);
document.documentElement.lang=lang;
const t=translator(lang);
document.title=`${pageTitle(route,lang)||t('nav').split('|')[0]} · I Build Cheap Simple Websites Fast`;
document.querySelector('meta[name="description"]').content=route==='complex-sites'?t('complexIntro'):t('intro');
const menu=document.querySelector('.menu-button');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);document.getElementById('navigation').classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.click();menu.focus()}});
if(route==='apply') initForm(lang);

const languageDropdowns=[...document.querySelectorAll('.language-dropdown')];
for(const dropdown of languageDropdowns){
 dropdown.addEventListener('toggle',()=>{if(dropdown.open)for(const other of languageDropdowns)if(other!==dropdown)other.open=false});
 dropdown.addEventListener('keydown',event=>{if(event.key==='Escape'){dropdown.open=false;dropdown.querySelector('summary').focus();event.stopPropagation()}});
 dropdown.addEventListener('focusout',event=>{if(!dropdown.contains(event.relatedTarget))dropdown.open=false});
}
document.addEventListener('click',event=>{for(const dropdown of languageDropdowns)if(!dropdown.contains(event.target))dropdown.open=false});

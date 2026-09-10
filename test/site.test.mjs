import test from 'node:test';
import assert from 'node:assert/strict';
import {copy,languages,translator} from '../src/content.js';
import {renderPage,routes,renderPageFields} from '../src/components.js';
test('every translation contains English, German and Croatian',()=>{for(const [key,value] of Object.entries(copy)){assert.equal(value.length,3,key);assert.ok(value.every(v=>typeof v==='string'&&v.trim()),key);if(value[0].includes('|'))assert.ok(value.every(v=>v.split('|').length===value[0].split('|').length),key)}});
test('every page renders in every language with shared navigation',()=>{for(const lang of languages)for(const route of routes){const html=renderPage(route,lang);assert.equal((html.match(/<h1>/g)||[]).length,1);assert.ok(html.includes('<footer>'));assert.ok(html.includes(`?lang=${lang}`));assert.ok(!html.includes('undefined'));assert.ok(html.includes(translator(lang)('nav').split('|')[0]))}});
test('references and CRM offering are present in their requested categories',()=>{const home=renderPage('','en'),complex=renderPage('complex-sites','en');for(const url of ['https://filip-zafran.github.io/indigo/','https://filip-zafran.github.io/antonio-alac-fitness/','https://simona-eschweiler.vercel.app/'])assert.ok(home.includes(url));assert.ok(complex.includes('https://duck-playspace.onrender.com/'));assert.ok(complex.includes('CRM systems'));assert.ok(complex.includes('Booking systems'));assert.ok(renderPage('apply','en').includes('value="crm"'))});
test('form exposes required contact and consent and escapes page names',()=>{const html=renderPage('apply','en');assert.match(html,/<input\b(?=[^>]*name="email")(?=[^>]*type="email")(?=[^>]*\brequired\b)[^>]*>/);assert.match(html,/name="agreement" required/);assert.equal((html.match(/class="form-step"/g)||[]).length,5);assert.ok(renderPageFields('en',2,'<script>').includes('&lt;script&gt;'))});

test('GitHub project paths cover assets, routes and translated navigation',async()=>{
 const {routeFromPath}=await import('../src/site-paths.js');
 for(const lang of languages)for(const route of routes){
  const html=renderPage(route,lang,'/simple-websites');
  assert.ok(html.includes('src="/simple-websites/assets/logo.webp"'));
  for(const match of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g))assert.ok(match[1].startsWith('/simple-websites/'),match[1]);
  assert.equal(routeFromPath(`/simple-websites/${route}/`,'/simple-websites'),route);
 }
 assert.equal(routeFromPath('/apply/',''),'apply');
});

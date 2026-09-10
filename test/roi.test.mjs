import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateRoi,renderRoi} from '../src/roi.js';
const example={build:500,hosting:7.5,maintenance:10,customDomain:15,builder:486,builderDomain:15,months:60};
test('ROI includes development and both recurring domain costs',()=>{const r=calculateRoi(example);assert.equal(r.customMonthly,18.75);assert.equal(r.builderMonthly,41.75);assert.equal(r.customTotal,1625);assert.equal(r.builderTotal,2505);assert.equal(r.savings,880);assert.equal(r.roi,176);assert.ok(Math.abs(r.breakEven-500/23)<1e-9)});
test('break-even matches cumulative costs and handles unprofitable scenarios',()=>{const r=calculateRoi(example);assert.ok(Math.abs(example.build+r.customMonthly*r.breakEven-r.builderMonthly*r.breakEven)<1e-8);assert.equal(calculateRoi({...example,builder:100}).breakEven,null);assert.equal(calculateRoi({...example,builder:210}).breakEven,null);assert.equal(calculateRoi({...example,build:0}).roi,null);assert.ok(calculateRoi({...example,months:12}).savings<0)});
test('chart and controls render in all languages',()=>{for(const lang of ['en','de','hr']){const html=renderRoi(lang);assert.equal((html.match(/data-roi=/g)||[]).length,7);assert.ok(html.includes('<svg'));assert.ok(!html.includes('undefined'));assert.ok(html.includes('176%'))}});

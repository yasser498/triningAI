import test from "node:test"; import assert from "node:assert/strict";
const next=(current,total,direction)=>direction==="next"?Math.min(total-1,current+1):Math.max(0,current-1);
const score=(expected,actual)=>JSON.stringify([...expected].sort())===JSON.stringify([...actual].sort());
test("slide navigation stays within boundaries",()=>{assert.equal(next(0,5,"previous"),0);assert.equal(next(4,5,"next"),4);assert.equal(next(2,5,"next"),3)});
test("quiz scoring ignores multiple-answer order",()=>{assert.equal(score(["أ","ب"],["ب","أ"]),true);assert.equal(score(["أ"],["ب"]),false)});
test("progress is bounded",()=>{const p=(done,total)=>Math.round(done/total*100);assert.equal(p(0,10),0);assert.equal(p(10,10),100)});
test("backup shape rejects missing fields",()=>{const valid=x=>Boolean(x&&x.profile&&Array.isArray(x.completedSlides)&&x.settings);assert.equal(valid({}),false);assert.equal(valid({profile:{},completedSlides:[],settings:{}}),true)});

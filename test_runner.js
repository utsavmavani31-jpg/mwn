const fs = require('fs');
const path = require('path');
const { classify } = require('./classifier');

const largePath = path.join(__dirname,'templates_large.json');
if(!fs.existsSync(largePath)){
  console.error('templates_large.json not found. Place it in server/ directory.');
  process.exit(1);
}
const templates = JSON.parse(fs.readFileSync(largePath));

function generateTestCases(templates){
  const cases = [];
  templates.forEach(t => {
    const kws = t.keywords && t.keywords.length ? t.keywords : ['safety'];
    // create 3 variations
    for(let i=0;i<3;i++){
      const text = `I am ${i===0?'really ':''}${kws[0]} ${i===1?'right now':'soon'}.`;
      cases.push({id: t.id, expected: t.level, text});
    }
  });
  return cases;
}

const cases = generateTestCases(templates);
let correct = 0;
cases.forEach(c=>{
  const pred = classify(c.text);
  const ok = pred === c.expected;
  if(ok) correct++;
  console.log(`${ok? 'OK':'FAIL'} | expected=${c.expected} | pred=${pred} | text="${c.text}"`);
});
console.log('---');
console.log(`Accuracy: ${(correct/cases.length*100).toFixed(2)}% (${correct}/${cases.length})`);

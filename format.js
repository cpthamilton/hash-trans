const path = require('path');
const fs = require('fs-extra');

const fileName = process.argv[2];
const outFile = process.argv[3];

console.log(`In: ${fileName}, Out: ${outFile}`);

const filePath = path.resolve(__dirname, fileName);
const outPath = path.resolve(__dirname, outFile);

const fileContent = fs.readFileSync(filePath).toString();
const listItems = fileContent.split('\n');
const outItems = [];
listItems.forEach((item) => {
  if (item === 'list') {
    return;
  }
  const outItemParts = item.split(' ');
  const initCaps = outItemParts.map((part) => {
    const partLetters = part.split('');
    if (partLetters.length === 0 || !partLetters[0].match(/[a-z]/i)) {
      return '';
    }
    partLetters[0] = partLetters[0].toUpperCase();
    return partLetters.join('');
  });
  const words = initCaps.filter(w => w !== 'Domestic');
  const outItem = words.join('');
  outItems.push(outItem);
});

const filteredSet =[ ...new Set(outItems)];
const filtered = Array.from(filteredSet);

const rands = [];
for (let i = 0; i < (256 * 3); i++) {
  let rand;
  while (!rand) {
    rand = Math.floor(Math.random() * Math.floor(filtered.length));
    if (rands.includes(rand)) {
      rand = undefined;
    }
  }
  rands.push(rand);
}

const toInclude = rands.map(r => filtered[r]);

fs.writeFileSync(outPath, toInclude.join('\n'));

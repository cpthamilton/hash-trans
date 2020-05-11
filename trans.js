const path = require('path');
const fs = require('fs-extra');

const hash = process.argv[2];

const animals = fs.readFileSync(path.resolve(__dirname, 'animals-f.txt')).toString();
const adjectives = fs.readFileSync(path.resolve(__dirname, 'adjectives-f.txt')).toString();
const animalList = animals.split('\n');
const adjectiveList = adjectives.split('\n');

const parts = [];
for (let i = 0; i < (hash.length / 2); i++) {
  let part;
  if (hash.length > (i * 2) + 1) {
    part = `${hash[(i * 2)]}${hash[(i * 2) + 1]}`;
  } else {
    part = `${hash[(i * 2)]}`;
  }
  const partVal = parseInt(part, 16);
  if (hash.length > (i * 2) + 2) {
    parts.push(adjectiveList[partVal + (256 * i)]);
  } else {
    parts.push(animalList[partVal]);
  }
}
console.log(parts.join(''));


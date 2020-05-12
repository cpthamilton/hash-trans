const path = require('path');
const fs = require('fs-extra');

const hash = process.argv[2];

const animals = fs.readFileSync(path.resolve(__dirname, 'animals-f.txt')).toString();
const adjectives = fs.readFileSync(path.resolve(__dirname, 'adjectives-f.txt')).toString();
const animalList = animals.split('\n').map(a => a.trimEnd());
const adjectiveList = adjectives.split('\n').map(a => a.trimEnd());

if (!hash || hash.length === 0) {
  console.log(`Usage: node trans.js <hash>`);
  return;
}
try {
  parseInt(hash, 16);
} catch (err) {
  console.log(`Usage: node trans.js <hash>`);
  return;
}

const hashChunks = Math.floor(hash.length / 2);
const lastChunkOneDigit = hashChunks % 2;
let runningSum = 0;
const partVals = [];
for (let i = 0; i < hashChunks; i++) {
  const lastChunk = (i === hashChunks - 1);
  let hashPart;
  if (!lastChunk || !lastChunkOneDigit) {
    hashPart = `${hash[i * 2]}${hash[(i * 2) + 1]}`;
  } else {
    hashPart = `${hash[i * 2]}`;
  }
  const partVal = parseInt(hashPart, 16);
  runningSum += partVal;
  if (!lastChunk) {
    partVals.push(adjectiveList[(runningSum % adjectiveList.length)]);
  } else {
    partVals.push(animalList[runningSum % animalList.length]);
  }
}

console.log(partVals.join(''));

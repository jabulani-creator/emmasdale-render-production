const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk('./next-client/app');
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('export default')) {
     console.log(file);
     // fix it
     const newContent = content.replace(/export const ([A-Za-z0-9_]+) = \(\) => {/g, 'export default function $1() {');
     if (newContent !== content) {
        fs.writeFileSync(file, newContent);
     }
  }
});

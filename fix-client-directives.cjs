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

const files = walk('./next-client/components');
let modifiedCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (
    !content.includes('"use client"') && 
    !content.includes("'use client'") && 
    (content.includes('useState') || content.includes('useEffect') || content.includes('useContext') || content.includes('usePathname') || content.includes('useRouter') || content.includes('useAppContext'))
  ) {
    fs.writeFileSync(file, '"use client";\n\n' + content);
    modifiedCount++;
  }
});

console.log('Modified ' + modifiedCount + ' files.');

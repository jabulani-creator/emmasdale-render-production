const fs = require('fs');
const path = require('path');

const targetDirs = [
  'next-client/app',
  'next-client/components',
  'next-client/context',
  'next-client/utils'
];

function renameFilesInDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renameFilesInDir(fullPath);
    } else {
      if (fullPath.endsWith('.jsx')) {
        const newPath = fullPath.replace(/\.jsx$/, '.tsx');
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      } else if (fullPath.endsWith('.js') && !fullPath.includes('registry.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        // Check if file contains JSX
        const hasJSX = /<[a-zA-Z]+/.test(content) || /<\/[a-zA-Z]+>/.test(content) || /<>\s/.test(content);
        const newExt = hasJSX ? '.tsx' : '.ts';
        const newPath = fullPath.replace(/\.js$/, newExt);
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      }
    }
  }
}

targetDirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  renameFilesInDir(fullPath);
});

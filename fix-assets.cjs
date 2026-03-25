const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.jsx')) {
      let c = fs.readFileSync(p, 'utf8');
      let modified = false;
      
      if (c.includes('../assets')) {
        c = c.replace(/\.\.\/assets/g, '../app/assets');
        modified = true;
      }
      if (c.includes('../../assets')) {
        c = c.replace(/\.\.\/\.\.\/assets/g, '../../app/assets');
        modified = true;
      }
      if (c.includes('../../../assets')) {
        c = c.replace(/\.\.\/\.\.\/\.\.\/assets/g, '../../../app/assets');
        modified = true;
      }
      if (c.includes('../../../../assets')) {
        c = c.replace(/\.\.\/\.\.\/\.\.\/\.\.\/assets/g, '../../../../app/assets');
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(p, c);
        console.log('Updated: ' + p);
      }
    }
  });
}

walk('next-client/components');
walk('next-client/app/dashboard');
console.log('Finished updating asset paths');

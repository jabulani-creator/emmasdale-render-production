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
      
      // Replace import { Link } from 'react-router-dom' with import Link from 'next/link'
      if (c.includes('import { Link } from "react-router-dom"') || 
          c.includes("import { Link } from 'react-router-dom'")) {
        c = c.replace(/import\s+\{\s*Link\s*\}\s+from\s+["']react-router-dom["'];?/g, 'import Link from "next/link";');
        modified = true;
      }
      
      // Replace <Link to= with <Link href=
      if (c.includes('<Link to=')) {
        c = c.replace(/<Link\s+to=/g, '<Link href=');
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(p, c);
        console.log(`Updated: ${p}`);
      }
    }
  });
}

walk('next-client/components');
console.log('Done replacing Links');

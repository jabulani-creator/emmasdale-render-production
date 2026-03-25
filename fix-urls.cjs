const fs = require('fs');
let c = fs.readFileSync('next-client/context/appContext.js', 'utf8');
c = c.replace(/"\/api\/v1\//g, '"http://localhost:5000/api/v1/');
c = c.replace(/`\/api\/v1\//g, '`http://localhost:5000/api/v1/');
fs.writeFileSync('next-client/context/appContext.js', c);
console.log('Fixed API URLs');
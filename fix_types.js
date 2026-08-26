const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf-8');
content = content.replace('  weight?: string;', '  weight?: string;\n  material?: string;\n  application?: string;');
fs.writeFileSync('src/types.ts', content);

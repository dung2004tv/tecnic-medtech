const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const zip = new JSZip();

const excludeNames = new Set([
  'node_modules',
  'dist',
  '.git',
  'remix-tecnic-medical-store.zip',
  'tecnic-app-full.zip'
]);

function addFolderToZip(folderPath, zipFolder) {
  const items = fs.readdirSync(folderPath);
  for (const item of items) {
    if (excludeNames.has(item)) continue;
    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const subZip = zipFolder.folder(item);
      addFolderToZip(fullPath, subZip);
    } else {
      const fileData = fs.readFileSync(fullPath);
      zipFolder.file(item, fileData);
    }
  }
}

console.log('Packaging project into ZIP...');
addFolderToZip(__dirname, zip);

zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
  .then((content) => {
    fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
    fs.writeFileSync(path.join(__dirname, 'public', 'tecnic-app-full.zip'), content);
    fs.writeFileSync(path.join(__dirname, 'tecnic-app-full.zip'), content);
    console.log('Done! Generated tecnic-app-full.zip (' + (content.length / (1024 * 1024)).toFixed(2) + ' MB)');
  })
  .catch((err) => {
    console.error('Error generating zip:', err);
  });

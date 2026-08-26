import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function createZipArchive() {
  const zip = new JSZip();

  function addFolderToZip(folderPath, zipFolder) {
    const items = fs.readdirSync(folderPath);

    for (const item of items) {
      if (
        item === 'node_modules' ||
        item === 'dist' ||
        item === '.git' ||
        item === '.system_generated' ||
        item === 'tecnic-medtech-full-source.zip'
      ) {
        continue;
      }

      const fullPath = path.join(folderPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const nextZipFolder = zipFolder.folder(item);
        addFolderToZip(fullPath, nextZipFolder);
      } else {
        const fileData = fs.readFileSync(fullPath);
        zipFolder.file(item, fileData);
      }
    }
  }

  console.log('Archiving project files with JSZip...');
  addFolderToZip(process.cwd(), zip);

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outPath = path.join(publicDir, 'tecnic-medtech-full-source.zip');
  fs.writeFileSync(outPath, content);
  console.log(`✅ SUCCESS! Created ZIP archive: ${outPath} (${content.length} bytes)`);
}

createZipArchive().catch(err => {
  console.error('Error creating zip:', err);
  process.exit(1);
});

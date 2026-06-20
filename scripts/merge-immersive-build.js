#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'apps/immersive-portal/dist');
const PUBLIC = path.join(ROOT, 'public');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((entry) => {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    });
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

if (!fs.existsSync(DIST)) {
  console.error('Immersive build not found. Run: npm run build --prefix apps/immersive-portal');
  process.exit(1);
}

const indexSrc = path.join(DIST, 'index.html');
if (!fs.existsSync(indexSrc)) {
  console.error('dist/index.html missing');
  process.exit(1);
}

fs.copyFileSync(indexSrc, path.join(PUBLIC, 'index.html'));
console.log('  ✓ Merged index.html → public/');

const assetsSrc = path.join(DIST, 'assets/immersive');
const assetsDest = path.join(PUBLIC, 'assets/immersive');
if (fs.existsSync(assetsSrc)) {
  copyRecursive(assetsSrc, assetsDest);
  console.log('  ✓ Merged assets/immersive/ → public/');
}

console.log('Immersive build merge complete.');

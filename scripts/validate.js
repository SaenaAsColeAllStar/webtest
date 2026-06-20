#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const IMMERSIVE_SRC = path.join(ROOT, 'apps/immersive-portal/src');

const requiredFiles = [
  'index.html',
  'assets/logo-teknovo.png',
  'robots.txt',
  'sitemap.xml',
  'ppdb/index.html',
  'berita/index.html',
  'berita/pembukaan-ppdb-2026.html',
  'program/tkj.html',
  'program/rpl.html',
  'program/dkv.html',
  'portal/siswa.html',
  'portal/guru.html',
  'portal/orang-tua.html',
];

const immersiveSectionIds = [
  'future-starts-here',
  'industry-challenge',
  'teknik-mesin',
  'ulw',
  'industry-alignment',
  'student-transformation',
  'achievements',
  'ppdb',
  'faq',
  'kontak',
];

const immersiveSourceFiles = [
  'components/scenes/FutureStartsHereChapter.tsx',
  'components/scenes/IndustryChallengeChapter.tsx',
  'components/scenes/TeknikMesinChapter.tsx',
  'components/scenes/UsahaLayananWisataChapter.tsx',
  'components/scenes/IndustryAlignmentChapter.tsx',
  'components/scenes/StudentTransformationChapter.tsx',
  'components/scenes/AchievementsChapter.tsx',
  'components/scenes/PpdbChapter.tsx',
  'components/scenes/FaqChapter.tsx',
  'components/scenes/KontakChapter.tsx',
  'components/layout/Header.tsx',
  'App.tsx',
  'subpages/main.tsx',
  'subpages/content.ts',
  'lib/chapters.ts',
  'lib/model-manifest.ts',
];

const requiredNavLinks = [
  { link: "id: 'ppdb'", files: ['lib/chapters.ts', 'components/layout/Header.tsx'] },
  { link: "id: 'achievements'", files: ['lib/chapters.ts'] },
  { link: '#faq', files: ['components/layout/Header.tsx'] },
  { link: '#kontak', files: ['components/layout/Header.tsx'] },
  { link: 'portal/siswa.html', files: ['components/layout/Header.tsx'] },
  { link: 'ppdb/', files: ['App.tsx'] },
];

const forbiddenPatterns = [
  { pattern: /lucide/i, label: 'Lucide icons' },
  { pattern: /font-awesome|fontawesome/i, label: 'Font Awesome' },
  { pattern: /bootstrap/i, label: 'Bootstrap' },
];

let errors = [];

for (const file of requiredFiles) {
  const fullPath = path.join(PUBLIC, file);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required file: public/${file}`);
  }
}

const indexPath = path.join(PUBLIC, 'index.html');
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');

  if (!html.includes('id="root"')) {
    errors.push('Immersive SPA root (#root) missing in index.html');
  }

  if (!html.includes('application/ld+json')) {
    errors.push('JSON-LD schema missing');
  }

  for (const { pattern, label } of forbiddenPatterns) {
    if (pattern.test(html)) {
      errors.push(`Forbidden library detected: ${label}`);
    }
  }

  const immersiveAssets = path.join(PUBLIC, 'assets/immersive');
  if (!fs.existsSync(immersiveAssets)) {
    errors.push('Immersive build assets missing: public/assets/immersive/');
  } else {
    const assetFiles = fs.readdirSync(immersiveAssets);
    if (assetFiles.length === 0) {
      errors.push('Immersive assets directory is empty');
    }
  }
}

for (const srcFile of immersiveSourceFiles) {
  const fullPath = path.join(IMMERSIVE_SRC, srcFile);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing immersive source: apps/immersive-portal/src/${srcFile}`);
  }
}

for (const sectionId of immersiveSectionIds) {
  let found = false;
  const scenesDir = path.join(IMMERSIVE_SRC, 'components/scenes');
  if (fs.existsSync(scenesDir)) {
    fs.readdirSync(scenesDir).forEach(function (file) {
      const content = fs.readFileSync(path.join(scenesDir, file), 'utf8');
      if (content.includes(`id="${sectionId}"`)) {
        found = true;
      }
    });
  }
  if (!found) {
    errors.push(`Missing immersive chapter in source: id="${sectionId}"`);
  }
}

for (const { link, files } of requiredNavLinks) {
  let found = false;
  files.forEach(function (srcFile) {
    const fullPath = path.join(IMMERSIVE_SRC, srcFile);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(link)) found = true;
    }
  });
  if (!found) {
    errors.push(`Missing nav link in immersive source: ${link}`);
  }
}

const sitemapPath = path.join(PUBLIC, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const requiredUrls = ['/ppdb/', '/berita/', '/program/tkj.html'];
  requiredUrls.forEach(function (url) {
    if (!sitemap.includes(url)) {
      errors.push(`Sitemap missing URL: ${url}`);
    }
  });
}

if (errors.length > 0) {
  console.error('Build validation failed:\n');
  errors.forEach(function (err) {
    console.error('  ✗ ' + err);
  });
  process.exit(1);
}

console.log('Build validation passed.');
console.log('  ✓ All required files present');
console.log('  ✓ Immersive SPA shell verified');
console.log('  ✓ V2.1 chapters through Kontak in source');
console.log('  ✓ Multi-page structure verified');
console.log('  ✓ Immersive assets present');
console.log('  ✓ Design system compliance checks passed');

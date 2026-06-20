#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const requiredFiles = [
  'index.html',
  'css/styles.css',
  'css/pages.css',
  'js/main.js',
  'js/pages.js',
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

const requiredSections = [
  'id="beranda"',
  'id="program"',
  'id="keunggulan"',
  'id="fasilitas"',
  'id="tentang"',
  'id="prestasi"',
  'id="berita"',
  'id="ppdb"',
  'id="faq"',
  'id="kontak"',
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

  for (const section of requiredSections) {
    if (!html.includes(section)) {
      errors.push(`Missing section anchor: ${section}`);
    }
  }

  for (const { pattern, label } of forbiddenPatterns) {
    if (pattern.test(html)) {
      errors.push(`Forbidden library detected: ${label}`);
    }
  }

  if (!html.includes('@phosphor-icons/web')) {
    errors.push('Phosphor icons CDN not found in index.html');
  }

  if (!html.includes('application/ld+json')) {
    errors.push('JSON-LD schema missing');
  }

  if (!html.includes('href="portal/siswa.html"')) {
    errors.push('Portal login links not wired on homepage');
  }

  if (!html.includes('href="program/tkj.html"')) {
    errors.push('Program detail links not wired on homepage');
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
console.log('  ✓ All section anchors found');
console.log('  ✓ Multi-page structure verified');
console.log('  ✓ Design system compliance checks passed');

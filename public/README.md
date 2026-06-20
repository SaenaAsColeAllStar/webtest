# SMK TEKNOVO — Portal Website

Portal resmi **SMK Teknologi dan Vokasional Miftahul Huda Rancasari** (SMK TEKNOVO), Rancasari.

## Cara Menjalankan

### Opsi 1: Server lokal sederhana

```bash
cd /www/wwwroot/webtest/public
python3 -m http.server 8080
```

Buka browser: [http://localhost:8080](http://localhost:8080)

### Opsi 2: Langsung via web server

Jika direktori `public/` sudah dikonfigurasi sebagai document root (mis. Nginx/Apache di `/www/wwwroot/webtest/public`), akses langsung melalui domain atau IP server.

### Opsi 3: Buka file langsung

Buka `index.html` di browser (beberapa fitur mungkin terbatas tanpa HTTP server).

## Struktur

```
public/
├── index.html          # Halaman utama (single-page)
├── css/styles.css      # Stylesheet dengan CSS variables
├── js/main.js          # Interaktivitas (menu, tabs, form, animasi)
├── assets/
│   └── logo-teknovo.png
└── README.md
```

## Bagian Website

- **Beranda** — Hero, statistik, berita unggulan
- **Tentang Kami** — Visi, misi, sejarah, fasilitas
- **Program Keahlian** — TKJ, RPL, DKV
- **Berita & Pengumuman** — Tab berita dan pengumuman
- **Galeri** — Grid foto placeholder
- **Kontak** — Info kontak, formulir, peta placeholder

## Brand Colors (Teknovo Design System)

- Primary Blue: `#2563EB`
- Accent Sky: `#0EA5E9`
- Secondary Slate: `#334155`

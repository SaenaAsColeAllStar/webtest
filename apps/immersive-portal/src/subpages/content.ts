export type PageKey = 'ppdb' | 'berita-index' | 'berita-detail' | 'program';

export type ProgramSlug = 'tkj' | 'rpl' | 'dkv';

export interface NewsStory {
  slug: string;
  title: string;
  date: string;
  isoDate: string;
  category: string;
  excerpt: string;
  lead: string;
  readTime: string;
  href: string;
  spotlight: string;
}

export interface ProgramStory {
  slug: ProgramSlug;
  shortLabel: string;
  title: string;
  titleLong: string;
  description: string;
  industrySignal: string;
  heroLabel: string;
  accent: string;
  intro: string;
  outcomes: string[];
  curriculum: { title: string; text: string }[];
  studios: { title: string; text: string }[];
  careers: { role: string; text: string }[];
}

export const siteMeta = {
  schoolName: 'SMK TEKNOVO',
  schoolLongName: 'SMK Teknologi dan Vokasional Miftahul Huda Rancasari',
  ppdbEmail: 'ppdb@smkteknovo.sch.id',
  schoolEmail: 'info@smkteknovo.sch.id',
  phone: '+62 22 1234 5678',
  whatsapp: '0896-1234-5678',
  location: 'Rancasari, Kota Bandung',
};

export const ppdbTimeline = [
  {
    phase: 'Gelombang 1',
    date: '15 April - 30 Juni 2026',
    note: 'Prioritas kuota untuk pendaftar awal dan peminatan yang cepat penuh.',
  },
  {
    phase: 'Verifikasi Berkas',
    date: 'Maks. 3 hari kerja',
    note: 'Tim PPDB menghubungi calon siswa jika ada dokumen yang perlu dilengkapi.',
  },
  {
    phase: 'Pengumuman',
    date: '5 Juli 2026',
    note: 'Status diterbitkan melalui kanal resmi sekolah dan kontak pendaftar.',
  },
];

export const ppdbSteps = [
  {
    title: 'Pilih jalur dan program yang paling relevan',
    text: 'Bandingkan TKJ, RPL, dan DKV dari sisi alat kerja, ritme belajar, dan prospek karier sebelum mengisi formulir.',
  },
  {
    title: 'Siapkan berkas inti sejak awal',
    text: 'Rapor semester 1-5, Kartu Keluarga, akta kelahiran, dan pas foto membuat proses verifikasi lebih cepat.',
  },
  {
    title: 'Amankan kursi sebelum gelombang bergeser',
    text: 'Program dengan minat tinggi, terutama RPL, berpotensi menutup kuota lebih dulu.',
  },
];

export const ppdbRequirements = [
  'Fotokopi ijazah atau surat keterangan lulus',
  'Rapor semester 1 sampai 5',
  'Akta kelahiran dan Kartu Keluarga',
  'Pas foto 3x4 terbaru',
];

export const ppdbReasons = [
  {
    title: 'Belajar dekat dengan ritme industri',
    text: 'Materi diarahkan ke alat, proyek, dan kebiasaan kerja yang benar-benar dipakai di dunia profesional.',
  },
  {
    title: 'Tiga jalur masa depan yang jelas',
    text: 'TKJ untuk infrastruktur digital, RPL untuk rekayasa perangkat lunak, dan DKV untuk komunikasi visual yang bernilai komersial.',
  },
  {
    title: 'Arah karier dibahas sejak awal',
    text: 'Siswa tidak hanya belajar teori, tetapi memahami seperti apa output kerja, sertifikasi, dan peluang lanjutannya.',
  },
];

export const ppdbFaq = [
  {
    question: 'Apakah pendaftaran harus datang langsung ke sekolah?',
    answer:
      'Tidak. Jalur utama dimulai dari pengisian minat dan konsultasi secara online, lalu tim sekolah membantu langkah lanjutan sesuai kebutuhan calon siswa.',
  },
  {
    question: 'Bagaimana jika masih bingung memilih jurusan?',
    answer:
      'Mulai dari halaman program untuk melihat karakter kerja tiap jurusan. Setelah itu, hubungi panitia PPDB agar kami bantu mencocokkan minat, kekuatan, dan target karier.',
  },
  {
    question: 'Apakah ada tes seleksi tambahan?',
    answer:
      'Seleksi utama berbasis kelengkapan berkas, kecocokan minat, dan ketersediaan kuota. Program tertentu dapat menambahkan wawancara singkat bila diperlukan.',
  },
];

export const newsStories: NewsStory[] = [
  {
    slug: 'pembukaan-ppdb-2026',
    title: 'Pembukaan PPDB Tahun Ajaran 2026/2027',
    date: '15 April 2026',
    isoDate: '2026-04-15',
    category: 'PPDB',
    excerpt: 'Pendaftaran resmi dibuka untuk TKJ, RPL, dan DKV dengan fokus pada kesiapan kerja dan pendampingan jalur minat.',
    lead: 'Gelombang pertama dibuka dengan alur yang lebih jelas, konsultasi minat lebih cepat, dan penekanan kuat pada kecocokan program keahlian.',
    readTime: '4 menit baca',
    href: 'pembukaan-ppdb-2026.html',
    spotlight: 'Jalur pendaftaran kini disusun agar calon siswa dan orang tua lebih mudah menilai program yang paling sesuai sejak langkah pertama.',
  },
  {
    slug: 'lks-tkj',
    title: 'Tim TKJ Menguatkan Reputasi Lewat Ritme Kompetisi',
    date: '28 Maret 2026',
    isoDate: '2026-03-28',
    category: 'Prestasi',
    excerpt: 'Pendekatan lab, troubleshooting, dan disiplin dokumentasi menjadi fondasi kemenangan tim TKJ di ajang kompetensi.',
    lead: 'Prestasi tidak datang dari presentasi, tetapi dari kebiasaan kerja yang konsisten di ruang praktik.',
    readTime: '3 menit baca',
    href: '../index.html#proof',
    spotlight: 'Cerita ini mengarah kembali ke halaman utama karena liputan lengkapnya masih menjadi bagian dari chapter editorial prestasi.',
  },
  {
    slug: 'workshop-rpl',
    title: 'Workshop Industri 4.0 untuk Siswa RPL',
    date: '10 Maret 2026',
    isoDate: '2026-03-10',
    category: 'Kolaborasi Industri',
    excerpt: 'Siswa RPL diajak melihat bagaimana pengembangan perangkat lunak bekerja di luar kelas: sprint, review, dan deployment.',
    lead: 'Kolaborasi industri dipakai untuk menjembatani cara belajar sekolah dengan ritme kerja digital modern.',
    readTime: '3 menit baca',
    href: '../program/rpl.html',
    spotlight: 'Arah cerita berlanjut ke halaman program RPL untuk menunjukkan bagaimana workshop itu diterjemahkan ke kurikulum.',
  },
  {
    slug: 'studio-dkv',
    title: 'Studio DKV Menggeser Fokus dari Tugas ke Portofolio',
    date: '1 Maret 2026',
    isoDate: '2026-03-01',
    category: 'Program',
    excerpt: 'Latihan visual tidak berhenti pada penilaian kelas, tetapi diarahkan menjadi karya yang siap dipresentasikan ke klien dan kampus.',
    lead: 'Portofolio adalah bahasa profesional pertama yang harus dimiliki siswa DKV.',
    readTime: '3 menit baca',
    href: '../program/dkv.html',
    spotlight: 'Liputan ini diposisikan sebagai jembatan menuju halaman program DKV yang kini lebih naratif.',
  },
];

export const articleSections = [
  {
    heading: 'Apa yang berubah pada alur PPDB tahun ini',
    body:
      'Fokus utama PPDB 2026/2027 adalah memperjelas keputusan sejak awal. Calon siswa tidak diarahkan hanya untuk mengisi formulir, tetapi dibantu memahami perbedaan cara belajar, perangkat kerja, dan peluang lanjutan pada TKJ, RPL, dan DKV.',
  },
  {
    heading: 'Jadwal yang lebih mudah dipetakan',
    body:
      'Gelombang pertama dibuka pada 15 April hingga 30 Juni 2026. Setelah berkas masuk, tim sekolah menargetkan verifikasi maksimal tiga hari kerja agar komunikasi dengan orang tua tidak tertunda dan keputusan bisa dibuat lebih tenang.',
  },
  {
    heading: 'Berkas inti tetap sederhana, keputusan dibuat lebih cermat',
    body:
      'Dokumen yang disiapkan tetap meliputi rapor, identitas keluarga, dan pas foto. Perbedaannya ada pada kualitas konsultasi: sekolah ingin memastikan program yang dipilih memang paling dekat dengan minat dan potensi kerja calon siswa.',
  },
];

export const programs: Record<ProgramSlug, ProgramStory> = {
  tkj: {
    slug: 'tkj',
    shortLabel: 'TKJ',
    title: 'Teknik Komputer dan Jaringan',
    titleLong: 'Membangun infrastruktur digital yang tetap hidup ketika sistem lain berhenti.',
    description: 'Belajar jaringan, server, troubleshooting, dan keamanan dasar dengan cara berpikir operator lapangan dan engineer.',
    industrySignal: 'Infrastruktur, sistem, dan reliability',
    heroLabel: 'Program Infrastruktur Digital',
    accent: '#22D3EE',
    intro:
      'TKJ di SMK Teknovo diarahkan untuk siswa yang tertarik pada dunia perangkat, konektivitas, dan stabilitas sistem. Ritmenya dekat dengan ruang server, instalasi lapangan, dan pengambilan keputusan cepat saat gangguan terjadi.',
    outcomes: ['Jaringan LAN/WAN', 'Administrasi server', 'Troubleshooting', 'Keamanan dasar'],
    curriculum: [
      {
        title: 'Belajar dari alur sistem nyata',
        text: 'Siswa memetakan bagaimana perangkat, kabel, router, dan server saling menopang, bukan sekadar menghafal nama komponen.',
      },
      {
        title: 'Praktik dengan mindset reliability',
        text: 'Konfigurasi, pengujian, dan dokumentasi dijalankan seperti tim yang bertanggung jawab menjaga layanan tetap menyala.',
      },
    ],
    studios: [
      {
        title: 'Lab jaringan dan simulasi gangguan',
        text: 'Ruang praktik diposisikan sebagai pusat latihan untuk membaca topologi, mengisolasi masalah, dan memulihkan koneksi.',
      },
      {
        title: 'Ritme troubleshooting bertahap',
        text: 'Setiap proyek melatih ketelitian: mendeteksi masalah, memeriksa logika jaringan, lalu mengeksekusi perbaikan secara sistematis.',
      },
    ],
    careers: [
      {
        role: 'Network Technician',
        text: 'Menangani instalasi, perawatan, dan perbaikan perangkat jaringan di sekolah, kantor, atau penyedia layanan.',
      },
      {
        role: 'Junior System Support',
        text: 'Mendukung operasi server dan perangkat kerja harian dengan disiplin respon dan dokumentasi.',
      },
    ],
  },
  rpl: {
    slug: 'rpl',
    shortLabel: 'RPL',
    title: 'Rekayasa Perangkat Lunak',
    titleLong: 'Mendesain, membangun, dan menguji produk digital dengan logika kerja tim teknologi modern.',
    description: 'Belajar software engineering dari fondasi logika, antarmuka, basis data, hingga pengiriman produk yang bisa dipakai.',
    industrySignal: 'Produk digital, sistem, dan kolaborasi',
    heroLabel: 'Program Rekayasa Produk',
    accent: '#6366F1',
    intro:
      'RPL di SMK Teknovo bukan hanya jurusan coding. Ia dirancang sebagai jalur untuk memahami bagaimana produk digital direncanakan, dibangun, diuji, dan dirawat bersama tim.',
    outcomes: ['Frontend dan backend', 'Database', 'UI/UX dasar', 'Testing dan delivery'],
    curriculum: [
      {
        title: 'Berpikir seperti product builder',
        text: 'Siswa diajak membaca masalah, menyusun solusi, lalu menerjemahkannya menjadi antarmuka, logika, dan struktur data yang dapat dipelihara.',
      },
      {
        title: 'Belajar kolaborasi, bukan coding sendirian',
        text: 'Project mendorong pola kerja sprint, review, dan iterasi sehingga siswa memahami peran developer di tim yang lebih besar.',
      },
    ],
    studios: [
      {
        title: 'Studio build dan review',
        text: 'Ruang kerja diposisikan seperti meja produk: ada eksplorasi ide, implementasi, pengujian, lalu perbaikan cepat.',
      },
      {
        title: 'Portofolio yang berbicara',
        text: 'Setiap hasil belajar diarahkan menjadi artefak yang layak dipresentasikan ke industri, magang, atau kampus lanjutan.',
      },
    ],
    careers: [
      {
        role: 'Junior Web Developer',
        text: 'Membangun antarmuka dan layanan dasar untuk aplikasi internal maupun produk digital publik.',
      },
      {
        role: 'QA / Product Support',
        text: 'Menghubungkan kualitas fitur dengan kebutuhan pengguna lewat pengujian dan dokumentasi yang rapi.',
      },
    ],
  },
  dkv: {
    slug: 'dkv',
    shortLabel: 'DKV',
    title: 'Desain Komunikasi Visual',
    titleLong: 'Membentuk cara sebuah brand, pesan, dan pengalaman visual dibaca dalam hitungan detik.',
    description: 'Belajar sistem visual, tipografi, storytelling, dan produksi multimedia yang siap bertemu audiens nyata.',
    industrySignal: 'Brand, media, dan komunikasi visual',
    heroLabel: 'Program Sistem Visual',
    accent: '#F59E0B',
    intro:
      'DKV di SMK Teknovo diarahkan untuk siswa yang ingin membangun karya visual yang bernilai pakai. Fokusnya bukan hiasan, tetapi komunikasi yang jelas, kuat, dan relevan dengan kebutuhan pasar.',
    outcomes: ['Branding', 'Layout editorial', 'Motion dan video', 'Portofolio kreatif'],
    curriculum: [
      {
        title: 'Melatih sensitivitas visual yang strategis',
        text: 'Siswa mempelajari bagaimana warna, tipografi, ritme, dan komposisi mempengaruhi cara pesan diterima.',
      },
      {
        title: 'Karya diarahkan ke konteks nyata',
        text: 'Brief tidak berhenti pada tugas kelas, tetapi berkembang menjadi kampanye, identitas, dan presentasi yang mendekati kebutuhan klien.',
      },
    ],
    studios: [
      {
        title: 'Studio portofolio',
        text: 'Ruang kerja menjadi tempat eksperimen visual, kritik karya, dan penyusunan narasi portofolio yang matang.',
      },
      {
        title: 'Output lintas media',
        text: 'Siswa bergerak dari poster, layout, dan identitas visual menuju motion graphic dan konten digital yang lebih luas.',
      },
    ],
    careers: [
      {
        role: 'Graphic Designer',
        text: 'Mengerjakan identitas visual, materi promosi, dan kebutuhan desain brand dengan rasa visual yang terarah.',
      },
      {
        role: 'Content Visual Creator',
        text: 'Mengubah ide menjadi materi visual dan multimedia yang siap dipublikasikan di kanal digital.',
      },
    ],
  },
};

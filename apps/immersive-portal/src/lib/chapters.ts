/** PRD V2.1 eight-chapter spine — single source for nav, anchors, progress. */
export const CHAPTERS_V21 = [
  { id: 'future-starts-here', num: 1, label: 'Masa Depan', navLabel: 'Awal' },
  { id: 'industry-challenge', num: 2, label: 'Tantangan Industri', navLabel: 'Tantangan' },
  { id: 'teknik-mesin', num: 3, label: 'Teknik Mesin', navLabel: 'Mesin' },
  { id: 'ulw', num: 4, label: 'ULW', navLabel: 'ULW' },
  { id: 'industry-alignment', num: 5, label: 'Keselarasan Industri', navLabel: 'Mitra' },
  { id: 'student-transformation', num: 6, label: 'Transformasi Siswa', navLabel: 'Transformasi' },
  { id: 'achievements', num: 7, label: 'Prestasi', navLabel: 'Prestasi' },
  { id: 'ppdb', num: 8, label: 'PPDB', navLabel: 'PPDB' },
] as const;

export type ChapterId = (typeof CHAPTERS_V21)[number]['id'];

export const PRIMARY_MESSAGE = 'Belajar. Berkarya. Siap Industri.';

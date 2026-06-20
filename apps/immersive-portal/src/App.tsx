import { useState, useCallback, useEffect } from 'react';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { SceneCanvas } from '@/components/canvas/SceneCanvas';
import { FutureStartsHereChapter } from '@/components/scenes/FutureStartsHereChapter';
import { IndustryChallengeChapter } from '@/components/scenes/IndustryChallengeChapter';
import { TeknikMesinChapter } from '@/components/scenes/TeknikMesinChapter';
import { UsahaLayananWisataChapter } from '@/components/scenes/UsahaLayananWisataChapter';
import { IndustryAlignmentChapter } from '@/components/scenes/IndustryAlignmentChapter';
import { StudentTransformationChapter } from '@/components/scenes/StudentTransformationChapter';
import { AchievementsChapter } from '@/components/scenes/AchievementsChapter';
import { PpdbChapter } from '@/components/scenes/PpdbChapter';
import { FaqChapter } from '@/components/scenes/FaqChapter';
import { KontakChapter } from '@/components/scenes/KontakChapter';

function PageLoading({ visible }: { visible: boolean }) {
  return (
    <div className={`page-loading ${visible ? '' : 'is-hidden'}`} role="status" aria-live="polite">
      <div className="page-loading__bar">
        <div className="page-loading__bar-inner" />
      </div>
      <img src="assets/logo-teknovo.png" alt="" className="page-loading__logo" width={72} height={72} />
      <p className="page-loading__text">Memuat SMK Teknovo…</p>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  useLenisScroll({ onScroll: handleScroll });

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoading visible={loading} />
      <a href="#future-starts-here" className="skip-link">
        Lewati ke konten utama
      </a>
      <ScrollProgress progress={scrollProgress} />
      <Header />
      <SceneCanvas />
      <main>
        <FutureStartsHereChapter />
        <IndustryChallengeChapter />
        <TeknikMesinChapter />
        <UsahaLayananWisataChapter />
        <IndustryAlignmentChapter />
        <StudentTransformationChapter />
        <AchievementsChapter />
        <PpdbChapter />
        <aside className="support-layer" aria-label="Dukungan calon siswa">
          <FaqChapter />
          <KontakChapter />
        </aside>
      </main>
      <footer className="footer-mini">
        <p>
          © {new Date().getFullYear()} SMK TEKNOVO ·{' '}
          <a href="#future-starts-here">Beranda</a> ·{' '}
          <a href="#achievements">Prestasi</a> ·{' '}
          <a href="#ppdb">PPDB</a> ·{' '}
          <a href="#faq">FAQ</a> ·{' '}
          <a href="#kontak">Kontak</a>
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '12px', opacity: 0.7 }}>
          <a href="ppdb/">Daftar PPDB</a> ·{' '}
          <a href="berita/">Berita</a> ·{' '}
          <a href="portal/siswa.html">Portal Siswa</a>
        </p>
      </footer>
    </>
  );
}

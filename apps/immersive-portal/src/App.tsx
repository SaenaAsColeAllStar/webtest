import { useRef, useState, useCallback, useEffect } from 'react';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { SceneCanvas } from '@/components/canvas/SceneCanvas';
import { StoryChapter } from '@/components/scenes/StoryChapter';
import { TransformationChapter } from '@/components/scenes/TransformationChapter';
import { IndustryChapter } from '@/components/scenes/IndustryChapter';
import { StudentJourneyChapter } from '@/components/scenes/StudentJourneyChapter';
import { CareerJourneyChapter } from '@/components/scenes/CareerJourneyChapter';
import { ProofChapter } from '@/components/scenes/ProofChapter';
import { ActionChapter } from '@/components/scenes/ActionChapter';
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
  const scrollProgressRef = useRef(0);

  const handleScroll = useCallback((progress: number) => {
    setScrollProgress(progress);
    scrollProgressRef.current = progress;
  }, []);

  useLenisScroll({ onScroll: handleScroll });

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoading visible={loading} />
      <a href="#story" className="skip-link">
        Lewati ke konten utama
      </a>
      <ScrollProgress progress={scrollProgress} />
      <Header />
      <SceneCanvas scrollProgress={scrollProgressRef} />
      <main>
        <StoryChapter />
        <TransformationChapter />
        <IndustryChapter />
        <StudentJourneyChapter />
        <CareerJourneyChapter />
        <ProofChapter />
        <ActionChapter />
        <FaqChapter />
        <KontakChapter />
      </main>
      <footer className="footer-mini">
        <p>
          © {new Date().getFullYear()} SMK TEKNOVO ·{' '}
          <a href="#story">Beranda</a> ·{' '}
          <a href="#proof">Prestasi</a> ·{' '}
          <a href="#action">PPDB</a> ·{' '}
          <a href="#faq">FAQ</a> ·{' '}
          <a href="#kontak">Kontak</a>
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '12px', opacity: 0.7 }}>
          <a href="ppdb/">Daftar PPDB</a> ·{' '}
          <a href="berita/">Berita</a> ·{' '}
          <a href="program/tkj.html">Program</a> ·{' '}
          <a href="portal/siswa.html">Portal Siswa</a>
        </p>
      </footer>
    </>
  );
}

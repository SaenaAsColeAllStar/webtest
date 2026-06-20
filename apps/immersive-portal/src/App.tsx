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
      </main>
      <footer className="footer-mini">
        <p>
          © {new Date().getFullYear()} SMK TEKNOVO ·{' '}
          <a href="#story">Beranda</a> ·{' '}
          <a href="ppdb/">PPDB</a> ·{' '}
          <a href="program/tkj.html">Program</a>
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '11px', opacity: 0.6 }}>
          Phase 2 immersive rebuild — Proof, Action, FAQ chapters coming in Phase 3
        </p>
      </footer>
    </>
  );
}

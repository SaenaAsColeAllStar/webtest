import { useRef } from 'react';
import { CheckCircle } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export function StoryChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.chapter__badge', { opacity: 0, y: 20, duration: 0.5 })
      .from('.chapter__title', { opacity: 0, y: 30, duration: 0.6 }, '-=0.2')
      .from('.chapter__lead', { opacity: 0, y: 24, duration: 0.5 }, '-=0.3')
      .from('.chapter__actions .btn', { opacity: 0, y: 20, stagger: 0.1, duration: 0.4 }, '-=0.2')
      .from('.chapter__trust-item', { opacity: 0, x: -16, stagger: 0.08, duration: 0.35 }, '-=0.1');
  }, []);

  return (
    <section className="chapter" id="story" ref={sectionRef} aria-labelledby="story-title">
      <div className="chapter__inner">
        <div className="chapter__content" ref={contentRef}>
          <span className="chapter__badge">Bab 1 · Ekosistem Tenaga Kerja</span>
          <h1 className="chapter__title" id="story-title">
            Karier di{' '}
            <span className="chapter__title-accent">Industri Teknologi</span>
            <br />
            Dimulai di Sini
          </h1>
          <p className="chapter__lead">
            SMK Teknologi dan Vokasional Miftahul Huda Rancasari — kurikulum berbasis
            industri, lab standar kerja nyata, dan 25+ mitra perusahaan. TKJ, RPL, dan DKV
            siap tempuh karier sejak lulus.
          </p>
          <div className="chapter__actions">
            <a href="ppdb/" className="btn btn--primary btn--lg">
              Daftar PPDB 2026/2027
            </a>
            <a href="program/tkj.html" className="btn btn--outline btn--lg">
              Jelajahi Program Keahlian
            </a>
          </div>
          <div className="chapter__trust" aria-label="Keunggulan sekolah">
            <span className="chapter__trust-item">
              <CheckCircle size={16} weight="fill" aria-hidden />
              Terakreditasi Unggul
            </span>
            <span className="chapter__trust-item">
              <CheckCircle size={16} weight="fill" aria-hidden />
              25+ Mitra Industri
            </span>
            <span className="chapter__trust-item">
              <CheckCircle size={16} weight="fill" aria-hidden />
              Lab Standar Kerja Nyata
            </span>
          </div>
        </div>
      </div>
      <div className="chapter-nav-hint" aria-hidden="true">
        <span>Scroll untuk melanjutkan cerita</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

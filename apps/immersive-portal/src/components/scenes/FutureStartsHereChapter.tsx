import { useRef } from 'react';
import { CheckCircle } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { PRIMARY_MESSAGE } from '@/lib/chapters';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useIsMobile';

export function FutureStartsHereChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (!contentRef.current || reducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.chapter__badge', { opacity: 0, y: 20, duration: 0.5 })
      .from('.hero-message', { opacity: 0, y: 24, duration: 0.6 }, '-=0.15')
      .from('.chapter__title', { opacity: 0, y: 30, duration: 0.6 }, '-=0.25')
      .from('.chapter__lead', { opacity: 0, y: 24, duration: 0.5 }, '-=0.3')
      .from('.chapter__actions .btn', { opacity: 0, y: 20, stagger: 0.1, duration: 0.4 }, '-=0.2')
      .from('.chapter__trust-item', { opacity: 0, x: -16, stagger: 0.08, duration: 0.35 }, '-=0.1');
  }, [reducedMotion]);

  return (
    <section
      className="chapter chapter--future-starts-here"
      id="future-starts-here"
      ref={sectionRef}
      aria-labelledby="future-starts-here-title"
    >
      <div className="chapter__inner">
        <div className="chapter__content" ref={contentRef}>
          <span className="chapter__badge">Bab 1 · Future Starts Here</span>
          <p className="hero-message" aria-label="Pesan utama">
            {PRIMARY_MESSAGE}
          </p>
          <h1 className="chapter__title" id="future-starts-here-title">
            Masa Depan{' '}
            <span className="chapter__title-accent">Dimulai di Sini</span>
          </h1>
          <p className="chapter__lead">
            SMK Teknologi dan Vokasional Miftahul Huda Rancasari — akademi tenaga kerja
            masa depan dengan kurikulum berbasis industri, lab standar kerja nyata, dan
            jalur vokasi yang siap tempuh dunia profesional.
          </p>
          <div className="chapter__actions">
            <a href="ppdb/" className="btn btn--primary btn--lg">
              Daftar PPDB 2026/2027
            </a>
            <a href="#teknik-mesin" className="btn btn--outline btn--lg">
              Jelajahi Program Unggulan
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

        {isMobile && (
          <div className="mobile-scene-fallback mobile-scene-fallback--campus" aria-hidden="true">
            <div className="mobile-scene-fallback__building" />
            <p className="mobile-scene-fallback__caption">Kampus SMK Teknovo</p>
          </div>
        )}
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

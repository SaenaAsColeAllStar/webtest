import { useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GearSix, Wrench, Certificate } from '@phosphor-icons/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

const COMPETENCIES = [
  {
    icon: Wrench,
    title: 'Praktik Mesin Nyata',
    text: 'Operasi peralatan produksi, pemahaman material, dan disiplin bengkel industri.',
  },
  {
    icon: GearSix,
    title: 'Presisi & Sistem',
    text: 'Logika mekanik, perakitan presisi, dan pemecahan masalah teknis terstruktur.',
  },
  {
    icon: Certificate,
    title: 'Sertifikasi Kompetensi',
    text: 'Uji kompetensi nasional dan kesiapan kerja di lantai produksi.',
  },
] as const;

export function TeknikMesinChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (reducedMotion || !sectionRef.current) return;

    gsap.from('.teknik-mesin-card', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
        end: 'center center',
        scrub: 1,
      },
      opacity: 0,
      x: -32,
      stagger: 0.1,
    });
  }, [reducedMotion]);

  return (
    <section
      className="chapter chapter--teknik-mesin"
      id="teknik-mesin"
      ref={sectionRef}
      aria-labelledby="teknik-mesin-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content"
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Bab 3 · Teknik Mesin</span>
          <h2 className="chapter__title" id="teknik-mesin-title">
            Presisi, Disiplin,{' '}
            <span className="chapter__title-accent">dan Karya Nyata</span>
          </h2>
          <p className="chapter__lead">
            Program Teknik Mesin membentuk siswa yang memahami mesin produksi dari
            dalam — bukan sekadar mengoperasikan, tetapi berkarya dengan standar industri.
            Beat <strong>Berkarya</strong> dari misi kami hidup di sini.
          </p>
        </motion.div>

        <div className="teknik-mesin-grid">
          {COMPETENCIES.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="teknik-mesin-card">
                <Icon size={28} weight="duotone" aria-hidden />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>

        {isMobile && (
          <div className="mobile-scene-fallback mobile-scene-fallback--mesin" aria-hidden="true">
            <div className="mobile-scene-fallback__lathe" />
            <p className="mobile-scene-fallback__caption">Bengkel Teknik Mesin</p>
          </div>
        )}

        <p className="asset-placeholder-note" role="note">
          Model 3D CNC &amp; gear menunggu ekspor CAD — scene placeholder aktif.
        </p>
      </div>
    </section>
  );
}

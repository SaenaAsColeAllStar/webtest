import { useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function TransformationChapter() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.from('.transformation-panel--before', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1,
      },
      opacity: 0.3,
      x: -40,
    });

    gsap.from('.transformation-panel--after', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'center center',
        scrub: 1,
      },
      opacity: 0,
      x: 60,
    });
  }, []);

  return (
    <section
      className="chapter chapter--transformation"
      id="transformation"
      ref={sectionRef}
      aria-labelledby="transformation-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Bab 2 · Transformasi</span>
          <h2 className="chapter__title" id="transformation-title">
            Dari Calon Siswa Menjadi{' '}
            <span className="chapter__title-accent">Profesional Siap Industri</span>
          </h2>
          <p className="chapter__lead">
            Perjalanan vokasi di SMK Teknovo dirancang untuk mengubah potensi mentah
            menjadi kompetensi kerja nyata — melalui praktik, sertifikasi, dan
            pengalaman langsung di dunia industri.
          </p>
        </motion.div>

        <div className="transformation-grid">
          <div className="transformation-panel transformation-panel--before">
            <p className="transformation-panel__label">Sebelum</p>
            <h3 className="transformation-panel__title">Calon Profesional</h3>
            <p className="transformation-panel__text">
              Siswa dengan minat teknologi namun belum memiliki pengalaman kerja
              nyata. Mereka butuh arah, mentor, dan lingkungan belajar yang menyerupai
              industri — bukan teori semata.
            </p>
          </div>
          <div className="transformation-panel transformation-panel--after">
            <p className="transformation-panel__label">Setelah</p>
            <h3 className="transformation-panel__title">Tenaga Kerja Terampil</h3>
            <p className="transformation-panel__text">
              Lulusan dengan sertifikasi kompetensi, portofolio proyek nyata, dan
              jaringan mitra industri. Siap masuk dunia kerja atau melanjutkan ke
              perguruan tinggi vokasi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

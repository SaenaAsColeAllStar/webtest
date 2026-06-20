import { useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Student, Wrench, Certificate, BriefcaseMetal } from '@phosphor-icons/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PRIMARY_MESSAGE } from '@/lib/chapters';

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_PHASES = [
  {
    icon: Student,
    phase: 'Tahap 1',
    title: 'Fondasi & Orientasi',
    detail:
      'Siswa memahami standar industri, etos kerja, dan kompetensi dasar program Teknik Mesin atau ULW.',
    accent: '#6366f1',
  },
  {
    icon: Wrench,
    phase: 'Tahap 2',
    title: 'Praktik & Simulasi',
    detail:
      'Belajar di bengkel, lab simulasi, dan proyek nyata — keterampilan dibangun lewat berkarya, bukan hanya mendengarkan.',
    accent: '#22d3ee',
  },
  {
    icon: Certificate,
    phase: 'Tahap 3',
    title: 'Sertifikasi & PKL',
    detail:
      'Kompetensi diuji lembaga resmi; siswa mengalami dunia kerja langsung melalui magang di mitra industri.',
    accent: '#a78bfa',
  },
  {
    icon: BriefcaseMetal,
    phase: 'Tahap 4',
    title: 'Siap Industri',
    detail:
      'Lulusan membawa portofolio, sertifikat, dan jaringan mitra — siap bekerja atau melanjutkan pendidikan vokasi.',
    accent: '#fbbf24',
  },
] as const;

export function StudentTransformationChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !sectionRef.current) return;

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

    gsap.from('.transformation-phase', {
      scrollTrigger: {
        trigger: '.transformation-phases',
        start: 'top 75%',
        end: 'bottom 50%',
        scrub: 1,
      },
      opacity: 0,
      y: 28,
      stagger: 0.1,
    });
  }, [reducedMotion]);

  return (
    <section
      className="chapter chapter--transformation"
      id="student-transformation"
      ref={sectionRef}
      aria-labelledby="student-transformation-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content"
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Bab 6 · Student Transformation</span>
          <h2 className="chapter__title" id="student-transformation-title">
            Dari Calon Siswa Menjadi{' '}
            <span className="chapter__title-accent">Profesional Siap Industri</span>
          </h2>
          <p className="chapter__lead">
            Perjalanan vokasi di SMK Teknovo mengubah potensi mentah menjadi kompetensi kerja
            nyata — melalui praktik, sertifikasi, dan pengalaman langsung di dunia industri.
            <em className="chapter__lead-em"> {PRIMARY_MESSAGE}</em>
          </p>
        </motion.div>

        <div className="transformation-grid">
          <div className="transformation-panel transformation-panel--before">
            <p className="transformation-panel__label">Sebelum</p>
            <h3 className="transformation-panel__title">Calon Profesional</h3>
            <p className="transformation-panel__text">
              Siswa dengan minat teknologi dan layanan namun belum memiliki pengalaman kerja
              nyata. Mereka butuh arah, mentor, dan lingkungan belajar yang menyerupai industri.
            </p>
          </div>
          <div className="transformation-panel transformation-panel--after">
            <p className="transformation-panel__label">Setelah</p>
            <h3 className="transformation-panel__title">Tenaga Kerja Terampil</h3>
            <p className="transformation-panel__text">
              Lulusan dengan sertifikasi kompetensi, portofolio proyek nyata, dan jaringan mitra
              industri. Siap masuk dunia kerja atau melanjutkan ke perguruan tinggi vokasi.
            </p>
          </div>
        </div>

        <div className="transformation-phases" aria-label="Tahapan transformasi siswa">
          {JOURNEY_PHASES.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="transformation-phase"
                style={{ '--phase-accent': item.accent } as React.CSSProperties}
              >
                <div className="transformation-phase__icon" aria-hidden>
                  <Icon size={22} weight="duotone" />
                </div>
                <div>
                  <span className="transformation-phase__label">{item.phase}</span>
                  <h3 className="transformation-phase__title">{item.title}</h3>
                  <p className="transformation-phase__detail">{item.detail}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

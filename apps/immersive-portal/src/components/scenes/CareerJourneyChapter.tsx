import { useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CAREER_PATHS = [
  {
    program: 'TKJ',
    role: 'Network Engineer',
    flow: '85% lulus langsung bekerja di ISP, data center, atau perusahaan IT',
    partners: 'Telkom, Biznet, Cisco Academy',
    accent: '#6366f1',
  },
  {
    program: 'RPL',
    role: 'Software Developer',
    flow: '78% melanjutkan ke software house, startup, atau freelance developer',
    partners: 'Tokopedia, Gojek, software house lokal',
    accent: '#22d3ee',
  },
  {
    program: 'DKV',
    role: 'Visual Designer',
    flow: '72% berkarier di agency, brand studio, atau content creator profesional',
    partners: 'Agency kreatif, brand lokal, media digital',
    accent: '#a78bfa',
  },
] as const;

export function CareerJourneyChapter() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.from('.career-flow', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'center center',
        scrub: 1,
      },
      opacity: 0,
      x: -40,
      stagger: 0.2,
    });

    gsap.from('.career-flow__stat', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 50%',
        scrub: 1,
      },
      opacity: 0,
      scale: 0.95,
      stagger: 0.15,
    });
  }, []);

  return (
    <section
      className="chapter chapter--career"
      id="career-journey"
      ref={sectionRef}
      aria-labelledby="career-journey-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Bab 5 · Perjalanan Karier</span>
          <h2 className="chapter__title" id="career-journey-title">
            Dari Bangku Sekolah ke{' '}
            <span className="chapter__title-accent">Dunia Kerja Nyata</span>
          </h2>
          <p className="chapter__lead">
            Lulusan SMK Teknovo tidak hanya punya ijazah — mereka membawa portofolio,
            sertifikasi, dan jaringan industri yang sudah terbentuk selama belajar.
          </p>
        </motion.div>

        <div className="career-river" aria-label="Alur karier per jurusan">
          {CAREER_PATHS.map((path) => (
            <article
              key={path.program}
              className="career-flow"
              style={{ '--career-accent': path.accent } as React.CSSProperties}
            >
              <div className="career-flow__header">
                <span className="career-flow__program">{path.program}</span>
                <span className="career-flow__arrow" aria-hidden="true">→</span>
                <span className="career-flow__role">{path.role}</span>
              </div>
              <p className="career-flow__stat">{path.flow}</p>
              <p className="career-flow__partners">
                Mitra: {path.partners}
              </p>
            </article>
          ))}
        </div>

        <motion.div
          className="career-narrative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p>
            Lebih dari <strong>500 alumni</strong> telah menempuh karier di industri
            teknologi sejak 2015 — dari teknisi jaringan hingga lead developer di
            perusahaan nasional.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

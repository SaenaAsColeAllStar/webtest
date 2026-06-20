import { useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { HardDrives, Code, PaintBrush, ArrowRight } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const PROGRAMS = [
  {
    id: 'tkj',
    icon: HardDrives,
    name: 'Teknik Komputer & Jaringan',
    short: 'TKJ',
    tagline: 'Infrastruktur digital yang menopang seluruh industri',
    description:
      'Merakit server, merancang jaringan, mengamankan sistem — siswa TKJ belajar langsung di lab jaringan standar industri dengan perangkat Cisco dan Mikrotik.',
    href: 'program/tkj.html',
    accent: '#6366f1',
    offset: '0',
  },
  {
    id: 'rpl',
    icon: Code,
    name: 'Rekayasa Perangkat Lunak',
    short: 'RPL',
    tagline: 'Kode yang mengubah ide menjadi produk nyata',
    description:
      'Dari algoritma dasar hingga deploy aplikasi web — kurikulum RPL dirancang bersama praktisi software house lokal dan startup teknologi.',
    href: 'program/rpl.html',
    accent: '#22d3ee',
    offset: '4rem',
  },
  {
    id: 'dkv',
    icon: PaintBrush,
    name: 'Desain Komunikasi Visual',
    short: 'DKV',
    tagline: 'Visual yang berbicara lebih keras dari kata-kata',
    description:
      'Branding, motion graphics, UI/UX — siswa DKV membangun portofolio kreatif dengan proyek nyata dari mitra desain dan agency lokal.',
    href: 'program/dkv.html',
    accent: '#a78bfa',
    offset: '8rem',
  },
] as const;

export function IndustryChapter() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.from('.industry-program', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'center center',
        scrub: 1,
      },
      opacity: 0,
      y: 60,
      stagger: 0.15,
    });
  }, []);

  return (
    <section
      className="chapter chapter--industry"
      id="industry"
      ref={sectionRef}
      aria-labelledby="industry-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Bab 3 · Keselarasan Industri</span>
          <h2 className="chapter__title" id="industry-title">
            Tiga Jurusan, Satu{' '}
            <span className="chapter__title-accent">Ekosistem Teknologi</span>
          </h2>
          <p className="chapter__lead">
            Setiap program keahlian dirancang bersama mitra industri — bukan kurikulum
            di meja, melainkan kompetensi yang langsung dibutuhkan di dunia kerja nyata.
          </p>
        </motion.div>

        <div className="industry-spatial">
          {PROGRAMS.map((program) => {
            const Icon = program.icon;
            return (
              <article
                key={program.id}
                className="industry-program"
                style={{ marginLeft: program.offset }}
              >
                <div className="industry-program__visual" style={{ '--program-accent': program.accent } as React.CSSProperties}>
                  <Icon size={32} weight="duotone" aria-hidden />
                </div>
                <div className="industry-program__body">
                  <span className="industry-program__short">{program.short}</span>
                  <h3 className="industry-program__name">{program.name}</h3>
                  <p className="industry-program__tagline">{program.tagline}</p>
                  <p className="industry-program__desc">{program.description}</p>
                  <a href={program.href} className="industry-program__link">
                    Jelajahi {program.short}
                    <ArrowRight size={16} weight="bold" aria-hidden />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

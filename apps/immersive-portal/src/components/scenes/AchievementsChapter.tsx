import { useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Trophy, Medal, Gear, Certificate } from '@phosphor-icons/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    year: '2026',
    title: 'Juara 1 LKS Kabupaten — Teknik Mesin',
    description:
      'Tim Teknik Mesin meraih emas di Lomba Kompetensi Siswa bidang manufaktur dan melaju ke tingkat provinsi.',
    accent: '#fbbf24',
  },
  {
    icon: Medal,
    year: '2025',
    title: 'Medali Emas Festival Pariwisata — ULW',
    description:
      'Siswa Usaha Layanan Wisata dinilai terbaik dalam kompetisi layanan hospitality tingkat provinsi.',
    accent: '#a78bfa',
  },
  {
    icon: Gear,
    year: '2025',
    title: 'Inovasi Prototipe CNC Regional',
    description:
      'Proyek fabrikasi siswa Teknik Mesin dipresentasikan di pameran industri regional dan dinilai unggul.',
    accent: '#22d3ee',
  },
  {
    icon: Certificate,
    year: '2024',
    title: 'Akreditasi Unggul & Sertifikasi BNSP',
    description:
      'Program unggulan tersertifikasi kompetensi nasional melalui lembaga sertifikasi resmi.',
    accent: '#6366f1',
  },
] as const;

export function AchievementsChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !sectionRef.current) return;

    gsap.from('.proof-entry', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: 1,
      },
      opacity: 0,
      x: -32,
      stagger: 0.18,
    });
  }, [reducedMotion]);

  return (
    <section
      className="chapter chapter--proof chapter--achievements"
      id="achievements"
      ref={sectionRef}
      aria-labelledby="achievements-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content"
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Bab 7 · Achievements</span>
          <h2 className="chapter__title" id="achievements-title">
            Prestasi yang{' '}
            <span className="chapter__title-accent">Bisa Diverifikasi</span>
          </h2>
          <p className="chapter__lead">
            Bukan angka marketing — ini pencapaian siswa dan sekolah yang tercatat di kompetisi
            regional, sertifikasi nasional, dan dunia industri.
          </p>
        </motion.div>

        <div className="proof-editorial" aria-label="Linimasa prestasi SMK Teknovo">
          <div className="proof-editorial__spine" aria-hidden="true" />
          {ACHIEVEMENTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="proof-entry"
                style={{ '--proof-accent': item.accent } as React.CSSProperties}
              >
                <div className="proof-entry__marker" aria-hidden="true">
                  <Icon size={22} weight="duotone" />
                </div>
                <div className="proof-entry__body">
                  <span className="proof-entry__year">{item.year}</span>
                  <h3 className="proof-entry__title">{item.title}</h3>
                  <p className="proof-entry__desc">{item.description}</p>
                </div>
                <span className="proof-entry__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </article>
            );
          })}
        </div>

        <motion.aside
          className="proof-credential"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            <strong>Terakreditasi Unggul</strong> · Mitra industri aktif ·{' '}
            <strong>500+ alumni</strong> di sektor manufaktur dan layanan sejak 2015
          </p>
        </motion.aside>
      </div>
    </section>
  );
}

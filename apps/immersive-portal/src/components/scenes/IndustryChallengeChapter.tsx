import { useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TrendUp, Users, Factory, Warning } from '@phosphor-icons/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const DEMAND_STATS = [
  {
    icon: TrendUp,
    value: '12%',
    label: 'Pertumbuhan kebutuhan tenaga vokasi terampil per tahun',
    accent: '#22d3ee',
  },
  {
    icon: Factory,
    value: '68%',
    label: 'Perusahaan manufaktur & jasa mencari lulusan SMK siap kerja',
    accent: '#6366f1',
  },
  {
    icon: Users,
    value: '2,4 jt',
    label: 'Lowongan teknis & layanan yang belum terisi nasional',
    accent: '#a78bfa',
  },
] as const;

export function IndustryChallengeChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !sectionRef.current) return;

    gsap.from('.challenge-stat', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'center center',
        scrub: 1,
      },
      opacity: 0,
      y: 48,
      stagger: 0.12,
    });
  }, [reducedMotion]);

  return (
    <section
      className="chapter chapter--industry-challenge"
      id="industry-challenge"
      ref={sectionRef}
      aria-labelledby="industry-challenge-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content"
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Bab 2 · Industry Challenge</span>
          <h2 className="chapter__title" id="industry-challenge-title">
            Industri Butuh{' '}
            <span className="chapter__title-accent">Tenaga Terampil Sekarang</span>
          </h2>
          <p className="chapter__lead">
            Permintaan tenaga kerja vokasi terus meningkat — sementara kesenjangan
            keterampilan melebar. Sekolah yang hanya mengajar teori tidak lagi cukup.
            Teknovo hadir untuk menjawab urgensi ini.
          </p>
        </motion.div>

        <div className="challenge-alert" role="note">
          <Warning size={20} weight="fill" aria-hidden />
          <span>Kebutuhan industri nyata — bukan proyeksi jauh di masa depan.</span>
        </div>

        <div className="challenge-stats" aria-label="Data kebutuhan tenaga kerja">
          {DEMAND_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <article
                key={stat.label}
                className="challenge-stat"
                style={{ '--stat-accent': stat.accent } as React.CSSProperties}
              >
                <div className="challenge-stat__icon">
                  <Icon size={24} weight="duotone" aria-hidden />
                </div>
                <p className="challenge-stat__value">{stat.value}</p>
                <p className="challenge-stat__label">{stat.label}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

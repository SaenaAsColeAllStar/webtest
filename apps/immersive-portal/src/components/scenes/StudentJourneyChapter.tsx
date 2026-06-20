import { useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ClipboardText,
  GraduationCap,
  Flask,
  Briefcase,
  Certificate,
  RocketLaunch,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    icon: ClipboardText,
    phase: 'Tahap 1',
    title: 'Pendaftaran & Seleksi',
    description: 'Calon siswa mendaftar PPDB, mengikuti tes minat, dan orientasi vokasi.',
  },
  {
    icon: GraduationCap,
    phase: 'Tahap 2',
    title: 'Orientasi & Dasar',
    description: 'Pengenalan dunia industri, soft skill, dan fondasi teknis jurusan.',
  },
  {
    icon: Flask,
    phase: 'Tahap 3',
    title: 'Praktik di Lab',
    description: 'Hands-on di lab standar kerja — jaringan, coding, atau studio desain.',
  },
  {
    icon: Briefcase,
    phase: 'Tahap 4',
    title: 'Proyek Industri',
    description: 'Magang dan proyek nyata bersama 25+ mitra perusahaan teknologi.',
  },
  {
    icon: Certificate,
    phase: 'Tahap 5',
    title: 'Sertifikasi Kompetensi',
    description: 'Uji kompetensi BNSP dan sertifikasi vendor (Cisco, Adobe, dll).',
  },
  {
    icon: RocketLaunch,
    phase: 'Tahap 6',
    title: 'Lulus Siap Kerja',
    description: 'Portofolio lengkap, jaringan industri, dan kompetensi terverifikasi.',
  },
] as const;

export function StudentJourneyChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !progressRef.current) return;

    gsap.to(progressRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
      },
      scaleY: 1,
      transformOrigin: 'top center',
    });

    const items = sectionRef.current.querySelectorAll('.journey-milestone');
    items.forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 1,
        },
        opacity: 0.3,
        x: i % 2 === 0 ? -30 : 30,
      });
    });
  }, []);

  return (
    <section
      className="chapter chapter--journey"
      id="student-journey"
      ref={sectionRef}
      aria-labelledby="student-journey-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Bab 4 · Perjalanan Siswa</span>
          <h2 className="chapter__title" id="student-journey-title">
            Enam Tahap Menuju{' '}
            <span className="chapter__title-accent">Kompetensi Nyata</span>
          </h2>
          <p className="chapter__lead">
            Setiap langkah dirancang untuk membangun kepercayaan diri — dari calon
            siswa yang penasaran hingga lulusan yang siap diuji industri.
          </p>
        </motion.div>

        <div className="journey-timeline" ref={timelineRef}>
          <div className="journey-timeline__track" aria-hidden="true">
            <div className="journey-timeline__progress" ref={progressRef} />
          </div>
          <ol className="journey-timeline__list">
            {MILESTONES.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <li key={milestone.title} className="journey-milestone">
                  <div className="journey-milestone__marker" aria-hidden="true">
                    <Icon size={20} weight="duotone" />
                  </div>
                  <div className="journey-milestone__content">
                    <span className="journey-milestone__phase">{milestone.phase}</span>
                    <h3 className="journey-milestone__title">{milestone.title}</h3>
                    <p className="journey-milestone__desc">{milestone.description}</p>
                  </div>
                  <span className="journey-milestone__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

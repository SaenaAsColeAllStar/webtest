import { useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Network,
  Buildings,
  Certificate,
  Briefcase,
  GraduationCap,
  ArrowRight,
} from '@phosphor-icons/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const NETWORK_NODES = [
  { id: 'manufacturing', label: 'Mitra Manufaktur', icon: Buildings, angle: 0 },
  { id: 'hospitality', label: 'Perhotelan & Pariwisata', icon: Briefcase, angle: 72 },
  { id: 'certification', label: 'Sertifikasi BNSP', icon: Certificate, angle: 144 },
  { id: 'internship', label: 'PKL & Magang', icon: GraduationCap, angle: 216 },
  { id: 'alumni', label: 'Jaringan Alumni', icon: Network, angle: 288 },
] as const;

const PATHWAYS = [
  {
    title: 'Praktik Kerja Lapangan',
    detail: 'Siswa terjun langsung ke mitra industri selama PKL — bukan simulasi di kelas saja.',
    accent: '#22d3ee',
  },
  {
    title: 'Sertifikasi Kompetensi',
    detail: 'Kompetensi dinilai lembaga resmi sehingga lulusan punya bukti keterampilan yang diakui.',
    accent: '#6366f1',
  },
  {
    title: 'Jalur Penempatan Kerja',
    detail: 'Mitra aktif merekrut lulusan Teknovo ke manufaktur, hospitality, dan layanan regional.',
    accent: '#a78bfa',
  },
] as const;

export function IndustryAlignmentChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !sectionRef.current) return;

    gsap.from('.alignment-node', {
      scrollTrigger: {
        trigger: '.alignment-network',
        start: 'top 75%',
        end: 'center center',
        scrub: 1,
      },
      opacity: 0,
      scale: 0.85,
      stagger: 0.08,
    });

    gsap.from('.alignment-pathway', {
      scrollTrigger: {
        trigger: '.alignment-pathways',
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: 1,
      },
      opacity: 0,
      y: 32,
      stagger: 0.12,
    });
  }, [reducedMotion]);

  return (
    <section
      className="chapter chapter--industry-alignment"
      id="industry-alignment"
      ref={sectionRef}
      aria-labelledby="industry-alignment-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content chapter__content--center"
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Bab 5 · Industry Alignment</span>
          <h2 className="chapter__title" id="industry-alignment-title">
            Terhubung dengan{' '}
            <span className="chapter__title-accent">Ekosistem Industri</span>
          </h2>
          <p className="chapter__lead chapter__lead--center">
            Teknovo bukan sekolah terisolasi — kami terintegrasi dalam jaringan mitra,
            sertifikasi, dan jalur karier yang menghubungkan kelas dengan dunia kerja nyata.
          </p>
        </motion.div>

        <div className="alignment-network" aria-label="Jaringan koneksi industri SMK Teknovo">
          <div className="alignment-network__hub">
            <span className="alignment-network__hub-label">SMK Teknovo</span>
            <span className="alignment-network__hub-sub">Belajar. Berkarya. Siap Industri.</span>
          </div>
          <svg className="alignment-network__lines" aria-hidden="true" viewBox="0 0 400 400">
            {NETWORK_NODES.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = 200 + Math.sin(rad) * 140;
              const y = 200 - Math.cos(rad) * 140;
              return (
                <line
                  key={node.id}
                  x1="200"
                  y1="200"
                  x2={x}
                  y2={y}
                  className="alignment-network__line"
                />
              );
            })}
          </svg>
          {NETWORK_NODES.map((node) => {
            const Icon = node.icon;
            const rad = (node.angle * Math.PI) / 180;
            const xPct = 50 + Math.sin(rad) * 35;
            const yPct = 50 - Math.cos(rad) * 35;
            return (
              <article
                key={node.id}
                className="alignment-node"
                style={{ left: `${xPct}%`, top: `${yPct}%` }}
              >
                <div className="alignment-node__icon" aria-hidden>
                  <Icon size={22} weight="duotone" />
                </div>
                <span className="alignment-node__label">{node.label}</span>
              </article>
            );
          })}
        </div>

        <p className="alignment-stat" role="note">
          <strong>25+</strong> mitra industri aktif · PKL terstruktur · sertifikasi kompetensi nasional
        </p>

        <div className="alignment-pathways" aria-label="Jalur keselarasan industri">
          {PATHWAYS.map((pathway) => (
            <article
              key={pathway.title}
              className="alignment-pathway"
              style={{ '--pathway-accent': pathway.accent } as React.CSSProperties}
            >
              <h3 className="alignment-pathway__title">{pathway.title}</h3>
              <p className="alignment-pathway__detail">{pathway.detail}</p>
              <span className="alignment-pathway__arrow" aria-hidden>
                <ArrowRight size={16} weight="bold" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

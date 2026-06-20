import { useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, CalendarBlank, Megaphone, CheckCircle } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const PPDB_STEPS = [
  { num: '1', title: 'Registrasi Online', detail: 'Isi formulir & unggah dokumen' },
  { num: '2', title: 'Verifikasi Berkas', detail: 'Tim sekolah memverifikasi kelengkapan' },
  { num: '3', title: 'Pengumuman', detail: 'Hasil seleksi diumumkan di portal' },
] as const;

const REQUIREMENTS = [
  'Fotokopi ijazah & SKHUN',
  'Akta kelahiran & Kartu Keluarga',
  'Pas foto 3×4 (4 lembar)',
  'Rapor semester 1–5',
] as const;

export function ActionChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !glowRef.current) return;

    gsap.to(glowRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
      opacity: 0.85,
      scale: 1.05,
    });
  }, []);

  return (
    <section
      className="chapter chapter--action"
      id="action"
      ref={sectionRef}
      aria-labelledby="action-title"
    >
      <div className="action-glow" ref={glowRef} aria-hidden="true" />
      <div className="chapter__inner action-panel">
        <motion.div
          className="action-panel__content"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="action-panel__badge">Gelombang 1 Dibuka</span>
          <span className="chapter__badge">Bab 7 · Langkah Berikutnya</span>
          <h2 className="chapter__title" id="action-title">
            Daftar PPDB{' '}
            <span className="chapter__title-accent">2026/2027</span>
          </h2>
          <p className="chapter__lead action-panel__lead">
            Kuota terbatas per jurusan TKJ, RPL, dan DKV. Gelombang 1 berlangsung
            15 April – 30 Juni 2026 — pengumuman 5 Juli 2026.
          </p>

          <div className="action-timeline" aria-label="Alur pendaftaran PPDB">
            {PPDB_STEPS.map((step) => (
              <div key={step.num} className="action-timeline__step">
                <span className="action-timeline__num">{step.num}</span>
                <div>
                  <strong>{step.title}</strong>
                  <span>{step.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <ul className="action-requirements" aria-label="Persyaratan pendaftaran">
            {REQUIREMENTS.map((req) => (
              <li key={req}>
                <CheckCircle size={18} weight="fill" aria-hidden />
                {req}
              </li>
            ))}
          </ul>

          <div className="action-panel__cta">
            <a href="ppdb/" className="btn btn--primary btn--lg action-panel__btn">
              Daftar Sekarang
              <ArrowRight size={20} weight="bold" aria-hidden />
            </a>
            <a href="#kontak" className="btn btn--outline btn--lg">
              Hubungi Panitia PPDB
            </a>
          </div>

          <div className="action-panel__dates">
            <div className="action-panel__date">
              <CalendarBlank size={20} weight="duotone" aria-hidden />
              <div>
                <strong>Gelombang 2</strong>
                <span>1 Juli – 15 Agustus 2026</span>
              </div>
            </div>
            <div className="action-panel__date">
              <Megaphone size={20} weight="duotone" aria-hidden />
              <div>
                <strong>Pengumuman Gel. 1</strong>
                <span>5 Juli 2026</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

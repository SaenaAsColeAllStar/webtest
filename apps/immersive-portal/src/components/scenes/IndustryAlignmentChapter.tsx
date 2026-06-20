import { motion } from 'motion/react';
import { Network, ArrowRight } from '@phosphor-icons/react';

/** Chapter 5 stub — full Industry Alignment build in Phase 5. */
export function IndustryAlignmentChapter() {
  return (
    <section
      className="chapter chapter--industry-alignment chapter--stub"
      id="industry-alignment"
      aria-labelledby="industry-alignment-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content chapter__content--center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Bab 5 · Industry Alignment</span>
          <h2 className="chapter__title" id="industry-alignment-title">
            Terhubung dengan{' '}
            <span className="chapter__title-accent">Ekosistem Industri</span>
          </h2>
          <p className="chapter__lead chapter__lead--center">
            25+ mitra perusahaan, jalur magang, dan sertifikasi kompetensi —
            Teknovo tidak berdiri sendiri, melainkan terintegrasi dengan jaringan
            tenaga kerja regional.
          </p>
          <div className="chapter-stub__icon" aria-hidden>
            <Network size={40} weight="duotone" />
          </div>
          <p className="chapter-stub__note">
            Bab lengkap — Phase 5
            <ArrowRight size={14} weight="bold" aria-hidden />
          </p>
        </motion.div>
      </div>
    </section>
  );
}

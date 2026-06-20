import { useCallback, useId, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from '@phosphor-icons/react';

const FAQ_ITEMS = [
  {
    question: 'Bagaimana cara mendaftar PPDB?',
    answer:
      'Pendaftaran dapat dilakukan secara online melalui halaman PPDB atau formulir kontak dengan subjek "Informasi PPDB". Bawa dokumen persyaratan lengkap saat verifikasi berkas.',
  },
  {
    question: 'Berapa biaya pendidikan di SMK TEKNOVO?',
    answer:
      'Biaya pendidikan disesuaikan dengan program keahlian. Tersedia beasiswa prestasi dan bantuan untuk siswa kurang mampu. Hubungi bagian administrasi untuk rincian biaya terbaru.',
  },
  {
    question: 'Apa saja program keahlian yang tersedia?',
    answer:
      'Program unggulan SMK Teknovo: Teknik Mesin (manufaktur, fabrikasi, CNC) dan Usaha Layanan Wisata (perhotelan, pariwisata, hospitality). Keduanya dirancang untuk kesiapan industri langsung.',
  },
  {
    question: 'Apakah ada program magang dan penempatan kerja?',
    answer:
      'Ya. Siswa mengikuti Praktik Kerja Lapangan (PKL) di perusahaan mitra. Banyak alumni diterima langsung bekerja di mitra industri setelah lulus.',
  },
  {
    question: 'Kapan batas akhir pendaftaran gelombang 1?',
    answer:
      'Pendaftaran gelombang 1 dibuka 15 April – 30 Juni 2026. Kuota terbatas — segera daftar sebelum kuota penuh.',
  },
] as const;

export function FaqChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      className="chapter chapter--faq chapter--support"
      id="faq"
      ref={sectionRef}
      aria-labelledby="faq-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content chapter__content--center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Tanya Jawab</span>
          <h2 className="chapter__title" id="faq-title">
            Pertanyaan yang Sering{' '}
            <span className="chapter__title-accent">Ditanyakan</span>
          </h2>
          <p className="chapter__lead chapter__lead--center">
            Jawaban singkat untuk membantu calon siswa dan orang tua mengambil
            keputusan — tanpa harus menelepon dulu.
          </p>
        </motion.div>

        <div className="faq-accordion" role="list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const questionId = `${baseId}-q-${index}`;
            const answerId = `${baseId}-a-${index}`;

            return (
              <div key={item.question} className="faq-accordion__item" role="listitem">
                <h3 className="faq-accordion__heading">
                  <button
                    type="button"
                    className={`faq-accordion__trigger ${isOpen ? 'is-open' : ''}`}
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggle(index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-accordion__icon" aria-hidden>
                      {isOpen ? <Minus size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      className="faq-accordion__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useCallback, useRef, useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Envelope, Clock } from '@phosphor-icons/react';

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Alamat',
    lines: ['Jl. Pendidikan No. 123, Rancasari', 'Kec. Rancasari, Kab. Bandung', 'Jawa Barat 40396'],
  },
  {
    icon: Phone,
    title: 'Telepon',
    lines: ['(022) 1234-5678', '0812-3456-7890 (WhatsApp)'],
  },
  {
    icon: Envelope,
    title: 'Email',
    lines: ['info@smkteknovo.sch.id', 'ppdb@smkteknovo.sch.id'],
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    lines: ['Senin – Jumat: 07.00 – 15.00 WIB', 'Sabtu: 07.00 – 12.00 WIB'],
  },
] as const;

export function KontakChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nextErrors: Record<string, boolean> = {};
    const required = ['name', 'email', 'subject', 'message'] as const;

    required.forEach((field) => {
      const value = data.get(field);
      if (!value || String(value).trim() === '') {
        nextErrors[field] = true;
      }
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitted(false);
      const firstError = form.querySelector<HTMLElement>('[data-error="true"]');
      firstError?.focus();
      return;
    }

    setErrors({});
    form.reset();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 5000);
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  return (
    <section
      className="chapter chapter--kontak"
      id="kontak"
      ref={sectionRef}
      aria-labelledby="kontak-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content chapter__content--center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Hubungi Kami</span>
          <h2 className="chapter__title" id="kontak-title">
            Mari{' '}
            <span className="chapter__title-accent">Berdiskusi</span>
          </h2>
          <p className="chapter__lead chapter__lead--center">
            Tim SMK Teknovo siap membantu pertanyaan seputar PPDB, program
            keahlian, atau kerja sama industri.
          </p>
        </motion.div>

        <div className="kontak-grid">
          <div className="kontak-info">
            {CONTACT_INFO.map((info) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  className="kontak-card"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="kontak-card__icon" aria-hidden>
                    <Icon size={22} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="kontak-card__title">{info.title}</h3>
                    {info.lines.map((line) => (
                      <p key={line} className="kontak-card__line">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.form
            className="kontak-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulir kontak"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="kontak-form__title">Kirim Pesan</h3>

            {submitted && (
              <p className="kontak-form__success" role="status" tabIndex={-1}>
                Pesan Anda telah dikirim. Tim kami akan menghubungi Anda segera.
              </p>
            )}

            <div className="kontak-form__field">
              <label htmlFor="kontak-name">Nama Lengkap</label>
              <input
                type="text"
                id="kontak-name"
                name="name"
                placeholder="Masukkan nama Anda"
                required
                data-error={errors.name ? 'true' : undefined}
                className={errors.name ? 'is-error' : ''}
                onInput={() => clearError('name')}
              />
            </div>

            <div className="kontak-form__field">
              <label htmlFor="kontak-email">Email</label>
              <input
                type="email"
                id="kontak-email"
                name="email"
                placeholder="nama@email.com"
                required
                data-error={errors.email ? 'true' : undefined}
                className={errors.email ? 'is-error' : ''}
                onInput={() => clearError('email')}
              />
            </div>

            <div className="kontak-form__field">
              <label htmlFor="kontak-phone">No. Telepon</label>
              <input
                type="tel"
                id="kontak-phone"
                name="phone"
                placeholder="08xx-xxxx-xxxx"
              />
            </div>

            <div className="kontak-form__field">
              <label htmlFor="kontak-subject">Subjek</label>
              <select
                id="kontak-subject"
                name="subject"
                required
                data-error={errors.subject ? 'true' : undefined}
                className={errors.subject ? 'is-error' : ''}
                onChange={() => clearError('subject')}
                defaultValue=""
              >
                <option value="" disabled>
                  Pilih subjek
                </option>
                <option value="ppdb">Informasi PPDB</option>
                <option value="program">Program Keahlian</option>
                <option value="kerjasama">Kerja Sama Industri</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            <div className="kontak-form__field">
              <label htmlFor="kontak-message">Pesan</label>
              <textarea
                id="kontak-message"
                name="message"
                rows={4}
                placeholder="Tulis pesan Anda di sini..."
                required
                data-error={errors.message ? 'true' : undefined}
                className={errors.message ? 'is-error' : ''}
                onInput={() => clearError('message')}
              />
            </div>

            <button type="submit" className="btn btn--primary btn--lg kontak-form__submit">
              Kirim Pesan
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

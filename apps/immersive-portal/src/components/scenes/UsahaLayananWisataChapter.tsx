import { useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AirplaneTilt, Buildings, Handshake, Sparkle } from '@phosphor-icons/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

const ULW_PATHS = [
  {
    icon: AirplaneTilt,
    phase: 'Perjalanan',
    title: 'Industri Pariwisata & Transportasi',
    text: 'Terminal bandara, logistik perjalanan, dan operasional layanan transportasi modern.',
    beat: 'airport',
  },
  {
    icon: Buildings,
    phase: 'Hospitality',
    title: 'Layanan Akomodasi Premium',
    text: 'Manajemen hotel, guest experience, dan standar pelayanan profesional berkelas.',
    beat: 'hotel',
  },
] as const;

export function UsahaLayananWisataChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const beatIndicatorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (reducedMotion || !sectionRef.current) return;

    gsap.to('.ulw-beat--hotel', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      opacity: 1,
    });

    gsap.to('.ulw-beat--airport', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      opacity: 0,
    });

    if (beatIndicatorRef.current) {
      gsap.to(beatIndicatorRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        '--ulw-progress': 1,
      });
    }
  }, [reducedMotion]);

  return (
    <section
      className="chapter chapter--ulw"
      id="ulw"
      ref={sectionRef}
      aria-labelledby="ulw-title"
    >
      <div className="chapter__inner">
        <motion.div
          className="chapter__content"
          initial={reducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="chapter__badge">Bab 4 · Usaha Layanan Wisata</span>
          <h2 className="chapter__title" id="ulw-title">
            Keunggulan{' '}
            <span className="chapter__title-accent">Layanan Profesional</span>
          </h2>
          <p className="chapter__lead">
            Program ULW membentuk profesional di bidang pariwisata dan hospitality —
            dari skala infrastruktur perjalanan hingga kehangatan pelayanan tamu.
            Beat <strong>Siap Industri</strong> terwujud dalam standar layanan nyata.
          </p>
        </motion.div>

        <div
          className="ulw-progress"
          ref={beatIndicatorRef}
          style={{ '--ulw-progress': reducedMotion ? 0.5 : 0 } as React.CSSProperties}
          aria-hidden="true"
        >
          <span className="ulw-progress__track" />
        </div>

        <div className="ulw-beats">
          {ULW_PATHS.map((path) => {
            const Icon = path.icon;
            return (
              <article
                key={path.beat}
                className={`ulw-beat ulw-beat--${path.beat}`}
              >
                <div className="ulw-beat__icon">
                  <Icon size={28} weight="duotone" aria-hidden />
                </div>
                <span className="ulw-beat__phase">{path.phase}</span>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
              </article>
            );
          })}
        </div>

        <div className="ulw-highlight" role="note">
          <Handshake size={20} weight="duotone" aria-hidden />
          <span>Dua jalur unggulan: Teknik Mesin &amp; ULW — fondasi karier vokasi Teknovo.</span>
        </div>

        {isMobile && (
          <div className="mobile-scene-fallback mobile-scene-fallback--ulw" aria-hidden="true">
            <Sparkle size={20} aria-hidden />
            <p>Scene 3D bandara &amp; hotel — scroll untuk transisi</p>
          </div>
        )}
      </div>
    </section>
  );
}

import { StrictMode, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  CalendarBlank,
  CaretDown,
  CheckCircle,
  ChalkboardTeacher,
  Clock,
  CompassTool,
  FileText,
  MapPin,
  Phone,
  Student,
  UsersThree,
} from '@phosphor-icons/react';
import './subpages.css';
import '../styles/tokens.css';
import '../styles/global.css';
import {
  articleSections,
  newsStories,
  ppdbFaq,
  ppdbReasons,
  ppdbRequirements,
  ppdbSteps,
  ppdbTimeline,
  programs,
  siteMeta,
  type ProgramSlug,
} from './content';

type PageMode = 'ppdb' | 'berita-index' | 'berita-detail' | 'program';

interface RootDataset {
  page: PageMode;
  basePath: string;
  slug?: string;
}

interface NavLink {
  href: string;
  label: string;
  active?: boolean;
}

const PORTAL_LINKS = [
  { href: 'portal/siswa.html', label: 'Portal Siswa', icon: Student },
  { href: 'portal/guru.html', label: 'Portal Guru', icon: ChalkboardTeacher },
  { href: 'portal/orang-tua.html', label: 'Portal Orang Tua', icon: UsersThree },
];

function readDataset(root: HTMLElement): RootDataset {
  const page = root.dataset.page as PageMode | undefined;
  const basePath = root.dataset.basePath;

  if (!page || !basePath) {
    throw new Error('Subpage root dataset is incomplete');
  }

  return {
    page,
    basePath,
    slug: root.dataset.slug,
  };
}

function withBase(basePath: string, href: string): string {
  if (href.startsWith('#')) {
    return `${basePath}index.html${href}`;
  }
  return `${basePath}${href}`;
}

function PageLoading({ logoHref, text }: { logoHref: string; text: string }) {
  return (
    <div className="page-loading page-loading--subpage" role="status" aria-live="polite">
      <div className="page-loading__bar">
        <div className="page-loading__bar-inner" />
      </div>
      <img src={logoHref} alt="" className="page-loading__logo" width={72} height={72} />
      <p className="page-loading__text">{text}</p>
    </div>
  );
}

function SubpageHeader({ basePath, links, ctaHref }: { basePath: string; links: NavLink[]; ctaHref: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setPortalOpen(false);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`} role="banner">
        <div className="header__inner">
          <a href={withBase(basePath, 'index.html#story')} className="header__logo" onClick={closeAll}>
            <img src={withBase(basePath, 'assets/logo-teknovo.png')} alt="Logo SMK TEKNOVO" width={40} height={40} />
            <div>
              <span className="header__logo-name">SMK TEKNOVO</span>
              <span className="header__logo-sub">Miftahul Huda Rancasari</span>
            </div>
          </a>

          <nav className={`nav ${menuOpen ? 'is-open' : ''}`} id="nav" aria-label="Navigasi utama">
            <ul className="nav__list">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={withBase(basePath, link.href)}
                    className={`nav__link ${link.active ? 'is-active' : ''}`}
                    aria-current={link.active ? 'page' : undefined}
                    onClick={closeAll}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="nav__actions">
              <div className="nav__dropdown">
                <button
                  className="nav__dropdown-toggle"
                  aria-expanded={portalOpen}
                  aria-haspopup="true"
                  onClick={() => setPortalOpen((current) => !current)}
                >
                  Portal <CaretDown size={14} weight="bold" aria-hidden />
                </button>
                {portalOpen && (
                  <ul className="nav__dropdown-menu" role="menu">
                    {PORTAL_LINKS.map(({ href, label, icon: Icon }) => (
                      <li key={href} role="none">
                        <a href={withBase(basePath, href)} role="menuitem" onClick={closeAll}>
                          <Icon size={18} aria-hidden /> {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <a href={ctaHref} className="btn btn--primary btn--sm" onClick={closeAll}>
                Daftar PPDB
              </a>
            </div>
          </nav>

          <button
            className={`hamburger ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="nav"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={`nav-overlay ${menuOpen ? 'is-visible' : ''}`} onClick={closeAll} aria-hidden="true" />
    </>
  );
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StoryDivider({ label }: { label: string }) {
  return (
    <div className="subpage-divider" aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}

function SubpageFooter({ basePath }: { basePath: string }) {
  return (
    <footer className="subpage-footer" role="contentinfo">
      <div className="subpage-footer__inner">
        <div>
          <p className="subpage-footer__eyebrow">Navigasi Lanjutan</p>
          <p className="subpage-footer__title">Satu ekosistem, beberapa jalur keputusan.</p>
        </div>
        <div className="subpage-footer__links">
          <a href={withBase(basePath, 'index.html#story')}>Beranda Immersive</a>
          <a href={withBase(basePath, 'ppdb/')}>PPDB</a>
          <a href={withBase(basePath, 'berita/')}>Berita</a>
          <a href={withBase(basePath, 'program/tkj.html')}>Program</a>
          <a href={withBase(basePath, 'index.html#kontak')}>Kontak</a>
        </div>
        <p className="subpage-footer__copy">
          © {new Date().getFullYear()} {siteMeta.schoolName} · {siteMeta.location}
        </p>
      </div>
    </footer>
  );
}

function PpdbPage({ basePath }: { basePath: string }) {
  return (
    <>
      <section className="subpage-hero subpage-hero--ppdb" id="utama">
        <div className="subpage-hero__backdrop" />
        <div className="subpage-hero__inner">
          <Reveal className="subpage-hero__content">
            <span className="subpage-badge">Phase 4 · Jalur Konversi</span>
            <h1 className="subpage-hero__title">PPDB yang terasa seperti keputusan karier pertama, bukan sekadar formulir.</h1>
            <p className="subpage-hero__lead">
              Jalur masuk SMK Teknovo dirancang untuk membantu calon siswa dan orang tua membaca kecocokan program, memahami langkah,
              lalu bergerak cepat sebelum kuota bergeser.
            </p>
            <div className="subpage-hero__actions">
              <a href="#alur" className="btn btn--primary btn--lg">
                Mulai dari alurnya
              </a>
              <a href={withBase(basePath, 'program/tkj.html')} className="btn btn--outline btn--lg">
                Lihat program dulu
              </a>
            </div>
          </Reveal>

          <Reveal className="subpage-panel subpage-panel--timeline">
            <p className="subpage-panel__eyebrow">Jadwal Utama</p>
            <div className="timeline-stack">
              {ppdbTimeline.map((item) => (
                <div key={item.phase} className="timeline-stack__item">
                  <CalendarBlank size={18} aria-hidden />
                  <div>
                    <strong>{item.phase}</strong>
                    <span>{item.date}</span>
                    <p>{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <main className="subpage-main">
        <Reveal className="subpage-section">
          <div className="section-heading" id="alur">
            <span className="section-heading__badge">01 · Alur Masuk</span>
            <h2>Masuk dengan ritme yang jelas dari minat sampai verifikasi.</h2>
          </div>
          <div className="editorial-steps">
            {ppdbSteps.map((step, index) => (
              <article key={step.title} className="editorial-steps__item">
                <span className="editorial-steps__index">0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <StoryDivider label="Program harus terasa cocok sebelum formulir dibuka." />

        <Reveal className="subpage-section subpage-section--grid">
          <div className="section-heading">
            <span className="section-heading__badge">02 · Kenapa Jalur Ini Berbeda</span>
            <h2>Keputusan dibuat dengan konteks, bukan tekanan visual.</h2>
          </div>
          <div className="reason-grid">
            {ppdbReasons.map((reason) => (
              <article key={reason.title} className="reason-card">
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="subpage-section subpage-section--grid">
          <div className="subpage-panel">
            <p className="subpage-panel__eyebrow">Dokumen Inti</p>
            <ul className="checklist">
              {ppdbRequirements.map((requirement) => (
                <li key={requirement}>
                  <CheckCircle size={18} weight="fill" aria-hidden />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="subpage-panel">
            <p className="subpage-panel__eyebrow">Hubungi Panitia</p>
            <div className="contact-mini">
              <div>
                <Phone size={18} aria-hidden />
                <span>{siteMeta.whatsapp}</span>
              </div>
              <div>
                <FileText size={18} aria-hidden />
                <span>{siteMeta.ppdbEmail}</span>
              </div>
              <div>
                <MapPin size={18} aria-hidden />
                <span>{siteMeta.location}</span>
              </div>
            </div>
            <div className="subpage-panel__actions">
              <a href={withBase(basePath, 'index.html#kontak')} className="btn btn--outline btn--sm">
                Bicara dengan sekolah
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="subpage-section">
          <div className="section-heading">
            <span className="section-heading__badge">03 · Pertanyaan Yang Paling Sering Muncul</span>
            <h2>Semua hambatan utama dibahas sebelum calon siswa kehilangan momentum.</h2>
          </div>
          <div className="faq-list">
            {ppdbFaq.map((item) => (
              <article key={item.question} className="faq-list__item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </main>
    </>
  );
}

function BeritaIndexPage() {
  const spotlight = newsStories[0];
  const others = newsStories.slice(1);

  return (
    <>
      <section className="subpage-hero subpage-hero--news" id="utama">
        <div className="subpage-hero__inner">
          <Reveal className="subpage-hero__content">
            <span className="subpage-badge">Editorial Surface</span>
            <h1 className="subpage-hero__title">Berita yang bergerak sebagai konteks, bukan daftar kartu tanpa arah.</h1>
            <p className="subpage-hero__lead">
              Halaman ini merangkum sinyal penting dari PPDB, prestasi, dan perkembangan program keahlian dengan ritme baca yang lebih
              tenang dan lebih premium.
            </p>
          </Reveal>

          <Reveal className="spotlight-story">
            <div className="spotlight-story__meta">
              <span>{spotlight.category}</span>
              <span>{spotlight.date}</span>
              <span>{spotlight.readTime}</span>
            </div>
            <h2>{spotlight.title}</h2>
            <p>{spotlight.spotlight}</p>
            <a href={spotlight.href} className="spotlight-story__link">
              Baca cerita utama <ArrowRight size={16} aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>

      <main className="subpage-main">
        <Reveal className="subpage-section">
          <div className="section-heading">
            <span className="section-heading__badge">Lead Story</span>
            <h2>Artikel utama diarahkan untuk membantu keputusan, bukan hanya memberi kabar.</h2>
          </div>
          <article className="lead-article-card">
            <div className="lead-article-card__content">
              <p className="lead-article-card__meta">
                <span>{spotlight.category}</span>
                <span>{spotlight.date}</span>
              </p>
              <h3>{spotlight.title}</h3>
              <p>{spotlight.lead}</p>
            </div>
            <a href={spotlight.href} className="btn btn--primary btn--sm">
              Buka artikel
            </a>
          </article>
        </Reveal>

        <StoryDivider label="Setiap berita harus punya arah lanjutan." />

        <Reveal className="subpage-section">
          <div className="news-river">
            {others.map((story, index) => (
              <article key={story.slug} className="news-river__item">
                <span className="news-river__index">0{index + 2}</span>
                <div className="news-river__body">
                  <p className="news-river__meta">
                    <span>{story.category}</span>
                    <span>{story.date}</span>
                    <span>{story.readTime}</span>
                  </p>
                  <h3>{story.title}</h3>
                  <p>{story.excerpt}</p>
                </div>
                <a href={story.href} className="news-river__link">
                  Lanjut ke konteksnya <ArrowRight size={16} aria-hidden />
                </a>
              </article>
            ))}
          </div>
        </Reveal>
      </main>
    </>
  );
}

function BeritaDetailPage({ basePath }: { basePath: string }) {
  const article = newsStories[0];

  return (
    <>
      <section className="subpage-hero subpage-hero--article" id="utama">
        <div className="subpage-hero__inner">
          <Reveal className="subpage-hero__content">
            <span className="subpage-badge">{article.category}</span>
            <p className="article-meta-line">
              <Clock size={16} aria-hidden />
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </p>
            <h1 className="subpage-hero__title">Pembukaan PPDB 2026/2027 dibuka dengan arah keputusan yang lebih jelas.</h1>
            <p className="subpage-hero__lead">
              Bukan hanya mengumumkan jadwal, sekolah menata ulang cara calon siswa mengenali program yang paling sesuai sejak awal.
            </p>
          </Reveal>
        </div>
      </section>

      <main className="subpage-main">
        <Reveal className="subpage-section subpage-section--article-layout">
          <article className="article-flow">
            <p className="article-flow__intro">
              {article.lead} Pendekatan ini dibuat agar langkah menuju pendaftaran terasa lebih manusiawi, lebih informatif, dan lebih
              dekat dengan realitas belajar di SMK Teknovo.
            </p>

            {articleSections.map((section) => (
              <section key={section.heading} className="article-flow__section">
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}

            <section className="article-flow__section article-flow__section--checklist">
              <h2>Dokumen yang perlu disiapkan</h2>
              <ul className="checklist">
                {ppdbRequirements.map((requirement) => (
                  <li key={requirement}>
                    <CheckCircle size={18} weight="fill" aria-hidden />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="article-aside">
            <div className="subpage-panel">
              <p className="subpage-panel__eyebrow">Langkah Berikutnya</p>
              <h3>Setelah membaca artikel ini, arah terbaik ada di dua tempat.</h3>
              <div className="subpage-panel__actions subpage-panel__actions--stack">
                <a href={withBase(basePath, 'ppdb/')} className="btn btn--primary btn--sm">
                  Buka halaman PPDB
                </a>
                <a href={withBase(basePath, 'program/rpl.html')} className="btn btn--outline btn--sm">
                  Bandingkan program
                </a>
              </div>
            </div>
          </aside>
        </Reveal>
      </main>
    </>
  );
}

function ProgramPage({ basePath, slug }: { basePath: string; slug: ProgramSlug }) {
  const program = programs[slug];
  const allPrograms = Object.values(programs);

  return (
    <>
      <section className="subpage-hero subpage-hero--program" id="utama" style={{ ['--program-accent' as string]: program.accent }}>
        <div className="subpage-hero__inner">
          <Reveal className="subpage-hero__content">
            <span className="subpage-badge">{program.heroLabel}</span>
            <h1 className="subpage-hero__title">{program.titleLong}</h1>
            <p className="subpage-hero__lead">{program.intro}</p>
            <div className="program-chip-row">
              {program.outcomes.map((outcome) => (
                <span key={outcome}>{outcome}</span>
              ))}
            </div>
          </Reveal>

          <Reveal className="program-signal">
            <div className="program-signal__frame">
              <span className="program-signal__label">Industry Signal</span>
              <strong>{program.industrySignal}</strong>
              <p>{program.description}</p>
            </div>
            <div className="program-signal__layers" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </Reveal>
        </div>
      </section>

      <main className="subpage-main">
        <Reveal className="subpage-section">
          <nav className="program-switcher" aria-label="Program keahlian">
            {allPrograms.map((item) => (
              <a
                key={item.slug}
                href={withBase(basePath, `program/${item.slug}.html`)}
                className={item.slug === slug ? 'is-active' : ''}
                aria-current={item.slug === slug ? 'page' : undefined}
              >
                <span>{item.shortLabel}</span>
                <strong>{item.title}</strong>
              </a>
            ))}
          </nav>
        </Reveal>

        <Reveal className="subpage-section subpage-section--grid">
          <div className="section-heading">
            <span className="section-heading__badge">01 · Ritme Belajar</span>
            <h2>{program.title} dibangun sebagai jalur kerja yang terasa nyata sejak awal.</h2>
          </div>
          <div className="narrative-columns">
            {program.curriculum.map((item) => (
              <article key={item.title} className="reason-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <StoryDivider label="Program yang baik menjelaskan ruang belajarnya, bukan hanya daftar mata pelajaran." />

        <Reveal className="subpage-section subpage-section--grid">
          <div className="narrative-columns">
            {program.studios.map((item) => (
              <article key={item.title} className="reason-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="subpage-panel">
            <p className="subpage-panel__eyebrow">Arah Lulusan</p>
            <div className="career-mini-river">
              {program.careers.map((career) => (
                <div key={career.role} className="career-mini-river__item">
                  <CompassTool size={18} aria-hidden />
                  <div>
                    <strong>{career.role}</strong>
                    <p>{career.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="subpage-panel__actions">
              <a href={withBase(basePath, 'ppdb/')} className="btn btn--primary btn--sm">
                Masuk lewat PPDB
              </a>
            </div>
          </div>
        </Reveal>
      </main>
    </>
  );
}

function resolveLinks(page: PageMode): NavLink[] {
  return [
    { href: 'index.html#story', label: 'Beranda' },
    { href: 'program/tkj.html', label: 'Program', active: page === 'program' },
    { href: 'berita/', label: 'Berita', active: page === 'berita-index' || page === 'berita-detail' },
    { href: 'ppdb/', label: 'PPDB', active: page === 'ppdb' },
    { href: 'index.html#kontak', label: 'Kontak' },
  ];
}

function SubpageApp({ page, basePath, slug }: RootDataset) {
  const [loading, setLoading] = useState(true);
  const logoHref = useMemo(() => withBase(basePath, 'assets/logo-teknovo.png'), [basePath]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.classList.add('subpage-body');
    return () => document.body.classList.remove('subpage-body');
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), reducedMotion ? 250 : 900);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  const links = resolveLinks(page);
  const ctaHref = withBase(basePath, 'ppdb/');

  let content: ReactNode;
  if (page === 'ppdb') {
    content = <PpdbPage basePath={basePath} />;
  } else if (page === 'berita-index') {
    content = <BeritaIndexPage />;
  } else if (page === 'berita-detail') {
    content = <BeritaDetailPage basePath={basePath} />;
  } else if (page === 'program') {
    if (!slug || !Object.hasOwn(programs, slug)) {
      throw new Error('Program slug missing or invalid');
    }
    content = <ProgramPage basePath={basePath} slug={slug as ProgramSlug} />;
  } else {
    throw new Error('Unsupported subpage mode');
  }

  return (
    <>
      <AnimatePresence>{loading ? <PageLoading logoHref={logoHref} text="Memuat pengalaman halaman…" /> : null}</AnimatePresence>
      <a href="#utama" className="skip-link">
        Lewati ke konten utama
      </a>
      <SubpageHeader basePath={basePath} links={links} ctaHref={ctaHref} />
      {content}
      <SubpageFooter basePath={basePath} />
    </>
  );
}

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element #root not found');
}

const dataset = readDataset(root);

createRoot(root).render(
  <StrictMode>
    <SubpageApp {...dataset} />
  </StrictMode>
);

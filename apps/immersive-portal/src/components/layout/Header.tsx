import { useState, useEffect, useCallback } from 'react';
import { CaretDown, Student, ChalkboardTeacher, UsersThree } from '@phosphor-icons/react';
import { CHAPTERS_V21 } from '@/lib/chapters';

const SUPPORT_LINKS = [
  { href: '#faq', label: 'FAQ' },
  { href: '#kontak', label: 'Kontak' },
  { href: 'berita/', label: 'Berita', external: true },
] as const;

const PORTAL_LINKS = [
  { href: 'portal/siswa.html', label: 'Portal Siswa', icon: Student },
  { href: 'portal/guru.html', label: 'Portal Guru', icon: ChalkboardTeacher },
  { href: 'portal/orang-tua.html', label: 'Portal Orang Tua', icon: UsersThree },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(CHAPTERS_V21[0].id);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setPortalOpen(false);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`} role="banner">
        <div className="header__inner">
          <a href="#future-starts-here" className="header__logo" onClick={closeMenu}>
            <img src="assets/logo-teknovo.png" alt="Logo SMK TEKNOVO" width={40} height={40} />
            <div>
              <span className="header__logo-name">SMK TEKNOVO</span>
              <span className="header__logo-sub">Miftahul Huda Rancasari</span>
            </div>
          </a>

          <nav className={`nav ${menuOpen ? 'is-open' : ''}`} id="nav" aria-label="Navigasi utama">
            <ul className="nav__list">
              {CHAPTERS_V21.map((chapter) => (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    className={`nav__link ${activeSection === chapter.id ? 'is-active' : ''}`}
                    onClick={closeMenu}
                  >
                    {chapter.navLabel}
                  </a>
                </li>
              ))}
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href} className="nav__item--support">
                  <a
                    href={link.href}
                    className={`nav__link ${'external' in link ? '' : activeSection === link.href.replace('#', '') ? 'is-active' : ''}`}
                    onClick={closeMenu}
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
                  onClick={() => setPortalOpen(!portalOpen)}
                >
                  Portal <CaretDown size={14} weight="bold" aria-hidden />
                </button>
                {portalOpen && (
                  <ul className="nav__dropdown-menu" role="menu">
                    {PORTAL_LINKS.map(({ href, label, icon: Icon }) => (
                      <li key={href} role="none">
                        <a href={href} role="menuitem" onClick={closeMenu}>
                          <Icon size={18} aria-hidden /> {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <a href="#ppdb" className="btn btn--primary btn--sm" onClick={closeMenu}>
                Daftar PPDB
              </a>
            </div>
          </nav>

          <button
            className={`hamburger ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div
        className={`nav-overlay ${menuOpen ? 'is-visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
}

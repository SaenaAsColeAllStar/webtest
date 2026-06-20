(function () {
  'use strict';

  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');
  const newsTabs = document.querySelectorAll('.news__tab');
  const mobileCta = document.getElementById('mobile-cta');
  const portalToggle = document.getElementById('portal-toggle');
  const portalMenu = document.getElementById('portal-menu');
  const portalDropdown = document.getElementById('portal-dropdown');
  const faqAccordion = document.getElementById('faq-accordion');
  const testimonialTrack = document.getElementById('testimonials-track');
  const testimonialPrev = document.getElementById('testimonial-prev');
  const testimonialNext = document.getElementById('testimonial-next');
  const testimonialDots = document.getElementById('testimonial-dots');
  const pageLoading = document.getElementById('page-loading');

  let testimonialIndex = 0;
  let testimonialCount = 0;

  /* ---- Sticky header scroll effect ---- */
  function handleScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNav();
    updateMobileCta();
  }

  /* ---- Active nav link on scroll ---- */
  function updateActiveNav() {
    const sections = document.querySelectorAll('main section[id]');
    const scrollPos = window.scrollY + header.offsetHeight + 120;
    let currentId = 'beranda';

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        currentId = id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      const isActive = href === '#' + currentId ||
        (currentId === 'beranda' && href === '#beranda');
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  /* ---- Hide mobile CTA near kontak/ppdb section ---- */
  function updateMobileCta() {
    if (!mobileCta) return;
    const kontak = document.getElementById('kontak');
    const ppdb = document.getElementById('ppdb');
    let inView = false;

    [kontak, ppdb].forEach(function (section) {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        inView = true;
      }
    });

    mobileCta.classList.toggle('is-hidden', inView);
  }

  /* ---- Portal dropdown ---- */
  function closePortalMenu() {
    if (!portalToggle || !portalMenu) return;
    portalToggle.setAttribute('aria-expanded', 'false');
    portalMenu.hidden = true;
  }

  if (portalToggle && portalMenu) {
    portalToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = portalToggle.getAttribute('aria-expanded') === 'true';
      portalToggle.setAttribute('aria-expanded', !isOpen);
      portalMenu.hidden = isOpen;
    });

    document.addEventListener('click', function (e) {
      if (portalDropdown && !portalDropdown.contains(e.target)) {
        closePortalMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePortalMenu();
    });
  }

  /* ---- Mobile menu ---- */
  function toggleMenu() {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
    navOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Buka menu');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  const navCta = document.querySelector('.nav__cta');
  if (navCta) {
    navCta.addEventListener('click', function () {
      closeMenu();
      closePortalMenu();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  /* ---- News tabs ---- */
  function switchTab(tab) {
    const target = tab.dataset.tab;

    newsTabs.forEach(function (t) {
      const isActive = t === tab;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive);
    });

    document.querySelectorAll('.news__panel').forEach(function (panel) {
      const isActive = panel.id === 'panel-' + target;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  }

  newsTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      switchTab(tab);
    });
  });

  /* ---- Contact form ---- */
  if (contactForm) {
    const requiredFields = contactForm.querySelectorAll('[required]');

    requiredFields.forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('is-error');
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('is-error');
          valid = false;
        } else {
          field.classList.remove('is-error');
        }
      });

      if (valid) {
        formNote.hidden = false;
        contactForm.reset();
        formNote.focus({ preventScroll: true });
        setTimeout(function () {
          formNote.hidden = true;
        }, 5000);
      } else {
        const firstError = contactForm.querySelector('.is-error');
        if (firstError) firstError.focus();
      }
    });
  }

  /* ---- Scroll reveal with stagger ---- */
  function initReveal() {
    const groups = [
      '.stats__grid .stat-card',
      '.advantages__grid .advantage-card',
      '.featured-news__grid .news-card',
      '.about__grid .about-card',
      '.facilities__grid .facility-item',
      '.achievements__timeline .achievement-item',
      '.programs__grid .program-card',
      '.news__grid .news-item',
      '.announcements .announcement',
      '.gallery__grid .gallery__item',
      '.contact__info .contact-card'
    ];

    const revealElements = document.querySelectorAll(groups.join(', '));

    revealElements.forEach(function (el, index) {
      el.classList.add('reveal');
      const siblingIndex = Array.from(el.parentElement.children).indexOf(el);
      const delay = Math.min(siblingIndex + 1, 6);
      el.setAttribute('data-delay', delay);
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- FAQ accordion (single open) ---- */
  function initFaq() {
    if (!faqAccordion) return;
    const questions = faqAccordion.querySelectorAll('.faq__question');

    questions.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        const answerId = btn.getAttribute('aria-controls');
        const answer = document.getElementById(answerId);

        questions.forEach(function (other) {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            const otherAnswer = document.getElementById(other.getAttribute('aria-controls'));
            if (otherAnswer) {
              otherAnswer.hidden = true;
              otherAnswer.classList.remove('is-open');
            }
          }
        });

        btn.setAttribute('aria-expanded', !isExpanded);
        if (answer) {
          answer.hidden = isExpanded;
          answer.classList.toggle('is-open', !isExpanded);
        }
      });
    });
  }

  /* ---- Testimonials carousel ---- */
  function goToTestimonial(index) {
    if (!testimonialTrack || testimonialCount === 0) return;
    testimonialIndex = (index + testimonialCount) % testimonialCount;
    testimonialTrack.style.transform = 'translateX(-' + (testimonialIndex * 100) + '%)';

    if (testimonialDots) {
      testimonialDots.querySelectorAll('.testimonials__dot').forEach(function (dot, i) {
        dot.classList.toggle('active', i === testimonialIndex);
        dot.setAttribute('aria-selected', i === testimonialIndex);
      });
    }
  }

  function initTestimonials() {
    if (!testimonialTrack) return;
    const cards = testimonialTrack.querySelectorAll('.testimonial-card');
    testimonialCount = cards.length;
    if (testimonialCount === 0) return;

    if (testimonialDots) {
      cards.forEach(function (_, i) {
        const dot = document.createElement('button');
        dot.className = 'testimonials__dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Testimoni ' + (i + 1));
        dot.setAttribute('aria-selected', i === 0);
        dot.addEventListener('click', function () { goToTestimonial(i); });
        testimonialDots.appendChild(dot);
      });
    }

    if (testimonialPrev) {
      testimonialPrev.addEventListener('click', function () {
        goToTestimonial(testimonialIndex - 1);
      });
    }

    if (testimonialNext) {
      testimonialNext.addEventListener('click', function () {
        goToTestimonial(testimonialIndex + 1);
      });
    }
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', targetId);
      }
    });
  });

  /* ---- Page loading state ---- */
  function hidePageLoading() {
    if (!pageLoading) return;
    pageLoading.classList.add('is-hidden');
    pageLoading.setAttribute('aria-hidden', 'true');
  }

  if (document.readyState === 'complete') {
    hidePageLoading();
  } else {
    window.addEventListener('load', hidePageLoading);
  }

  /* ---- Init ---- */
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  initReveal();
  initFaq();
  initTestimonials();
})();

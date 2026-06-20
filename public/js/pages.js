(function () {
  'use strict';

  const pageLoading = document.getElementById('page-loading');
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navOverlay = document.getElementById('nav-overlay');
  const portalToggle = document.getElementById('portal-toggle');
  const portalMenu = document.getElementById('portal-menu');
  const portalDropdown = document.getElementById('portal-dropdown');

  function hidePageLoading() {
    if (!pageLoading) return;
    pageLoading.classList.add('is-hidden');
    pageLoading.setAttribute('aria-hidden', 'true');
  }

  function handleScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  }

  function closePortalMenu() {
    if (!portalToggle || !portalMenu) return;
    portalToggle.setAttribute('aria-expanded', 'false');
    portalMenu.hidden = true;
  }

  if (portalToggle && portalMenu) {
    portalToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = portalToggle.getAttribute('aria-expanded') === 'true';
      portalToggle.setAttribute('aria-expanded', String(!isOpen));
      portalMenu.hidden = isOpen;
    });

    document.addEventListener('click', function (e) {
      if (portalDropdown && !portalDropdown.contains(e.target)) {
        closePortalMenu();
      }
    });
  }

  function toggleMenu() {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
    navOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Buka menu');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* Portal login state machine */
  function initPortalLogin() {
    const form = document.getElementById('portal-login-form');
    if (!form) return;

    const states = {
      form: document.getElementById('portal-state-form'),
      loading: document.getElementById('portal-state-loading'),
      success: document.getElementById('portal-state-success'),
      error: document.getElementById('portal-state-error'),
      permission: document.getElementById('portal-state-permission')
    };

    function showState(name) {
      Object.keys(states).forEach(function (key) {
        if (states[key]) {
          states[key].classList.toggle('is-active', key === name);
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = form.querySelector('[name="username"]');
      const password = form.querySelector('[name="password"]');

      if (!username.value.trim() || !password.value.trim()) {
        showState('error');
        return;
      }

      showState('loading');

      setTimeout(function () {
        if (password.value === 'demo') {
          showState('permission');
        } else if (username.value === 'demo' && password.value === 'demo123') {
          showState('success');
        } else {
          showState('error');
        }
      }, 900);
    });

    const retryBtns = document.querySelectorAll('.portal-retry');
    retryBtns.forEach(function (retryBtn) {
      retryBtn.addEventListener('click', function () {
        showState('form');
        form.reset();
      });
    });
  }

  if (document.readyState === 'complete') {
    hidePageLoading();
  } else {
    window.addEventListener('load', hidePageLoading);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  initPortalLogin();
})();

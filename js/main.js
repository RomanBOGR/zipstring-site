// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ─── TRICK FILTER ─────────────────────────────────────────────────────────────
function initFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('[data-level]').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.level === filter) ? '' : 'none';
      });
    });
  });
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── MOBILE MENU ──────────────────────────────────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  toggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); }
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ─── SMOOTH SCROLL ────────────────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#' || href === '#wb' || href === '#ozon') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

// ─── REVIEWS SLIDER ───────────────────────────────────────────────────────────
function initReviewsSlider() {
  const slider  = document.getElementById('reviewsSlider');
  const dotsEl  = document.getElementById('reviewsDots');
  const btnPrev = document.getElementById('reviewsPrev');
  const btnNext = document.getElementById('reviewsNext');
  if (!slider || !dotsEl) return;

  const cards = slider.querySelectorAll('.review-card');
  const total = cards.length;
  let perView = window.innerWidth <= 768 ? 1 : 3;
  let current = 0;
  let autoId;

  // Build dots
  const maxSlides = total - perView + 1;
  for (let i = 0; i < maxSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Отзыв ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - perView));
    const cardW = cards[0].offsetWidth;
    slider.style.transform = `translateX(-${current * cardW}px)`;
    dotsEl.querySelectorAll('.slider-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  function next() { goTo(current + 1 >= total - perView + 1 ? 0 : current + 1); }
  function prev() { goTo(current - 1 < 0 ? total - perView : current - 1); }

  btnNext?.addEventListener('click', () => { clearInterval(autoId); next(); startAuto(); });
  btnPrev?.addEventListener('click', () => { clearInterval(autoId); prev(); startAuto(); });

  function startAuto() {
    autoId = setInterval(next, 5000);
  }
  startAuto();

  // Recalc on resize
  window.addEventListener('resize', () => {
    perView = window.innerWidth <= 768 ? 1 : 3;
    goTo(0);
  });

  // Touch/swipe support
  let startX = 0;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) { clearInterval(autoId); dx < 0 ? next() : prev(); startAuto(); }
  }, { passive: true });
}

// ─── ANNOUNCEMENT CLOSE ───────────────────────────────────────────────────────
function initAnnouncementBar() {
  const bar   = document.getElementById('announcementBar');
  const close = document.getElementById('announcementClose');
  if (!bar || !close) return;

  // Restore dismissed state
  if (sessionStorage.getItem('annDismissed') === '1') {
    bar.style.display = 'none';
    return;
  }

  close.addEventListener('click', () => {
    bar.style.height = bar.offsetHeight + 'px';
    bar.offsetHeight; // reflow
    bar.classList.add('dismissed');
    sessionStorage.setItem('annDismissed', '1');
    // After transition remove from flow entirely
    bar.addEventListener('transitionend', () => { bar.style.display = 'none'; }, { once: true });
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initFAQ();
  initFilter();
  initSmoothScroll();
  initReviewsSlider();
  initAnnouncementBar();
});

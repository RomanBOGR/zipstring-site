// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────
function initFAQ() {
  const qs = document.querySelectorAll('.faq-question');
  qs.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  qs.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
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

// ─── АВТОПЛЕЙ ДЕМО-ВИДЕО ПО ВИДИМОСТИ ──────────────────────────────────────────
// На тач-устройствах onmouseover не срабатывает — демо-видео (трюки, карточки
// продуктов) заводим при попадании в вьюпорт и паузим при уходе. Reduced-motion —
// не трогаем (poster остаётся статичным).
function initVideoAutoplay() {
  const vids = document.querySelectorAll('.trick-video, .product-media-video');
  if (!vids.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        v.play().catch(() => {}); // автоплей могут заблокировать — тихо игнорим
      } else if (!v.paused) {
        v.pause();
      }
    });
  }, { threshold: 0.5 });

  vids.forEach(v => io.observe(v));
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

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function startAuto() {
    if (reduceMotion) return;               // уважаем reduced-motion
    autoId = setInterval(next, 5000);
  }
  startAuto();

  // Пауза автопрокрутки по наведению/фокусу (WCAG 2.2.2)
  const outer = document.getElementById('reviewsSliderOuter') || slider;
  ['mouseenter', 'focusin'].forEach(e => outer.addEventListener(e, () => clearInterval(autoId)));
  ['mouseleave', 'focusout'].forEach(e => outer.addEventListener(e, startAuto));

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

// ─── SHOP LINKS ─────────────────────────────────────────────────────────────
// Единственное место для ссылок на маркетплейсы. Появятся карточки WB/Ozon —
// вписать URL сюда, и все 44 кнопки на сайте заработают разом.
const SHOP_LINKS = {
  wildberries: '', // TODO: ссылка на магазин/карточку Wildberries
  ozon: ''         // TODO: ссылка на магазин/карточку Ozon
};

function initShopLinks() {
  const map = { 'btn-wb': SHOP_LINKS.wildberries, 'btn-ozon': SHOP_LINKS.ozon };
  for (const [cls, url] of Object.entries(map)) {
    document.querySelectorAll('.' + cls).forEach(a => {
      if (url) {
        a.href = url; a.target = '_blank'; a.rel = 'noopener';
      } else {
        // Ссылки ещё нет — не ведём в никуда, помечаем «скоро»
        a.setAttribute('aria-disabled', 'true');
        a.title = 'Скоро в продаже';
        a.addEventListener('click', e => e.preventDefault());
      }
    });
  }
}

// ─── SOCIAL LINKS ─────────────────────────────────────────────────────────────
// Единственное место для ссылок на соцсети. Появятся аккаунты — вписать URL сюда,
// и все иконки/ссылки в футере и на «Контактах» заработают разом.
const SOCIAL_LINKS = {
  vk:        '', // TODO: ссылка на сообщество ВКонтакте
  youtube:   '', // TODO: ссылка на YouTube-канал
  instagram: '', // TODO: ссылка на Instagram (Meta признана экстремистской в РФ)
  tiktok:    '', // TODO: ссылка на TikTok
  telegram:  'https://t.me/zipstring_ru'
};

function initSocialLinks() {
  document.querySelectorAll('[data-social]').forEach(a => {
    const url = SOCIAL_LINKS[a.dataset.social];
    if (url) {
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
    } else {
      a.setAttribute('aria-disabled', 'true');
      a.title = 'Скоро';
      a.addEventListener('click', e => e.preventDefault());
    }
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
  initShopLinks();
  initSocialLinks();
  initVideoAutoplay();
});

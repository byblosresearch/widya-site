/* Widya — small, no-deps interactivity
   - FAQ accordion (single-open optional, currently independent)
   - Category cards expand to show service list
   - IntersectionObserver scroll fade-in (respects reduced motion)
   - Top nav border on scroll
   - Smooth scroll to anchors
*/

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- FAQ ---- */
  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  /* ---- Category cards ---- */
  document.querySelectorAll('.cat-card').forEach((card) => {
    card.addEventListener('click', () => {
      const open = card.getAttribute('aria-expanded') === 'true';
      // Close others (single-open behavior keeps the grid tidy)
      if (!open) {
        document.querySelectorAll('.cat-card[aria-expanded="true"]').forEach((c) => {
          if (c !== card) c.setAttribute('aria-expanded', 'false');
        });
      }
      card.setAttribute('aria-expanded', String(!open));
    });
  });

  /* ---- Scroll fade-in ---- */
  const targets = document.querySelectorAll('.fade-in');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    targets.forEach((el) => io.observe(el));
  }

  /* ---- Top nav border on scroll ---- */
  const topnav = document.getElementById('topnav');
  const onScroll = () => {
    if (window.scrollY > 8) topnav.classList.add('scrolled');
    else topnav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Smooth scroll for in-page anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
})();

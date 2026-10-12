/* Aritra Mukherjee — portfolio interactions
   1. Gate       — soft entry question, remembers the answer.
   2. Nav active — marks the current section for screen readers and styling.
*/

/* ── 1. Gate ───────────────────────────────────────────── */
(() => {
  const gate = document.getElementById('gate');
  if (!gate) return;

  const actions = gate.querySelector('.gate-actions');
  const response = document.getElementById('gate-response');
  const STORAGE_KEY = 'am-portfolio-gate';

  const lines = {
    hiring: 'Good. The CV is in the header, publications are in section 03, and the work is below that.',
    looking: 'Excellent. Fewer expectations, same code.'
  };

  const answer = (choice) => {
    if (!lines[choice]) return;
    actions.hidden = true;
    response.textContent = lines[choice];
    response.hidden = false;
  };

  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (_) { }
  if (saved) answer(saved);

  gate.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-gate]');
    if (!button) return;
    const choice = button.dataset.gate;
    answer(choice);
    try { localStorage.setItem(STORAGE_KEY, choice); } catch (_) { }
  });
})();

/* ── 2. Active-section nav ─────────────────────────────── */
(() => {
  const navLinks = [...document.querySelectorAll('.primary-nav a')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  sections.forEach((section) => observer.observe(section));
})();
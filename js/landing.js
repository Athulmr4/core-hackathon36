/* ====================================================
   FraudShield – landing.js
   ==================================================== */

// ---- Animated Background Particles ----
(function() {
  const container = document.getElementById('bgParticles');
  if (!container) return;
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = Math.random() * 20 + 15;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.4 + 0.05;
    p.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      left:${x}%; top:${y}%;
      background: ${Math.random() > 0.5 ? '#6366f1' : '#06b6d4'};
      border-radius:50%; opacity:${opacity};
      animation: particle-float ${dur}s ${delay}s ease-in-out infinite alternate;
    `;
    container.appendChild(p);
  }

  if (!document.getElementById('particleStyle')) {
    const s = document.createElement('style');
    s.id = 'particleStyle';
    s.textContent = `
      @keyframes particle-float {
        0%   { transform: translate(0, 0) scale(1); }
        33%  { transform: translate(${Math.random()*30-15}px, ${Math.random()*30-15}px) scale(1.2); }
        100% { transform: translate(${Math.random()*40-20}px, ${Math.random()*40-20}px) scale(0.8); }
      }
    `;
    document.head.appendChild(s);
  }
})();

// ---- Stat Counters ----
window.addEventListener('load', () => {
  setTimeout(() => {
    animateCount(document.getElementById('scamsStat'), 24567, '+');
    animateCount(document.getElementById('usersStat'), 142890, '+');
    animateCount(document.getElementById('accuracyStat'), 97, '%');
  }, 600);
});

// ---- Navbar Scroll Effect ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Smooth reveal on scroll ----
const revealEls = document.querySelectorAll('.feature-card, .step-card, .threat-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.animation = 'fadeInUp 0.5s ease both';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => {
  // Do NOT pre-hide — show by default, animate on scroll
  revealObserver.observe(el);
});

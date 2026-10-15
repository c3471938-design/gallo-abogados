(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.section-head,.service,.about-photo,.about-copy,.team-card,.step,.faq details,.contact>div,.contact form,.opinion-layout').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--delay', `${(i % 3) * 65}ms`);
      observer.observe(el);
    });
    document.documentElement.classList.add('reveal-enabled');
    reduced.addEventListener('change', event => { if (event.matches) document.documentElement.classList.remove('reveal-enabled'); });
  }
  const progress = document.querySelector('.scroll-progress');
  let ticking = false;
  const update = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${height > 0 ? Math.min(1, window.scrollY / height) : 0})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update); update();
  const examples = [
    { quote: '“Sentirme escuchado y entender cada paso sería lo más valioso de una asesoría jurídica.”', author: 'Ejemplo de opinión · Atención personal', topic: 'Texto ilustrativo, no corresponde a un cliente real.' },
    { quote: '“Una explicación clara de mis opciones me daría la confianza para tomar una decisión.”', author: 'Ejemplo de opinión · Claridad', topic: 'Texto ilustrativo, no corresponde a un cliente real.' },
    { quote: '“Contar con seguimiento y una comunicación cercana marcaría la diferencia durante mi asunto.”', author: 'Ejemplo de opinión · Acompañamiento', topic: 'Texto ilustrativo, no corresponde a un cliente real.' }
  ];
  let current = 0;
  function render() {
    document.getElementById('quote-text').textContent = examples[current].quote;
    document.getElementById('quote-author').textContent = examples[current].author;
    document.getElementById('quote-topic').textContent = examples[current].topic;
    document.getElementById('quote-index').textContent = `0${current + 1} / 03`;
  }
  document.getElementById('quote-prev').addEventListener('click', () => { current = (current + 2) % 3; render(); });
  document.getElementById('quote-next').addEventListener('click', () => { current = (current + 1) % 3; render(); });
})();

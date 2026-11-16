/* Classic: hero slider (auto-rotates, arrows, dots, pauses on hover, keyboard) */
(function () {
  var root = document.querySelector('[data-slider]');
  if (!root) return;
  var slides = root.querySelectorAll('.sl'), dots = root.querySelectorAll('[data-go]'), i = 0, timer = null;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('on', k === i); s.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
    dots.forEach(function (d, k) { d.classList.remove('on'); if (k === i) { void d.offsetWidth; d.classList.add('on'); } d.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
  }
  function start() { if (reduce) return; stop(); timer = setInterval(function () { show(i + 1); }, 6500); }
  function stop() { if (timer) clearInterval(timer); timer = null; }
  root.querySelector('[data-next]').addEventListener('click', function () { show(i + 1); start(); });
  root.querySelector('[data-prev]').addEventListener('click', function () { show(i - 1); start(); });
  dots.forEach(function (d) { d.addEventListener('click', function () { show(parseInt(d.dataset.go, 10)); start(); }); });
  root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start);
  root.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { show(i + 1); start(); } if (e.key === 'ArrowLeft') { show(i - 1); start(); } });
  show(0); start();
})();

/* measure the info band so the hero photo can continue behind it */
(function () {
  function m() { var ci = document.querySelector('.ci'); if (ci) document.documentElement.style.setProperty('--ov', ci.offsetHeight + 'px'); }
  window.addEventListener('load', m); window.addEventListener('resize', m); m();
})();

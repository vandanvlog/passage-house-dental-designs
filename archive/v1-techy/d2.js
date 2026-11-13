/* Design 2: pinned horizontal scroll */
(function () {
  var s = document.querySelector('[data-hscroll]');
  if (!s) return;
  var track = s.querySelector('[data-track]'), bar = s.querySelector('[data-bar]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size() {
    var dist = Math.max(0, track.scrollWidth - window.innerWidth + 120);
    if (window.innerWidth < 900 || reduce) { s.style.height = ''; s.classList.add('flat'); track.style.transform = ''; return dist; }
    s.classList.remove('flat'); s.style.height = (window.innerHeight + dist) + 'px'; return dist;
  }
  var dist = size(), tick = false;
  function run() {
    tick = false;
    if (s.classList.contains('flat')) return;
    var r = s.getBoundingClientRect(), p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
    track.style.transform = 'translate3d(' + (-dist * p).toFixed(1) + 'px,0,0)';
    bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
  }
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(run); } }, { passive: true });
  window.addEventListener('resize', function () { dist = size(); run(); });
  window.addEventListener('load', function () { dist = size(); run(); });
  run();
})();

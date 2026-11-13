/* Design 4: pinned steps swap the big number + title as each step enters */
(function () {
  var s = document.querySelector('[data-steps]');
  if (!s || !('IntersectionObserver' in window)) return;
  var no = s.querySelector('[data-no]'), title = s.querySelector('[data-title]');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      s.querySelectorAll('li').forEach(function (l) { l.classList.toggle('on', l === e.target); });
      no.classList.add('swap'); title.classList.add('swap');
      setTimeout(function () { no.textContent = e.target.dataset.s; title.textContent = e.target.dataset.t; no.classList.remove('swap'); title.classList.remove('swap'); }, 180);
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  s.querySelectorAll('li').forEach(function (l) { io.observe(l); });
})();

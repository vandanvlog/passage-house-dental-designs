/* Design 3: treatment filter chips */
(function () {
  var grid = document.querySelector('[data-grid]');
  if (!grid) return;
  var btns = document.querySelectorAll('.filters .f');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var g = b.dataset.f;
      btns.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
      grid.querySelectorAll('[data-g]').forEach(function (el, i) {
        var show = g === 'All' || el.dataset.g === g;
        el.hidden = !show;
        if (show) { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = 'pop .6s cubic-bezier(.34,1.56,.64,1) ' + (i % 6) * 40 + 'ms both'; }
      });
    });
  });
})();

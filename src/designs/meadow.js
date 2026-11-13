/* Meadow: "What brings you in today?" finder + services filter */
(function () {
  var opts = document.querySelectorAll('[data-opt]');
  function pick(id) {
    opts.forEach(function (b) { var on = b.dataset.opt === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
    document.querySelectorAll('[data-res]').forEach(function (r) { r.classList.toggle('on', r.dataset.res === id); });
  }
  opts.forEach(function (b) { b.addEventListener('click', function () { pick(b.dataset.opt); }); });

  var grid = document.querySelector('[data-grid]');
  if (!grid) return;
  var btns = document.querySelectorAll('.filters .f');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var g = b.dataset.f;
      btns.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
      grid.querySelectorAll('[data-g]').forEach(function (el, i) {
        var show = g === 'All' || el.dataset.g === g; el.hidden = !show;
        if (show) { var c = el.firstElementChild; c.style.animation = 'none'; void c.offsetWidth; c.style.animation = 'cardIn .7s cubic-bezier(.16,1,.3,1) ' + (i % 8) * 50 + 'ms both'; }
      });
    });
  });
})();

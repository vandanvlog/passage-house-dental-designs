/* T3: "What brings you in today?" finder */
(function () {
  var btns = document.querySelectorAll('[data-opt]');
  if (!btns.length) return;
  function pick(id) {
    btns.forEach(function (b) { var on = b.dataset.opt === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
    document.querySelectorAll('[data-res]').forEach(function (r) { r.classList.toggle('on', r.dataset.res === id); });
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { pick(b.dataset.opt); }); });
})();

/* Shared behaviour for all four designs. No dependencies; Lenis is optional (loaded from CDN if available). */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  root.classList.add('js');

  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }

  /* ---------- Loader (once per session) ---------- */
  var loader = $('.loader');
  if (loader) {
    var seen = false;
    try { seen = sessionStorage.getItem('ph-loaded-' + root.dataset.design); } catch (e) {}
    if (seen || reduce) { loader.remove(); }
    else {
      window.addEventListener('load', function () {
        setTimeout(function () {
          loader.classList.add('done');
          try { sessionStorage.setItem('ph-loaded-' + root.dataset.design, '1'); } catch (e) {}
          setTimeout(function () { loader.remove(); }, 900);
        }, 700);
      });
    }
  }

  /* ---------- Smooth scroll (Lenis, optional) ---------- */
  function startLenis() {
    if (reduce || !window.Lenis) return;
    var lenis = new window.Lenis({ duration: 1.1, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    window.__lenis = lenis;
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
  if (doc.readyState === 'complete') startLenis(); else window.addEventListener('load', startLenis);

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else { revealEls.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- Counters ---------- */
  $$('[data-count]').forEach(function (el) {
    var to = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    function set(v) { el.textContent = pre + v.toFixed(dec) + suf; }
    if (reduce || !('IntersectionObserver' in window)) { set(to); return; }
    var o = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; o.disconnect();
      var t0 = performance.now(), dur = 1400;
      (function tick(t) { var p = Math.min(1, (t - t0) / dur); set(to * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(tick); })(t0);
    }); o.observe(el);
  });

  /* ---------- Parallax + scroll progress ---------- */
  var par = $$('[data-parallax]');
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY, h = Math.max(1, doc.body.scrollHeight - window.innerHeight);
      root.style.setProperty('--sp', (y / h).toFixed(4));
      root.classList.toggle('scrolled', y > 40);
      if (!reduce) par.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        var s = parseFloat(el.dataset.parallax) || 0.1;
        el.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - window.innerHeight / 2) * -s).toFixed(1) + 'px,0)';
      });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Magnetic buttons ---------- */
  if (fine && !reduce) {
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + (x * 0.22).toFixed(1) + 'px,' + (y * 0.3).toFixed(1) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- Custom cursor ---------- */
  if (fine && !reduce && doc.body.hasAttribute('data-cursor')) {
    var dot = doc.createElement('div'); dot.className = 'cursor';
    doc.body.appendChild(dot);
    var cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; dot.classList.add('on'); });
    (function loop() { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; dot.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)'; requestAnimationFrame(loop); })();
    doc.addEventListener('mouseover', function (e) { dot.classList.toggle('hover', !!e.target.closest('a,button,summary,label,input,select,textarea,[data-hover]')); });
  }

  /* ---------- Menu toggle ---------- */
  $$('[data-menu-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = doc.body.classList.toggle('menu-open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  $$('[data-menu] a:not([data-mega-toggle])').forEach(function (a) { a.addEventListener('click', function () { doc.body.classList.remove('menu-open'); }); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') doc.body.classList.remove('menu-open'); });

  /* ---------- Mega menu: tap to open on touch / small screens, Escape to close ---------- */
  $$('[data-mega-toggle]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 960px)').matches) { e.preventDefault(); a.parentElement.classList.toggle('open'); }
    });
  });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') $$('.has-mega.open').forEach(function (m) { m.classList.remove('open'); }); });

  /* ---------- Open now / today's hours ---------- */
  var H = [null, ['08:30', '17:30'], ['08:30', '18:30'], ['08:30', '17:00'], ['08:00', '17:30'], ['08:00', '16:00'], null]; // Mon..Sat idx by getDay; Sun idx 0
  H = [null, ['08:30', '17:30'], ['08:30', '18:30'], ['08:30', '17:00'], ['08:00', '17:30'], ['08:00', '16:00'], null];
  function londonNow() {
    var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { d: map[o.weekday], m: parseInt(o.hour, 10) % 24 * 60 + parseInt(o.minute, 10) };
  }
  function mins(s) { var a = s.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); }
  var n = londonNow(), today = H[n.d], text, open = false;
  if (today && n.m >= mins(today[0]) && n.m < mins(today[1])) { open = true; text = 'Open now - until ' + today[1]; }
  else if (today && n.m < mins(today[0])) { text = 'Opens today at ' + today[0]; }
  else { var nd = (n.d + 1) % 7, k = 0; while (!H[nd] && k < 7) { nd = (nd + 1) % 7; k++; } text = 'Closed - opens ' + ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][nd] + ' ' + H[nd][0]; }
  $$('[data-open-now]').forEach(function (el) { el.textContent = text; el.classList.toggle('is-open', open); });
  $$('[data-hours-row]').forEach(function (el) { if (parseInt(el.dataset.hoursRow, 10) === n.d) el.classList.add('today'); });

  /* ---------- Booking wizard (front-end request form; no backend yet) ---------- */
  var bk = $('[data-booking]');
  if (bk) initBooking(bk);

  function initBooking(bk) {
    var data = JSON.parse($('#bk-data').textContent);
    var state = { type: null, funding: 'nhs', patient: 'existing', who: 'any', date: null, time: null };
    var panels = $$('[data-step]', bk), bar = $$('[data-bar]', bk);
    var step = 1;
    var dateWrap = $('[data-dates]', bk), timeWrap = $('[data-times]', bk), whoSel = $('[data-who]', bk);

    function show(n) {
      step = n;
      panels.forEach(function (p) { p.hidden = parseInt(p.dataset.step, 10) !== n; });
      bar.forEach(function (b) { var i = parseInt(b.dataset.bar, 10); b.classList.toggle('on', i <= n); b.classList.toggle('cur', i === n); });
      var cur = $('[data-step="' + n + '"]', bk); if (cur) { var h = $('[data-focus]', cur); if (h) h.focus({ preventScroll: true }); }
      if (n > 1 || bk.dataset.started) { var top = bk.getBoundingClientRect().top + window.scrollY - 96; window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' }); }
      bk.dataset.started = '1';
      if (n === 4) summary();
      $$('[data-next]', bk).forEach(function (b) { gate(); });
    }
    function gate() {
      var ok = { 1: !!state.type, 2: true, 3: !!(state.date && state.time) };
      $$('[data-next]', bk).forEach(function (b) { var s = parseInt(b.closest('[data-step]').dataset.step, 10); b.disabled = ok[s] === false; });
    }

    // Step 1
    $$('input[name="type"]', bk).forEach(function (r) { r.addEventListener('change', function () { state.type = r.value; fillWho(); gate(); }); });
    $$('input[name="funding"]', bk).forEach(function (r) { r.addEventListener('change', function () { state.funding = r.value; }); });
    $$('input[name="patient"]', bk).forEach(function (r) { r.addEventListener('change', function () { state.patient = r.value; }); });

    function fillWho() {
      var t = data.types.filter(function (x) { return x.id === state.type; })[0];
      var list = data.clinicians.filter(function (c) { return t && (c.kind === t.who || (t.who === 'dentist' && c.kind === 'implant')); });
      whoSel.innerHTML = '<option value="any">First available - no preference</option>' + list.map(function (c) { return '<option>' + c.name + '</option>'; }).join('');
      state.who = 'any';
    }
    whoSel.addEventListener('change', function () { state.who = whoSel.value; });

    // Step 3 dates
    var days = [], d = new Date(); d.setHours(12, 0, 0, 0);
    while (days.length < 12) { d.setDate(d.getDate() + 1); var wd = d.getDay(); if (data.hours[wd]) days.push(new Date(d)); }
    var fmtD = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    dateWrap.innerHTML = days.map(function (x, i) { var p = fmtD.format(x).split(' '); return '<button type="button" class="chip" data-i="' + i + '"><span>' + fmtD.format(x) + '</span></button>'; }).join('');
    dateWrap.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      $$('.chip', dateWrap).forEach(function (c) { c.classList.remove('sel'); }); b.classList.add('sel');
      var x = days[parseInt(b.dataset.i, 10)]; state.date = x; state.dateLabel = fmtD.format(x); state.time = null; buildTimes(x); gate();
    });
    function buildTimes(x) {
      var h = data.hours[x.getDay()], s = mins(h[0]), e = mins(h[1]) - 30, out = [];
      for (var m = s; m <= e; m += 60) out.push(('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + m % 60).slice(-2));
      timeWrap.innerHTML = out.map(function (t) { return '<button type="button" class="chip" data-t="' + t + '"><span>' + t + '</span></button>'; }).join('');
    }
    timeWrap.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      $$('.chip', timeWrap).forEach(function (c) { c.classList.remove('sel'); }); b.classList.add('sel'); state.time = b.dataset.t; gate();
    });

    function label(id) { var t = data.types.filter(function (x) { return x.id === id; })[0]; return t ? t.label : ''; }
    var fl = { nhs: 'NHS', private: 'Private', plan: 'Dental Plan member' };
    function summary() {
      $('[data-summary]', bk).innerHTML =
        '<li><span>Appointment</span><b>' + label(state.type) + '</b></li>' +
        '<li><span>Care</span><b>' + fl[state.funding] + ' - ' + (state.patient === 'new' ? 'new patient' : 'existing patient') + '</b></li>' +
        '<li><span>Clinician</span><b>' + (state.who === 'any' ? 'First available' : state.who) + '</b></li>' +
        '<li><span>Preferred time</span><b>' + state.dateLabel + ' at ' + state.time + '</b></li>';
    }

    bk.addEventListener('click', function (e) {
      if (e.target.closest('[data-next]')) show(step + 1);
      if (e.target.closest('[data-prev]')) show(step - 1);
    });
    $('form', bk).addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target, req = {
        when: new Date().toISOString(), type: label(state.type), funding: fl[state.funding], patient: state.patient,
        clinician: state.who, date: state.dateLabel, time: state.time, name: f.name.value, email: f.email.value, phone: f.phone.value, notes: f.notes.value
      };
      try { var a = JSON.parse(localStorage.getItem('ph-requests') || '[]'); a.push(req); localStorage.setItem('ph-requests', JSON.stringify(a)); } catch (er) {}
      var body = 'Appointment request%0D%0A%0D%0A' + ['Name: ' + req.name, 'Phone: ' + req.phone, 'Email: ' + req.email, 'Appointment: ' + req.type, 'Care: ' + req.funding + ' (' + req.patient + ' patient)', 'Clinician: ' + req.clinician, 'Preferred: ' + req.date + ' at ' + req.time, 'Notes: ' + req.notes].map(encodeURIComponent).join('%0D%0A');
      $('[data-mailto]', bk).href = 'mailto:' + data.email + '?subject=' + encodeURIComponent('Appointment request - ' + req.name) + '&body=' + body;
      $('[data-name-out]', bk).textContent = req.name.split(' ')[0];
      show(5);
    });
    show(1); gate();
  }
})();

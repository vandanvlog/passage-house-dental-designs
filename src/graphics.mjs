// Hand-built SVG illustrations. Colours come from CSS variables so each theme recolours them.
export const wave = (fill = 'var(--bg2)', flip = false, h = 80) =>
  `<svg class="wave" viewBox="0 0 1440 ${h}" preserveAspectRatio="none" aria-hidden="true" style="${flip ? 'transform:scaleY(-1)' : ''}"><path fill="${fill}" d="M0 ${h * 0.5}C240 0 480 ${h} 720 ${h * 0.5}S1200 0 1440 ${h * 0.5}V${h}H0Z"/></svg>`;

export const tooth = (cls = '', face = true) => `
<svg class="tooth-ch ${cls}" viewBox="0 0 240 260" aria-hidden="true">
  <path d="M120 22C94 8 58 16 52 52c-6 28 8 48 12 74 4 26 6 62 22 68 14 5 18-30 34-30s20 35 34 30c16-6 18-42 22-68 4-26 18-46 12-74-6-36-42-44-68-30z" fill="#fff" stroke="var(--accent)" stroke-width="5" stroke-linejoin="round"/>
  <path d="M82 50c6-9 18-13 28-10" stroke="var(--soft2)" stroke-width="7" stroke-linecap="round" fill="none"/>
  ${face ? `<g class="eyes"><circle cx="100" cy="92" r="6" fill="var(--accent)"/><circle cx="140" cy="92" r="6" fill="var(--accent)"/></g>
  <path class="smile" d="M102 114q18 16 36 0" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" fill="none"/>
  <circle cx="82" cy="110" r="9" fill="var(--pop)" opacity=".3"/><circle cx="158" cy="110" r="9" fill="var(--pop)" opacity=".3"/>` : ''}
</svg>`;

export const sparkle = (cls = '') => `<svg class="spk ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" fill="currentColor"/></svg>`;

export const scene = () => `
<svg class="scene" viewBox="0 0 560 420" role="img" aria-label="Illustration of a smiling tooth under a sunny sky">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--soft)"/><stop offset="1" stop-color="var(--bg)"/></linearGradient></defs>
  <rect width="560" height="420" rx="40" fill="url(#sky)"/>
  <circle class="sun" cx="450" cy="92" r="46" fill="var(--pop)" opacity=".9"/>
  <g class="cloud c1" fill="#fff" opacity=".95"><ellipse cx="110" cy="96" rx="52" ry="22"/><ellipse cx="150" cy="84" rx="36" ry="24"/><ellipse cx="80" cy="86" rx="28" ry="18"/></g>
  <g class="cloud c2" fill="#fff" opacity=".8"><ellipse cx="380" cy="168" rx="42" ry="16"/><ellipse cx="408" cy="158" rx="26" ry="16"/></g>
  <path d="M0 330C110 280 200 300 290 330s190 30 270-20V420H0z" fill="var(--soft2)"/>
  <path d="M0 370C120 330 240 360 340 372s160-10 220-34V420H0z" fill="var(--accent)" opacity=".92"/>
  <g transform="translate(168 98) scale(.98)">${tooth('hero-tooth')}</g>
  <path d="M60 300q10-30 0-60M60 270q-14-6-18-20M60 256q14-8 16-22" stroke="var(--accent)" stroke-width="4" fill="none" stroke-linecap="round" opacity=".5"/>
  <path d="M500 310q-8-26 0-52M500 286q12-4 16-18" stroke="var(--accent)" stroke-width="4" fill="none" stroke-linecap="round" opacity=".5"/>
</svg>`;

export const faces = () => {
  const f = (cx, cy, r, skin, hair) => `<g class="fc"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${skin}"/><path d="M${cx - r} ${cy - r * 0.1}a${r} ${r} 0 0 1 ${2 * r} 0c-${r * 0.5}-${r * 0.5}-${r * 1.4}-${r * 0.5}-${2 * r} 0z" fill="${hair}"/><circle cx="${cx - r * 0.35}" cy="${cy + r * 0.05}" r="${r * 0.07}" fill="#2b2b2b"/><circle cx="${cx + r * 0.35}" cy="${cy + r * 0.05}" r="${r * 0.07}" fill="#2b2b2b"/><path d="M${cx - r * 0.35} ${cy + r * 0.35}q${r * 0.35} ${r * 0.3} ${r * 0.7} 0" stroke="#2b2b2b" stroke-width="${Math.max(2, r * 0.07)}" fill="none" stroke-linecap="round"/></g>`;
  return `<svg class="faces-svg" viewBox="0 0 640 220" role="img" aria-label="Illustration of a smiling family of four faces">
  ${f(110, 130, 46, '#F6D3B6', '#5b3a29')}${f(250, 110, 66, '#E8B995', '#2f2a2a')}${f(410, 105, 72, '#F1C9A5', '#8a5a3c')}${f(550, 135, 42, '#D9A67F', '#241c1a')}
  </svg>`;
};

export const implant = () => `<svg class="fi" viewBox="0 0 220 200" aria-hidden="true"><path d="M20 120c30-24 70-24 100-8s60 8 80-12v100H20z" fill="var(--soft2)"/><path d="M70 20c-26 0-36 26-30 46 4 16 18 20 24 30h92c6-10 20-14 24-30 6-20-4-46-30-46-16 0-22 8-40 8S86 20 70 20z" fill="#fff" stroke="var(--accent)" stroke-width="5" stroke-linejoin="round"/><rect x="98" y="100" width="44" height="76" rx="10" fill="var(--pop)"/><path d="M98 118h44M98 134h44M98 150h44" stroke="#fff" stroke-width="5" opacity=".7"/></svg>`;
export const braces = () => `<svg class="fi" viewBox="0 0 220 200" aria-hidden="true"><g fill="#fff" stroke="var(--accent)" stroke-width="5"><rect x="14" y="62" width="44" height="74" rx="18"/><rect x="62" y="52" width="44" height="86" rx="18"/><rect x="110" y="52" width="44" height="86" rx="18"/><rect x="158" y="62" width="44" height="74" rx="18"/></g><path d="M18 98h184" stroke="var(--accent)" stroke-width="5"/><g fill="var(--pop)"><rect x="28" y="88" width="16" height="20" rx="4"/><rect x="76" y="88" width="16" height="20" rx="4"/><rect x="124" y="88" width="16" height="20" rx="4"/><rect x="172" y="88" width="16" height="20" rx="4"/></g></svg>`;
export const clean = () => `<svg class="fi" viewBox="0 0 220 200" aria-hidden="true"><g transform="translate(110 100) rotate(-28)"><rect x="-12" y="10" width="24" height="86" rx="12" fill="var(--pop)"/><rect x="-18" y="-56" width="36" height="72" rx="14" fill="#fff" stroke="var(--accent)" stroke-width="5"/><path d="M-9-42v44M0-42v44M9-42v44" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round" opacity=".5"/></g><g fill="var(--soft2)"><circle cx="42" cy="48" r="16"/><circle cx="176" cy="62" r="12"/><circle cx="156" cy="150" r="18"/><circle cx="50" cy="150" r="9"/></g><g fill="var(--pop)"><path d="M168 24l4 11 11 4-11 4-4 11-4-11-11-4 11-4z"/></g></svg>`;

// Winding path for "how booking works"
export const path = () => `<svg class="wpath" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path class="draw" pathLength="1" d="M20 60C150 0 220 120 340 60S520 0 660 60 860 120 980 60" fill="none" stroke="var(--pop)" stroke-width="5" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`;

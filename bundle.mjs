// node build.mjs && node bundle.mjs  ->  share/Passage-House-Dental-Designs.html  (one self-contained, shareable file)
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative, extname } from 'node:path';
import { gzipSync } from 'node:zlib';
import { designs as lux } from './src/designs/lux.mjs';
import { designs as classic } from './src/designs/classic.mjs';
import { meta } from './src/showcase.mjs';

const dist = resolve('dist');
const designs = [...lux, ...classic];
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });

const pack = { designs: [], rows: [], base: readFileSync('shared/base.css', 'utf8'), common: readFileSync('shared/common.js', 'utf8'), css: {}, extra: {}, pages: {}, assets: {} };
for (const D of designs) {
  const m = meta[D.id];
  pack.designs.push({ id: D.id, folder: D.folder, name: D.name, tag: m.tag, desc: m.desc, sw: m.sw });
  pack.css[D.folder] = readFileSync(join(dist, D.folder, 'style.css'), 'utf8');
  if (existsSync(join(dist, D.folder, 'extra.js'))) pack.extra[D.folder] = readFileSync(join(dist, D.folder, 'extra.js'), 'utf8');
}
pack.rows = [
  { title: 'Our main design, in three colours', sub: 'Centred logo, a pill menu with a Services dropdown, and a calm, luxurious feel.', ids: designs.filter((D) => D.id[0] === 'b').map((D) => D.id) },
  { title: "Your current website's layout, in three colours", sub: 'Same structure as passagehousedental.co.uk (slider, menu bar, info band, four tiles), modernised.', ids: designs.filter((D) => D.id[0] === 'c').map((D) => D.id) },
  { title: 'Other design directions', sub: 'Different layouts, same quality and content.', ids: designs.filter((D) => 'hm'.includes(D.id[0])).map((D) => D.id) },
];

const assetRe = /(?:\.\.\/)+shared\/((?:assets|photos)\/[\w.\-]+)/g;
const used = new Set();
for (const file of walk(dist).filter((p) => p.endsWith('.html') && /design-\d/.test(p.replace(dist, '')))) {
  let h = readFileSync(file, 'utf8');
  const rel = relative(dist, file).replaceAll(String.fromCharCode(92), '/');
  const route = dirname(rel);
  // internal links -> viewer routes
  h = h.replace(/href="([^"#:]+)"/g, (m, href) => {
    const target = relative(dist, resolve(dirname(file), href)).replaceAll(String.fromCharCode(92), '/');
    if (!/index\.html$/.test(target)) return m;
    const r = dirname(target).replace(/^\.$/, '');
    return `href="#/${r}" data-go="${r}"`;
  });
  // css/js -> markers (inlined once per design at load time)
  h = h.replace(/<link rel="stylesheet" href="[^"]*base\.css">\s*/, '<!--CSS-->').replace(/<link rel="stylesheet" href="[^"]*style\.css">\s*/, '');
  h = h.replace(/<script src="[^"]*common\.js" defer><\/script>\s*/, '<!--JS-->').replace(/<script src="[^"]*extra\.js" defer><\/script>\s*/, '');
  for (const m of h.matchAll(assetRe)) used.add(m[1]);
  pack.pages[route] = h;
}
for (const a of used) {
  const f = join('shared', a);
  const ext = extname(f).slice(1);
  pack.assets[a] = { type: ext === 'jpg' ? 'image/jpeg' : 'image/png', b64: readFileSync(f).toString('base64') };
}
const gz = gzipSync(Buffer.from(JSON.stringify(pack)), { level: 9 }).toString('base64');
const tpl = readFileSync('src/viewer.html', 'utf8');
mkdirSync('share', { recursive: true });
const out = 'share/Passage-House-Dental-Designs.html';
writeFileSync(out, tpl.replace('/*__DATA__*/', () => gz));
console.log(`pages: ${Object.keys(pack.pages).length}, assets: ${used.size}, file: ${(statSync(out).size / 1048576).toFixed(2)} MB`);

// Static site generator: node build.mjs  ->  dist/
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pageList } from './src/pages.mjs';
import { makeCtx, esc } from './src/lib.mjs';
import { showcase } from './src/showcase.mjs';
import { designs as lux } from './src/designs/lux.mjs';
import { designs as classic } from './src/designs/classic.mjs';
const designs = [...lux, ...classic];

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
mkdirSync(dist, { recursive: true });
// Clear contents (not the folder itself, so a dev server running inside dist keeps working)
for (const n of readdirSync(dist)) rmSync(join(dist, n), { recursive: true, force: true });
cpSync(join(root, 'shared'), join(dist, 'shared'), { recursive: true });

let count = 0;
for (const D of designs) {
  const out = join(dist, D.folder);
  mkdirSync(out, { recursive: true });
  const cssList = D.cssFiles || [D.cssFile || D.id + '.css'];
  writeFileSync(join(out, 'style.css'), cssList.map((f) => readFileSync(join(root, 'src/designs', f), 'utf8')).join(String.fromCharCode(10)));
  if (D.jsFile) cpSync(join(root, 'src/designs', D.jsFile), join(out, 'extra.js'));

  for (const p of pageList(D)) {
    const depth = p.path ? p.path.split('/').length : 0;
    const c = makeCtx(D, depth); c.path = p.path;
    const body = p.body(c);
    const title = p.path ? `${p.title} | Passage House Dental Care` : p.title;
    let html = `<!doctype html>
<html lang="en-GB" data-design="${D.id}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(p.desc)}">
<meta name="theme-color" content="${D.themeColor}">
<link rel="icon" type="image/png" href="${c.sh('assets/mark-navy.png')}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${D.fonts}" rel="stylesheet">
<link rel="stylesheet" href="${c.sh('base.css')}">
<link rel="stylesheet" href="${c.d('style.css')}">
</head>
<body ${D.bodyAttrs || ''}>
<a class="skip" href="#main">Skip to content</a>
${D.shell(c, body)}
<script src="${c.sh('common.js')}" defer></script>
${D.jsFile ? `<script src="${c.d('extra.js')}" defer></script>` : ''}
</body>
</html>`;
    html = html.replaceAll('%%SH%%', c.sh(''));
    const dir = join(out, p.path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
    count++;
  }
}
writeFileSync(join(dist, 'index.html'), showcase(designs));
console.log(`Built ${count} pages across ${designs.length} designs -> ${dist}`);

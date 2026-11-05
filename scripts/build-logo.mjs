// Redraws the client's three-block ESTEEM logo in its original colours as outlined vectors,
// on a transparent background with the site's typefaces for the lines below the blocks.
// Outputs src/data/logo.js (theme-aware inline SVG), public/favicon.png and brand/ files.
// Usage: node scripts/build-logo.mjs
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const opentype = require('opentype.js');
const FONT_DIR = path.resolve('scripts/fonts');

// TTFs are downloaded on first run.
async function font(file, family, variant) {
  const p = path.join(FONT_DIR, file);
  if (!fs.existsSync(p)) {
    fs.mkdirSync(FONT_DIR, { recursive: true });
    const css = await (await fetch(`https://fonts.googleapis.com/css?family=${encodeURIComponent(family)}:${variant}`, { headers: { 'User-Agent': 'Mozilla/4.0' } })).text();
    const url = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) throw new Error(`no TTF for ${family} ${variant}`);
    fs.writeFileSync(p, Buffer.from(await (await fetch(url)).arrayBuffer()));
  }
  const b = fs.readFileSync(p);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}
const heavy = await font('Montserrat-800.ttf', 'Montserrat', '800');
const label = await font('Manrope-700.ttf', 'Manrope', '700');
const serif = await font('InstrumentSerif-Italic.ttf', 'Instrument Serif', '400italic');

const r = (n) => Math.round(n * 100) / 100;
const pathData = (p) => p.commands.map((c) => {
  if (c.type === 'M' || c.type === 'L') return c.type + r(c.x) + ' ' + r(c.y);
  if (c.type === 'Q') return 'Q' + [c.x1, c.y1, c.x, c.y].map(r).join(' ');
  if (c.type === 'C') return 'C' + [c.x1, c.y1, c.x2, c.y2, c.x, c.y].map(r).join(' ');
  return 'Z';
}).join('');

function measure(f, str, size, tracking = 0) {
  const g = Array.from(str).map((c) => f.charToGlyph(c));
  let w = 0;
  g.forEach((x, i) => { w += (x.advanceWidth / f.unitsPerEm) * size; if (i < g.length - 1) w += tracking * size + ((f.getKerningValue(x, g[i + 1]) || 0) / f.unitsPerEm) * size; });
  return w;
}
function text(f, str, cx, baseline, size, tracking, fill) {
  const g = Array.from(str).map((c) => f.charToGlyph(c));
  let x = cx - measure(f, str, size, tracking) / 2;
  let d = '';
  g.forEach((gl, i) => {
    d += pathData(gl.getPath(x, baseline, size));
    x += (gl.advanceWidth / f.unitsPerEm) * size + tracking * size;
    if (i < g.length - 1) x += ((f.getKerningValue(gl, g[i + 1]) || 0) / f.unitsPerEm) * size;
  });
  return `<path d="${d}" fill="{${fill}}"/>`;
}
// Font size that makes a tracked line exactly `width` wide.
const fit = (f, str, width, tracking) => width / measure(f, str, 1, tracking);

// ---- geometry
const H = 150, SIZE = 118, TRACK = 0.03, OUTER = 30, INNER = 5, RAD = 12; // small inner padding keeps ESTEEM reading as one word
const parts = ['ES', 'TE', 'EM'];
const pads = [[OUTER, INNER], [INNER, INNER], [INNER, OUTER]];
const widths = parts.map((s, i) => measure(heavy, s, SIZE, TRACK) + pads[i][0] + pads[i][1]);
const W = widths.reduce((a, b) => a + b, 0);
const capH = (heavy.tables.os2.sCapHeight / heavy.unitsPerEm) * SIZE;
const base = (H + capH) / 2;

let x = 0, blocks = '';
parts.forEach((s, i) => {
  const w = widths[i];
  const shape = i === 0 ? `M${r(x + RAD)} 0H${r(x + w)}V${H}H${r(x + RAD)}A${RAD} ${RAD} 0 0 1 ${r(x)} ${H - RAD}V${RAD}A${RAD} ${RAD} 0 0 1 ${r(x + RAD)} 0Z`
    : i === 2 ? `M${r(x)} 0H${r(x + w - RAD)}A${RAD} ${RAD} 0 0 1 ${r(x + w)} ${RAD}V${H - RAD}A${RAD} ${RAD} 0 0 1 ${r(x + w - RAD)} ${H}H${r(x)}Z`
      : `M${r(x)} 0H${r(x + w)}V${H}H${r(x)}Z`;
  blocks += `<path d="${shape}" fill="{${'ABC'[i]}}"/>` + text(heavy, s, x + pads[i][0] + measure(heavy, s, SIZE, TRACK) / 2, base, SIZE, TRACK, 'L');
  x += w;
});

const NAME = 'INTERIOR CONSULTANTS', TAG = 'Trust That Builds. Design That Inspires.';
const nameSize = fit(label, NAME, W, 0.17);
const nameBase = H + 26 + nameSize * 0.74;
const nameLine = text(label, NAME, W / 2, nameBase, nameSize, 0.17, 'T');
const tagSize = fit(serif, TAG, W * 0.98, 0.01);
const tagBase = nameBase + 20 + tagSize * 0.72;
const tagLine = text(serif, TAG, W / 2, tagBase, tagSize, 0.01, 'G');

const PADOUT = 4;
const wrap = (body, h) => ({ w: r(W + PADOUT * 2), h: r(h + PADOUT * 2), body: `<g transform="translate(${PADOUT} ${PADOUT})">${body}</g>` });
const compact = wrap(blocks + nameLine, nameBase + nameSize * 0.12);
const full = wrap(blocks + nameLine + tagLine, tagBase + tagSize * 0.28);

// ---- palettes: original logo colours (sampled from the client file); only the lines below change with the background
const LIGHT = { A: '#F96C1E', B: '#2792DA', C: '#A3CE36', L: '#FFFFFF', T: '#2B2723', G: '#7E6444' };
const DARK = { A: '#F96C1E', B: '#2792DA', C: '#A3CE36', L: '#FFFFFF', T: '#FFFFFF', G: '#E2C9A3' };

// ---- inline module: colours come from CSS variables so the logo follows its background
const VAR = { A: '--lg-a', B: '--lg-b', C: '--lg-c', L: '--lg-letter', T: '--lg-text', G: '--lg-tag' };
const inline = (s) => s.replace(/fill="\{([A-Z])\}"/g, (_, k) => `style="fill:var(${VAR[k]})"`);
fs.writeFileSync('src/data/logo.js', `// AUTO-GENERATED by scripts/build-logo.mjs. Colours come from the --lg-* CSS variables.\nexport const LOGO = ${JSON.stringify({ compact: { ...compact, body: inline(compact.body) }, full: { ...full, body: inline(full.body) } })};\n`);

// ---- static files
const paint = (s, pal) => s.replace(/\{([A-Z])\}/g, (_, k) => pal[k]);
const doc = (g, pal) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${g.w} ${g.h}" width="${g.w}" height="${g.h}">${paint(g.body, pal)}</svg>\n`;
fs.mkdirSync('brand', { recursive: true });
for (const [name, g, pal] of [['esteem-logo', full, LIGHT], ['esteem-logo-on-dark', full, DARK], ['esteem-logo-compact', compact, LIGHT], ['esteem-logo-compact-on-dark', compact, DARK]]) {
  const svg = doc(g, pal);
  fs.writeFileSync(`brand/${name}.svg`, svg);
  await sharp(Buffer.from(svg), { density: 300 }).resize({ width: 2000 }).png().toFile(`brand/${name}.png`);
}

// Favicon: the first block's E
const eSize = 150, eCap = (heavy.tables.os2.sCapHeight / heavy.unitsPerEm) * eSize;
const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect width="180" height="180" rx="34" fill="${LIGHT.A}"/>${paint(text(heavy, 'E', 90, (180 + eCap) / 2, eSize, 0, 'L'), LIGHT)}</svg>`;
await sharp(Buffer.from(fav)).resize(180, 180).png().toFile('public/favicon.png');
if (fs.existsSync('public/logo.webp')) fs.unlinkSync('public/logo.webp');
console.log('logo built', compact.w, compact.h, full.w, full.h);

// Builds the site for GitHub Pages into docs/ (Pages serves main → /docs), then commits and pushes.
// Usage: npm run deploy
import { execSync } from 'child_process';
import fs from 'fs';

const REPO = 'esteem-interiors-website';
const run = (cmd, env) => execSync(cmd, { stdio: 'inherit', env: { ...process.env, ...env } });

run('npx vite build --outDir docs --emptyOutDir', { BASE_PATH: `/${REPO}/` });
fs.writeFileSync('docs/.nojekyll', '');
// Client-side routes (/about, /projects/…) fall back to the app.
fs.copyFileSync('docs/index.html', 'docs/404.html');
// Give every route its own index.html so deep links return 200 (good for sharing and search).
const { PROJECT_IDS } = await import('./routes.mjs');
for (const route of ['about', 'projects', 'services', 'contact', ...PROJECT_IDS.map((id) => 'projects/' + id)]) {
  fs.mkdirSync('docs/' + route, { recursive: true });
  fs.copyFileSync('docs/index.html', 'docs/' + route + '/index.html');
}

run('git add docs');
try { run('git commit -m "Deploy site"'); } catch { console.log('No changes to deploy.'); }
run('git push origin HEAD:main');
console.log(`Published → https://mahammad-rizwan.github.io/${REPO}/`);

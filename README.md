# Esteem Interiors & Consultants: Website

Five-page React site (Home, About Us, Projects, Services, Contact) in the "Scandi Oak" theme.

**Live:** https://mahammad-rizwan.github.io/esteem-interiors-website/

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run deploy   # build for GitHub Pages and publish to the gh-pages branch
```

## Content

- `src/data/site.js`: all copy, contact details, socials, services, projects
- `public/media/`: curated project photos (WebP, 3 sizes) and films (MP4 + poster), produced by `scripts/build-media.mjs` from the client's Resources folder
- `public/clients/`: client logos
- `public/founder.webp`: founder portrait

To change which photos or films appear, edit `PICKS` in `scripts/build-media.mjs` and run it with `FFMPEG=<path to ffmpeg>`.

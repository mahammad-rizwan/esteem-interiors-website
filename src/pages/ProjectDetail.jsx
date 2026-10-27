import { useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Play, Maximize2 } from 'lucide-react';
import { InViewVideo, Lightbox } from '../components/Media';
import { Reveal, SplitHeading, Eyebrow, Button, imgProps, EASE } from '../components/ui';
import { PROJECTS, projectById } from '../data/site';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectById(id);
  const [open, setOpen] = useState(null);
  const items = useMemo(() => project ? [
    ...project.videos.map((v) => ({ type: 'video', ...v })),
    ...project.photos.map((p) => ({ type: 'photo', ...p })),
  ] : [], [project]);
  if (!project) return <Navigate to="/projects" replace />;

  const idx = PROJECTS.indexOf(project);
  const nextP = PROJECTS[(idx + 1) % PROJECTS.length];
  const prevP = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const nVid = project.videos.length;

  return (
    <>
      <section className="pd-hero">
        <InViewVideo video={project.videos[0]} className="pd-hero-video" label={`${project.title} film`} />
        <div className="pd-hero-shade" />
        <div className="container pd-hero-copy">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}>
            <Link to="/projects" className="pd-back"><ArrowLeft size={16} /> All projects</Link>
          </motion.div>
          <motion.p className="pd-cat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>{project.category} · {project.location}</motion.p>
          <SplitHeading as="h1" immediate delay={0.2} text={project.title} className="pd-title" />
          <motion.p className="pd-scope" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: EASE }}>{project.scope}</motion.p>
        </div>
      </section>

      <section className="section pd-overview">
        <div className="container pd-overview-grid">
          <div>
            <Reveal><Eyebrow>The project</Eyebrow></Reveal>
            <Reveal delay={0.05}><p className="pd-summary">{project.summary}</p></Reveal>
            <Reveal delay={0.1} className="pd-facts">
              <div><span>Location</span><b>{project.location}</b></div>
              <div><span>Sector</span><b>{project.category}</b></div>
              <div><span>Scope</span><b>{project.scope.split(' · ')[0]}</b></div>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="pd-highlights">
            <h3>Highlights</h3>
            <ul>{project.highlights.map((h) => <li key={h}><Check size={16} /> {h}</li>)}</ul>
          </Reveal>
        </div>
      </section>

      <section className="section pd-films">
        <div className="container">
          <div className="split-head">
            <div><Reveal><Eyebrow>Films</Eyebrow></Reveal><SplitHeading text="On site, *in motion.*" className="section-title" /></div>
            <Reveal className="pd-count">{nVid} short films · {project.photos.length} photographs</Reveal>
          </div>
          <div className={`film-grid n${Math.min(nVid, 4)}`}>
            {project.videos.map((v, i) => (
              <Reveal key={v.src} delay={(i % 3) * 0.06} className="film-tile">
                <button onClick={() => setOpen(i)} aria-label={`Open film ${i + 1}`}>
                  <InViewVideo video={v} className="film-video" />
                  <span className="film-play"><Play size={16} fill="currentColor" /></span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pd-gallery">
        <div className="container">
          <div className="split-head">
            <div><Reveal><Eyebrow>Gallery</Eyebrow></Reveal><SplitHeading text="Every *detail.*" className="section-title" /></div>
          </div>
          <div className="masonry">
            {project.photos.map((p, i) => (
              <Reveal key={p.src} delay={(i % 3) * 0.05} className="masonry-item">
                <button onClick={() => setOpen(nVid + i)} aria-label={`Open photo ${i + 1}`} style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                  <img {...imgProps(p, '(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw')} alt={`${project.title}, ${project.location}, photo ${i + 1}`} loading="lazy" />
                  <span className="masonry-zoom"><Maximize2 size={16} /></span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pd-next">
        <div className="container pd-next-grid">
          <Link to={`/projects/${prevP.id}`} className="pd-nav prev">
            <span><ArrowLeft size={16} /> Previous</span>
            <b>{prevP.title}</b><small>{prevP.location}</small>
          </Link>
          <Link to={`/projects/${nextP.id}`} className="pd-nav next" style={{ backgroundImage: `url(${nextP.photos[0].md})` }}>
            <span>Next project <ArrowRight size={16} /></span>
            <b>{nextP.title}</b><small>{nextP.location}</small>
          </Link>
        </div>
        <div className="container center-cta"><Button to="/contact">Plan a project like this</Button></div>
      </section>

      <AnimatePresence>
        {open !== null && <Lightbox items={items} start={open} title={`${project.title}, ${project.location.split(',')[0]}`} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}

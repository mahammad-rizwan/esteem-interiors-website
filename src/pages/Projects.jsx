import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, ProjectCard, ClientMarquee } from '../components/Blocks';
import { Reveal } from '../components/ui';
import { PROJECTS } from '../data/site';

export default function Projects() {
  const cats = ['All', ...new Set(PROJECTS.map((p) => p.category))];
  const [cat, setCat] = useState('All');
  const list = PROJECTS.filter((p) => cat === 'All' || p.category === cat);
  return (
    <>
      <PageHeader eyebrow="Projects" title="Spaces we've brought *to life.*"
        lead="A selection of recent work in hospitality and automotive retail. Every project here was designed, built and finished by our own team."
        video={PROJECTS[1].videos[0]} />
      <section className="section projects-page">
        <div className="container">
          <Reveal className="filter-bar" role="tablist" aria-label="Filter projects">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>
                {c}<span className="filter-count tabular">{c === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length}</span>
                {cat === c && <motion.span layoutId="filter-pill" className="filter-pill" />}
              </button>
            ))}
          </Reveal>
          <motion.div layout className="project-grid">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div layout key={p.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }} className={i === 0 ? 'span-2' : ''}>
                  <ProjectCard project={p} index={i} large={i === 0} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <Reveal className="projects-note">
            <p>These are a few recent highlights from more than 350 projects, including work for brands such as Mercedes-Benz, Kia, Toyota and Honda, as well as private homes, offices and retail stores. Ask us for examples close to your brief.</p>
          </Reveal>
        </div>
      </section>
      <ClientMarquee title="Brands we have built for" />
    </>
  );
}

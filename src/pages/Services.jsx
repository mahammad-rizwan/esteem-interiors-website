import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { PageHeader, ProcessSteps, FaqList } from '../components/Blocks';
import { Reveal, SectionHead, SplitHeading, Eyebrow, Button, imgProps } from '../components/ui';
import { ICONS } from './Home';
import { SERVICES, PROJECTS } from '../data/site';

const SPECIALTIES = ['Automotive showrooms', 'Restaurants & cafés', 'Corporate offices', 'Retail stores', 'Apartments & villas', 'Service centres', 'Space planning', '3D visualisation', 'Modular kitchens', 'Custom furniture', 'False ceilings & lighting', 'Renovations'];

function ServiceBlock({ s, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const I = ICONS[s.icon];
  return (
    <article className={`service-block ${i % 2 ? 'flip' : ''}`} id={s.id} ref={ref}>
      <Reveal className="service-block-media" y={50}>
        <motion.img {...imgProps(s.image, '(max-width: 900px) 100vw, 50vw')} alt="" style={{ y }} loading="lazy" />
        <span className="service-block-num">{String(i + 1).padStart(2, '0')}</span>
      </Reveal>
      <div className="service-block-copy">
        <Reveal className="service-block-icon"><I size={24} strokeWidth={1.5} /></Reveal>
        <SplitHeading text={s.title} as="h2" className="service-block-title" />
        <Reveal delay={0.1}><p className="service-block-lead">{s.short}</p></Reveal>
        <Reveal delay={0.15}><p>{s.body}</p></Reveal>
        <Reveal delay={0.2}><ul className="service-points">{s.points.map((p) => <li key={p}><Check size={15} /> {p}</li>)}</ul></Reveal>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Everything your space needs, *one team.*"
        lead="Interior design, construction, turnkey execution and consulting for homes and businesses, backed by our own manufacturing unit."
        video={PROJECTS[0].videos[1]} />

      <nav className="service-index container" aria-label="Services on this page">
        {SERVICES.map((s, i) => <a key={s.id} href={`#${s.id}`}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</a>)}
      </nav>

      <section className="section services-page">
        <div className="container">
          {SERVICES.map((s, i) => <ServiceBlock key={s.id} s={s} i={i} />)}
        </div>
      </section>

      <section className="section specialties-section">
        <div className="container">
          <SectionHead eyebrow="Specialities" title="What we *build.*" align="center" />
          <Reveal className="chips">{SPECIALTIES.map((s) => <span key={s}>{s}</span>)}</Reveal>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <SectionHead eyebrow="How we work" title="A clear path from first call *to handover.*" align="center" />
          <ProcessSteps />
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-grid">
          <div>
            <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
            <SplitHeading text="Questions, *answered.*" className="section-title" />
            <Reveal delay={0.1}><p className="section-lead">Still curious? Call or WhatsApp us. We're happy to talk through your project.</p></Reveal>
            <Reveal delay={0.15}><Button to="/contact" variant="outline">Contact us</Button></Reveal>
          </div>
          <FaqList />
        </div>
      </section>
    </>
  );
}

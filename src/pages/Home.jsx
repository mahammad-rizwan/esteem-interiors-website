import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, PenTool, Home as HomeIcon, Building2, KeyRound, HardHat, Compass } from 'lucide-react';
import HeroMontage from '../components/HeroMontage';
import { ClientMarquee, ProjectCard, ProcessSteps } from '../components/Blocks';
import { InViewVideo } from '../components/Media';
import { Reveal, SectionHead, SplitHeading, Counter, Button, Eyebrow, imgProps } from '../components/ui';
import { PROJECTS, SERVICES, STATS, WHY, COMPANY, asset } from '../data/site';

export const ICONS = { PenTool, Home: HomeIcon, Building2, KeyRound, HardHat, Compass };
const P = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));

function Intro() {
  const inline = [P['pizza-bakery-hsr'].photos[12], P['blue-hyundai-hesarghatta'].photos[3], P['pizza-bakery-koramangala'].photos[5]];
  return (
    <section className="section intro" id="intro">
      <div className="container">
        <Reveal><Eyebrow>Since 1996</Eyebrow></Reveal>
        <Reveal as="p" className="intro-statement" y={40}>
          We design and build spaces
          <span className="inline-pic"><img src={inline[0].sm} alt="" /></span>
          people love to live, work
          <span className="inline-pic"><img src={inline[1].sm} alt="" /></span>
          and gather in, with <em>care</em> in every detail
          <span className="inline-pic"><img src={inline[2].sm} alt="" /></span>
        </Reveal>
        <div className="intro-grid">
          <Reveal className="intro-text" delay={0.1}>
            <p>Esteem Interiors &amp; Consultants is a Bengaluru-based interior design, construction and consulting firm. For three decades we have delivered homes, showrooms, restaurants, retail stores and offices across South India, with our own factory for custom joinery and furniture.</p>
            <Button to="/about" variant="outline">Our story</Button>
          </Reveal>
          <Reveal className="founder-chip" delay={0.2}>
            <img src={asset('founder.webp')} alt={`${COMPANY.founder}, founder`} loading="lazy" />
            <div>
              <span className="founder-chip-name">{COMPANY.founder}</span>
              <span className="founder-chip-role">Founder</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats-band">
      <div className="container stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="stat">
            <span className="stat-value"><Counter to={s.value} suffix={s.suffix} /></span>
            <span className="stat-label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* Service rows with a floating preview image that follows the cursor (desktop). */
function ServiceList() {
  const [active, setActive] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });
  const listRef = useRef(null);
  const move = (e) => {
    const r = listRef.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };
  return (
    <div className="service-list" ref={listRef} onMouseMove={move} onMouseLeave={() => setActive(null)}>
      {SERVICES.map((s, i) => {
        const I = ICONS[s.icon];
        return (
          <Reveal key={s.id} delay={i * 0.05}>
            <Link to={`/services#${s.id}`} className="service-row" onMouseEnter={() => setActive(i)}>
              <span className="service-row-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="service-row-icon"><I size={22} strokeWidth={1.5} /></span>
              <span className="service-row-title">{s.title}</span>
              <span className="service-row-text">{s.short}</span>
              <img className="service-row-thumb" src={s.image.sm} alt="" loading="lazy" />
              <span className="service-row-arrow"><ArrowUpRight size={20} /></span>
            </Link>
          </Reveal>
        );
      })}
      <AnimatePresence>
        {active !== null && (
          <motion.div className="service-float" style={{ x: sx, y: sy }} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.3 }}>
            <AnimatePresence mode="popLayout">
              <motion.img key={active} src={SERVICES[active].image.md} alt="" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Reel() {
  const clips = [
    [P['pizza-bakery-hsr'], 1], [P['blue-hyundai-rajajinagar'], 1], [P['pizza-bakery-koramangala'], 2], [P['blue-hyundai-hesarghatta'], 4],
    [P['pizza-bakery-hsr'], 4], [P['pizza-bakery-koramangala'], 5], [P['blue-hyundai-rajajinagar'], 4], [P['blue-hyundai-service'], 0],
  ];
  const ref = useRef(null);
  return (
    <section className="section reel">
      <div className="container">
        <SectionHead eyebrow="In motion" title="Walk through our *spaces.*" lead="Short films straight from site. Tap any clip to explore the full project." />
      </div>
      <div className="reel-scroller" ref={ref}>
        {clips.map(([p, k], i) => (
          <Reveal key={i} delay={(i % 4) * 0.08} className="reel-item">
            <Link to={`/projects/${p.id}`} aria-label={`${p.title}, ${p.location}`}>
              <InViewVideo video={p.videos[k]} className="reel-video" label={`${p.title} film`} />
              <span className="reel-caption"><b>{p.title}</b>{p.location.split(',')[0]}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Why() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yImg = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const photo = P['pizza-bakery-koramangala'].photos[15];
  return (
    <section className="section why" ref={ref}>
      <div className="container why-grid">
        <div className="why-media">
          <motion.img {...imgProps(photo, '(max-width: 900px) 100vw, 45vw')} alt="Trussed dining hall at The Pizza Bakery, Koramangala" style={{ y: yImg }} loading="lazy" />
          <div className="why-badge"><b>350+</b><span>projects delivered across South India</span></div>
        </div>
        <div className="why-copy">
          <SectionHead eyebrow="Why Esteem" title="Built on *thirty years* of trust." />
          <div className="why-list">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06} className="why-item">
                <span className="why-num">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{w.title}</h3><p>{w.text}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TICKER = ['Interior Design', 'Construction', 'Turnkey Projects', 'Showrooms', 'Restaurants & Cafés', 'Homes & Villas', 'Corporate Offices', 'Consulting'];

function Ticker() {
  const words = [...TICKER, ...TICKER];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {words.map((w, i) => <span key={i}>{w}<i>✦</i></span>)}
      </div>
    </div>
  );
}

/* Two rows of large photos that slide in opposite directions as the page scrolls. */
function MotionGallery() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['2%', '-38%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-38%', '2%']);
  const rowA = [P['pizza-bakery-hsr'].photos[0], P['blue-hyundai-hesarghatta'].photos[0], P['pizza-bakery-koramangala'].photos[1], P['pizza-bakery-hsr'].photos[12], P['blue-hyundai-rajajinagar'].photos[0], P['pizza-bakery-koramangala'].photos[16], P['pizza-bakery-hsr'].photos[8]];
  const rowB = [P['pizza-bakery-koramangala'].photos[15], P['blue-hyundai-rajajinagar'].photos[6], P['pizza-bakery-hsr'].photos[4], P['blue-hyundai-hesarghatta'].photos[11], P['pizza-bakery-koramangala'].photos[8], P['blue-hyundai-service'].photos[6], P['pizza-bakery-hsr'].photos[17]];
  return (
    <section className="motion-gallery" ref={ref} aria-label="Project photographs">
      <div className="container mg-head">
        <Reveal><Eyebrow>Our work</Eyebrow></Reveal>
        <SplitHeading text="Crafted *details,* finished *spaces.*" className="section-title" />
      </div>
      <motion.div className="mg-row" style={{ x: x1 }}>
        {rowA.map((p, i) => <img key={i} {...imgProps(p, '(max-width: 640px) 70vw, 34vw')} alt="" loading="lazy" draggable="false" />)}
      </motion.div>
      <motion.div className="mg-row" style={{ x: x2 }}>
        {rowB.map((p, i) => <img key={i} {...imgProps(p, '(max-width: 640px) 70vw, 34vw')} alt="" loading="lazy" draggable="false" />)}
      </motion.div>
    </section>
  );
}

/* A film that grows from a rounded card to full width as it scrolls into view. */
function FeaturedFilm() {
  const ref = useRef(null);
  const project = P['pizza-bakery-koramangala'];
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const small = typeof window !== "undefined" && window.innerWidth < 700;
  const inset = useTransform(scrollYProgress, [0, 1], [small ? 3 : 6, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [small ? 24 : 40, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`);
  const textY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  return (
    <section className="featured-film" ref={ref}>
      <motion.div className="ff-frame" style={{ clipPath }}>
        <InViewVideo video={project.videos[4]} className="ff-video" label="The Pizza Bakery, Koramangala film" />
        <div className="ff-shade" />
        <motion.div className="container ff-copy" style={{ y: textY }}>
          <p className="ff-eyebrow"><span className="eyebrow-dot" /> Featured project</p>
          <h2 className="ff-title">{project.title}<em>{project.location.split(',')[0]}</em></h2>
          <p className="ff-text">{project.summary}</p>
          <Button to={`/projects/${project.id}`} variant="light">See the project</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroMontage />
      <Ticker />
      <Intro />
      <Stats />
      <section className="section services-home">
        <div className="container">
          <SectionHead eyebrow="What we do" title="Design, build and consult, *under one roof.*" />
          <ServiceList />
          <Reveal className="center-cta"><Button to="/services" variant="outline">All services</Button></Reveal>
        </div>
      </section>
      <MotionGallery />
      <FeaturedFilm />
      <section className="section projects-home">
        <div className="container">
          <div className="split-head">
            <SectionHead eyebrow="Selected work" title="Spaces we've brought *to life.*" />
            <Reveal delay={0.1}><Button to="/projects" variant="outline">View all projects</Button></Reveal>
          </div>
          <div className="project-grid">
            {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} large={i === 0} />)}
          </div>
        </div>
      </section>
      <Reel />
      <Why />
      <section className="section process-section">
        <div className="container">
          <SectionHead eyebrow="How we work" title="A clear path from first call *to handover.*" align="center" />
          <ProcessSteps />
        </div>
      </section>
      <ClientMarquee />
    </>
  );
}


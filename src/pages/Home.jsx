import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, PenTool, Home as HomeIcon, Building2, KeyRound, HardHat, Compass, Factory } from 'lucide-react';
import HeroMontage from '../components/HeroMontage';
import { ClientMarquee, ProjectCard, ProcessSteps } from '../components/Blocks';
import { InViewVideo } from '../components/Media';
import { Reveal, SectionHead, SplitHeading, Counter, Button, Eyebrow, imgProps } from '../components/ui';
import { PROJECTS, SERVICES, STATS, WHY } from '../data/site';

export const ICONS = { PenTool, Home: HomeIcon, Building2, KeyRound, HardHat, Compass };
const P = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
// Home project cards always play. These two projects open on Mona Lisa footage, so they use other films.
const HOME_CLIP = { 'pizza-bakery-hsr': 3, 'pizza-bakery-koramangala': 6 };

const STATEMENT = 'We design and build spaces people love to live, work and gather in, with *care* in every detail.'.split(' ');
const PILLARS = [
  { icon: PenTool, title: 'Design', text: 'Layouts, materials and 3D views, shaped around how you will use the space.' },
  { icon: HardHat, title: 'Build', text: 'Civil work, finishes and site supervision by one accountable team.' },
  { icon: Factory, title: 'Craft', text: 'Custom joinery and furniture made in our own factory.' },
];

function LitWord({ word, range, progress }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const em = word.startsWith('*');
  const text = word.replace(/\*/g, '');
  return <><motion.span className={em ? 'lit-word em' : 'lit-word'} style={{ opacity }}>{text}</motion.span>{' '}</>;
}

/* The sentence lights up word by word as it scrolls through the screen. */
function Statement() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'end 58%'] });
  const n = STATEMENT.length;
  return (
    <p className="intro-statement" ref={ref}>
      {STATEMENT.map((w, i) => (reduce
        ? <span key={i} className={w.startsWith('*') ? 'lit-word em' : 'lit-word'}>{w.replace(/\*/g, '')} </span>
        : <LitWord key={i} word={w} progress={scrollYProgress} range={[i / n, Math.min(1, (i + 1.5) / n)]} />))}
    </p>
  );
}

function Intro() {
  return (
    <section className="section intro" id="intro">
      <div className="container">
        <Reveal><Eyebrow>Since 1996</Eyebrow></Reveal>
        <Statement />
        <div className="intro-grid">
          <Reveal className="intro-text">
            <p>Esteem Interiors &amp; Consultants is a Bengaluru-based interior design, construction and consulting firm. One team takes your project from the first sketch to the final handover, backed by our own factory for custom joinery and furniture, so quality, fit and timelines stay in our hands.</p>
            <Button to="/about" variant="outline">Our story</Button>
          </Reveal>
          <div className="pillars">
            {PILLARS.map((p, i) => {
              const I = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.1} className="pillar">
                  <span className="pillar-icon"><I size={22} strokeWidth={1.5} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Reveal>
              );
            })}
          </div>
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
  return (
    <section className="section reel">
      <div className="container">
        <SectionHead eyebrow="In motion" title="Walk through our *spaces.*" lead="Short films straight from site. Tap any film to explore the full project." />
      </div>
      <div className="reel-scroller">
        <div className="reel-track">
          {[...clips, ...clips].map(([p, k], i) => (
            <div key={i} className="reel-item" aria-hidden={i >= clips.length}>
              <Link to={`/projects/${p.id}`} aria-label={`${p.title}, ${p.location}`} tabIndex={i >= clips.length ? -1 : undefined}>
                <InViewVideo video={p.videos[k]} className="reel-video" label={`${p.title} film`} />
                <span className="reel-caption"><b>{p.title}</b>{p.location.split(',')[0]}</span>
              </Link>
            </div>
          ))}
        </div>
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
  const rowA = [P['pizza-bakery-hsr'].photos[7], P['blue-hyundai-hesarghatta'].photos[0], P['pizza-bakery-koramangala'].photos[1], P['pizza-bakery-hsr'].photos[12], P['blue-hyundai-rajajinagar'].photos[0], P['pizza-bakery-koramangala'].photos[16], P['pizza-bakery-hsr'].photos[8]];
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
        <InViewVideo fill video={project.videos[8]} className="ff-video" label="Restaurant interiors film" />
        <div className="ff-shade" />
        <motion.div className="container ff-copy" style={{ y: textY }}>
          <p className="ff-eyebrow"><span className="eyebrow-dot" /> Featured project</p>
          <h2 className="ff-title">Restaurant<em>interiors</em></h2>
          <p className="ff-text">A double-height dining hall under a clay-tile roof, with hand-finished arches, a live show kitchen, hand-drawn city murals and a leafy terrace overlooking the street. Designed, built and finished by our own team.</p>
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
            {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} large={i === 0} autoClip={HOME_CLIP[p.id] ?? 0} />)}
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


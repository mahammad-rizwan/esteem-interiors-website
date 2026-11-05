import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PageHeader, ClientMarquee, ProcessSteps } from '../components/Blocks';
import { Reveal, SectionHead, Counter, Eyebrow, SplitHeading, Button, imgProps } from '../components/ui';
import { SOCIAL_ICON } from '../components/SocialIcons';
import { PROJECTS, STATS, VALUES, WHY, COMPANY, SOCIALS, asset } from '../data/site';

const P = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));

function Founder() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  return (
    <section className="section founder" ref={ref} id="founder">
      <div className="container founder-grid">
        <div className="founder-photo">
          <motion.div className="founder-frame" style={{ y }}>
            <img src={asset('founder.webp')} alt={`${COMPANY.founder}, Founder of Esteem Interiors & Consultants`} loading="lazy" />
          </motion.div>
          <Reveal className="founder-since" delay={0.3}><b>1996</b><span>Founded Esteem in Bengaluru</span></Reveal>
        </div>
        <div className="founder-copy">
          <Reveal><Eyebrow>Our founder</Eyebrow></Reveal>
          <SplitHeading text={`${COMPANY.founder}`} className="founder-name" />
          <Reveal delay={0.1}><p className="founder-role">Founder, Esteem Interiors &amp; Consultants</p></Reveal>
          <Reveal delay={0.15}>
            <p>Mr. Mohammed Ameenuddin founded Esteem in 1996 with a simple belief: that a client's trust is earned on site, one well-built detail at a time.</p>
            <p>Under his leadership Esteem has grown from a small Bengaluru practice into a full design-and-build firm with its own manufacturing unit. It has delivered more than 350 projects across South India and earned the confidence of leading national and international brands in automotive, retail and hospitality.</p>
            <p>He remains closely involved in every project, from the first site visit to the final walkthrough.</p>
          </Reveal>
          <Reveal delay={0.25} className="founder-socials">
            {SOCIALS.map((s) => { const I = SOCIAL_ICON[s.id]; return <a key={s.id} href={s.href} target="_blank" rel="noreferrer"><I size={17} /><span>{s.label}</span></a>; })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const strip = [P['pizza-bakery-hsr'].photos[2], P['blue-hyundai-rajajinagar'].photos[0], P['pizza-bakery-koramangala'].photos[4], P['blue-hyundai-hesarghatta'].photos[6], P['pizza-bakery-hsr'].photos[10], P['blue-hyundai-service'].photos[6]];
  return (
    <>
      <PageHeader eyebrow="About us" title="Three decades of building *trust.*"
        lead="A Bengaluru design-and-build firm. We plan, design, construct and furnish spaces, and stand behind every one of them."
        photo={P['pizza-bakery-hsr'].photos[8]} />

      <section className="section story">
        <div className="container story-grid">
          <SectionHead eyebrow="Our story" title="Thirty years, *350+ projects,* one standard." />
          <div className="story-copy">
            <Reveal><p>Esteem Interiors &amp; Consultants began in Bengaluru in 1996 with a simple promise: build every space as carefully as if it were our own. Three decades and more than 350 residential and commercial projects across South India later, that promise still guides how we work.</p></Reveal>
            <Reveal delay={0.1}><p>Design, engineering, site supervision and craftsmanship all sit within one team, so nothing gets lost between the drawing board and the finished room. Our own factory makes custom interiors and furniture in-house, giving us direct control over finish, fit and timelines, and giving our clients fewer surprises along the way.</p></Reveal>
            <Reveal delay={0.2}><p>Today we design and build automotive showrooms, restaurants and cafés, retail stores, corporate offices and private homes. Whether it is a family's first apartment or a flagship store for a national brand, every project gets the same attention to detail, honest advice and on-time handover.</p></Reveal>
          </div>
        </div>
        <div className="container about-stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="stat">
              <span className="stat-value"><Counter to={s.value} suffix={s.suffix} /></span>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <Founder />

      <section className="section values">
        <div className="container">
          <SectionHead eyebrow="What we stand for" title="Four values, *every project.*" align="center" />
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="value-card">
                <span className="value-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="photo-strip" aria-hidden="true">
        <div className="photo-strip-track">
          {[...strip, ...strip].map((p, i) => <img key={i} {...imgProps(p, '40vw')} alt="" loading="lazy" />)}
        </div>
      </section>

      <section className="section why-about">
        <div className="container why-about-grid">
          <SectionHead eyebrow="What sets us apart" title="Why clients *come back.*" lead="Most of our work comes from repeat clients and referrals. Here is why." />
          <div className="why-cards">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={(i % 2) * 0.08} className="why-card">
                <h3>{w.title}</h3><p>{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <SectionHead eyebrow="How we work" title="A clear path from first call *to handover.*" align="center" />
          <ProcessSteps />
          <Reveal className="center-cta"><Button to="/contact">Start your project</Button></Reveal>
        </div>
      </section>

      <ClientMarquee />
    </>
  );
}

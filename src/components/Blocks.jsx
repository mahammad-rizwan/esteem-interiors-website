import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight, Play, Send, Check } from 'lucide-react';
import { CLIENTS, PROCESS, FAQS, COMPANY, PROJECT_TYPES } from '../data/site';
import { Reveal, SplitHeading, Eyebrow, imgProps, EASE } from './ui';
import { InViewVideo } from './Media';

/* Client logos: two rows drifting in opposite directions. */
export function ClientMarquee({ title = 'Trusted by leading national & international brands' }) {
  const half = Math.ceil(CLIENTS.length / 2);
  const rows = [CLIENTS.slice(0, half), CLIENTS.slice(half)];
  return (
    <section className="clients" aria-labelledby="clients-title">
      <div className="container clients-head">
        <Reveal><Eyebrow>Our clients</Eyebrow></Reveal>
        <SplitHeading as="h2" text={title} className="clients-title" />
      </div>
      <div id="clients-title" className="sr-only">Our clients</div>
      {rows.map((row, r) => (
        <div className={`logo-row ${r ? 'rev' : ''}`} key={r}>
          <div className="logo-track">
            {[...row, ...row, ...row].map((c, i) => (
              <div className="logo-tile" key={i} aria-hidden={i >= row.length}>
                <img src={c.src} alt={i < row.length ? c.name : ''} width={c.w} height={c.h} loading="lazy" draggable="false" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* Inner-page header: title + breadcrumb + a wide media band. */
export function PageHeader({ eyebrow, title, lead, photo, video }) {
  return (
    <header className="page-header">
      <div className="container page-header-copy">
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <SplitHeading as="h1" immediate delay={0.1} text={title} className="page-title" />
        {lead && <motion.p className="page-lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: EASE }}>{lead}</motion.p>}
      </div>
      {(photo || video) && (
        <motion.div className="page-header-media container-wide" initial={{ clipPath: 'inset(12% 6% 0% 6% round 28px)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }} transition={{ duration: 1.4, delay: 0.3, ease: EASE }}>
          {video ? <InViewVideo video={video} className="page-header-video" /> : <img {...imgProps(photo)} alt="" />}
        </motion.div>
      )}
    </header>
  );
}

/* Project card with hover video preview. */
export function ProjectCard({ project, index = 0, large = false }) {
  const [hover, setHover] = useState(false);
  const cover = project.photos[0];
  const clip = project.videos[0];
  return (
    <Reveal delay={(index % 2) * 0.12} className={`project-card ${large ? 'large' : ''}`}>
      <Link to={`/projects/${project.id}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} aria-label={`${project.title}, ${project.location}`}>
        <div className="project-card-media">
          <img {...imgProps(cover, large ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 900px) 100vw, 40vw')} alt="" loading="lazy" />
          {hover && clip && <video className="project-card-video" src={clip.src} muted autoPlay loop playsInline />}
          <span className="project-card-badge"><Play size={12} fill="currentColor" /> {project.photos.length} photos · {project.videos.length} films</span>
          <span className="project-card-arrow"><ArrowUpRight size={20} /></span>
        </div>
        <div className="project-card-info">
          <span className="project-card-cat">{project.category} · {project.location}</span>
          <h3>{project.title}</h3>
          <p>{project.scope}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function ProcessSteps() {
  return (
    <ol className="process">
      {PROCESS.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.1} className="process-step">
          <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
          <div className="process-line"><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: EASE }} /></div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function FaqList({ items = FAQS }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {items.map((f, i) => (
        <Reveal key={f.q} delay={i * 0.04} className={`faq-item ${open === i ? 'on' : ''}`}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{f.q}</span><span className="faq-icon"><Plus size={18} /></span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div className="faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                <p>{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      ))}
    </div>
  );
}

/* Consultation form: frontend only, hands the enquiry to WhatsApp. */
export function ConsultForm() {
  const [f, setF] = useState({ name: '', phone: '', type: PROJECT_TYPES[0], location: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const text = [
      'Hello Esteem Interiors! I would like a free design consultation.', '',
      `Name: ${f.name}`, `Phone: ${f.phone}`, `Project: ${f.type}`,
      f.location && `Location: ${f.location}`, f.message && `Details: ${f.message}`,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
  };
  return (
    <form className="consult-form" onSubmit={submit}>
      <div className="field-row">
        <label className="field"><span>Your name</span><input id="cf-name" required value={f.name} onChange={set('name')} placeholder="Full name" autoComplete="name" /></label>
        <label className="field"><span>Phone</span><input id="cf-phone" required value={f.phone} onChange={set('phone')} placeholder="+91" inputMode="tel" autoComplete="tel" /></label>
      </div>
      <fieldset className="field">
        <legend>Project type</legend>
        <div className="pills">
          {PROJECT_TYPES.map((t) => (
            <button type="button" key={t} className={f.type === t ? 'on' : ''} onClick={() => setF({ ...f, type: t })} aria-pressed={f.type === t}>{t}</button>
          ))}
        </div>
      </fieldset>
      <label className="field"><span>Location (optional)</span><input id="cf-loc" value={f.location} onChange={set('location')} placeholder="Area, city" /></label>
      <label className="field"><span>Tell us more (optional)</span><textarea id="cf-msg" rows={3} value={f.message} onChange={set('message')} placeholder="Size, timeline, budget, ideas…" /></label>
      <button className="btn btn-solid btn-block" type="submit">
        <span className="btn-label">{sent ? 'Opened WhatsApp, send it there' : 'Send enquiry on WhatsApp'}</span>
        <span className="btn-icon">{sent ? <Check size={17} /> : <Send size={17} />}</span>
      </button>
      <p className="form-note">Your details open in WhatsApp, ready to send to our team. Prefer to call? {COMPANY.phone}</p>
    </form>
  );
}

export function WhatsAppFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 320);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <a className={`wa-fab ${show ? '' : 'hidden'}`} href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.3 19.4L3 29l6.8-1.7A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-4 1 1.1-3.9-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-2.6-1.6 9.7 9.7 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5a.6.6 0 0 0 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .8 2.4.7 2.9.6a2.9 2.9 0 0 0 1.9-1.3 2.4 2.4 0 0 0 .2-1.3c-.1-.2-.3-.3-.6-.4z" /></svg>
    </a>
  );
}

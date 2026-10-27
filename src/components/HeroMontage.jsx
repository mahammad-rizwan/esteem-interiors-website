import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HERO_CLIPS } from '../data/media.generated';
import { PROJECTS } from '../data/site';
import { SplitHeading, Button, EASE } from './ui';

const byMedia = Object.fromEntries(PROJECTS.map((p) => [p.media, p]));
const CLIPS = HERO_CLIPS.map((c) => {
  const p = byMedia[c.proj];
  const v = p.videos.find((x) => x.src.endsWith(`/${c.name}.mp4`));
  return { ...v, title: p.title, place: p.location.split(',')[0], category: p.category, id: p.id };
});
const RATE = 0.9;

export default function HeroMontage() {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const vids = useRef([]);
  const frame = useRef(null);
  const next = (idx + 1) % CLIPS.length;
  const go = useCallback((i) => { setIdx(i); setProgress(0); }, []);

  // Gentle parallax: content drifts up and fades as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const v = vids.current[idx];
    const others = vids.current.filter((el, i) => el && i !== idx);
    const pause = setTimeout(() => others.forEach((el) => el.pause()), 1500);
    if (!v) return () => clearTimeout(pause);
    v.currentTime = 0;
    v.playbackRate = RATE;
    v.play()?.catch?.(() => {});
    // If autoplay is refused (e.g. low-power mode), keep the montage moving on posters.
    const fallback = setTimeout(() => go((idx + 1) % CLIPS.length), (CLIPS[idx].dur / RATE + 1) * 1000);
    return () => { clearTimeout(pause); clearTimeout(fallback); };
  }, [idx, go]);

  const onTime = (i) => (e) => {
    if (i !== idx) return;
    const v = e.currentTarget;
    if (v.duration) setProgress(v.currentTime / v.duration);
  };
  const clip = CLIPS[idx];

  return (
    <section className="hero" aria-label="Esteem Interiors showreel">
      <motion.div className="hero-frame" ref={frame}
        initial={{ clipPath: 'inset(7% 5% 7% 5% round 36px)' }} animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
        transition={{ duration: 1.6, ease: EASE }}>
        <motion.div className="hero-media" style={{ scale: mediaScale }}>
          {CLIPS.map((c, i) => (
            <video key={c.src} ref={(el) => (vids.current[i] = el)} className={`hero-video ${i === idx ? 'on' : ''}`}
              src={c.src} poster={c.poster} muted playsInline preload={i === idx || i === next ? 'auto' : 'none'}
              onTimeUpdate={onTime(i)} onEnded={() => i === idx && go(next)} aria-hidden="true" />
          ))}
        </motion.div>
        <div className="hero-shade" />
        <div className="hero-grain" aria-hidden="true" />

        <motion.div className="container hero-content" style={{ y: contentY, opacity: contentOpacity }}>
          <motion.p className="hero-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: EASE }}>
            <span className="eyebrow-dot" /> <span className="eb-long">Esteem Interiors &amp; Consultants · </span>Bengaluru · Since 1996
          </motion.p>
          <SplitHeading as="h1" immediate delay={0.8} className="hero-title" text="Spaces built on *trust,* designed to *inspire.*" />
          <motion.div className="hero-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.4, ease: EASE }}>
            <p className="hero-lead">Interior design, construction and turnkey execution for homes, showrooms, restaurants and offices, delivered by one team from first sketch to final handover.</p>
            <div className="hero-ctas">
              <Button to="/projects" variant="light">Explore our work</Button>
              <Button to="/contact" variant="glass">Free consultation</Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="hero-bar" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.7, ease: EASE }}>
          <div className="container hero-bar-inner">
            <dl className="hero-stats">
              <div><dt>Projects</dt><dd>350+</dd></div>
              <div><dt>Years</dt><dd>30+</dd></div>
              <div><dt>Brands</dt><dd>22+</dd></div>
            </dl>
            <div className="now-showing" aria-live="polite">
              <div className="ns-head">
                <span className="ns-label">Now showing</span>
                <span className="ns-count tabular">{String(idx + 1).padStart(2, '0')} <i>/ {String(CLIPS.length).padStart(2, '0')}</i></span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={idx} className="ns-body" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: EASE }}>
                  <span className="ns-title">{clip.title}</span>
                  <span className="ns-meta">{clip.category} · {clip.place}</span>
                </motion.div>
              </AnimatePresence>
              <div className="ns-bars">
                {CLIPS.map((c, i) => (
                  <button key={i} onClick={() => go(i)} aria-label={`Show ${c.title}, ${c.place}`} className={i === idx ? 'on' : i < idx ? 'done' : ''}>
                    <i style={i === idx ? { transform: `scaleX(${progress})` } : undefined} />
                  </button>
                ))}
              </div>
              <Link to={`/projects/${clip.id}`} className="ns-link">View project <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

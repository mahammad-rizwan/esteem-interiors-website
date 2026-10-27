import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div', ...rest }) {
  const M = motion[as];
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay, ease: EASE }} {...rest}>
      {children}
    </M>
  );
}

// Word-by-word rising headline. `text` may contain *emphasis* segments.
export function SplitHeading({ text, as = 'h2', className = '', delay = 0, immediate = false }) {
  const M = motion[as];
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);
  let i = 0;
  const words = parts.flatMap((part) => {
    const em = part.startsWith('*');
    return part.replace(/\*/g, '').split(/(\s+)/).filter((w) => w.length).map((w) => ({ w, em }));
  });
  const anim = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-40px' } };
  return (
    <M className={`split ${className}`} initial="hide" {...anim} aria-label={text.replace(/\*/g, '')}>
      {words.map(({ w, em }, k) => /^\s+$/.test(w) ? ' ' : (
        <span className="split-mask" key={k} aria-hidden="true">
          <motion.span className={em ? 'split-word em' : 'split-word'}
            variants={{ hide: { y: '110%' }, show: { y: '0%', transition: { duration: 0.9, ease: EASE, delay: delay + 0.05 * i++ } } }}>
            {w}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

export function Eyebrow({ children }) {
  return <p className="eyebrow"><span className="eyebrow-dot" />{children}</p>;
}

export function SectionHead({ eyebrow, title, lead, align = 'left', children }) {
  return (
    <div className={`section-head align-${align}`}>
      <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
      <SplitHeading text={title} className="section-title" />
      {lead && <Reveal delay={0.15}><p className="section-lead">{lead}</p></Reveal>}
      {children}
    </div>
  );
}

export function Counter({ to, suffix = '', duration = 1800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const start = to > 1900 ? to - 40 : 0;
  const [n, setN] = useState(reduce ? to : start);
  useEffect(() => {
    if (!inView || reduce) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(Math.round(start + (to - start) * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, start, duration, reduce]);
  return <span ref={ref} className="tabular">{n}{suffix}</span>;
}

// Internal route → <Link>; anything else → <a>.
export function Button({ to, href, children, variant = 'solid', icon: Icon = ArrowUpRight, className = '', ...rest }) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = <><span className="btn-label">{children}</span>{Icon && <span className="btn-icon"><Icon size={17} strokeWidth={1.8} /></span>}</>;
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  return <a href={href} className={cls} {...rest}>{inner}</a>;
}

// Responsive <img> props for a media photo.
export const imgProps = (p, sizes = '100vw') => ({
  src: p.md, srcSet: `${p.sm} 720w, ${p.md} 1200w, ${p.src} 1920w`, sizes,
});

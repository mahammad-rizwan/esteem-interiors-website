import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { imgProps } from './ui';

// Muted looping clip that only plays while it is on screen.
export function InViewVideo({ video, className = '', label = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.play().catch(() => {}); } else { el.pause(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} className={className} src={video.src} poster={video.poster} muted loop playsInline preload="none" aria-label={label} />
  );
}

// Full-screen viewer for a mixed list of photos and videos. Swipe, arrows, keys, thumbnails.
export function Lightbox({ items, start = 0, title, onClose }) {
  const [i, setI] = useState(start);
  const n = items.length;
  const go = useCallback((d) => setI((x) => (x + d + n) % n), [n]);
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = prev; };
  }, [go, onClose]);
  const it = items[i];
  const drag = { drag: 'x', dragConstraints: { left: 0, right: 0 }, dragElastic: 0.5, onDragEnd: (_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); } };

  return createPortal(
    <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="lb-top" onClick={(e) => e.stopPropagation()}>
        <span className="lb-title">{title}</span>
        <span className="lb-count tabular">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        <button onClick={onClose} aria-label="Close"><X size={20} /></button>
      </div>
      <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" initial={false}>
          {it.type === 'video' ? (
            <motion.video key={i} className="lb-media" src={it.src} poster={it.poster} autoPlay muted loop playsInline controls
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} {...drag} />
          ) : (
            <motion.img key={i} className="lb-media" {...imgProps(it, '100vw')} src={it.src} alt={`${title}, photo ${i + 1}`}
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} draggable="false" {...drag} />
          )}
        </AnimatePresence>
        <button className="lb-nav prev" onClick={() => go(-1)} aria-label="Previous"><ChevronLeft /></button>
        <button className="lb-nav next" onClick={() => go(1)} aria-label="Next"><ChevronRight /></button>
      </div>
      <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
        {items.map((m, k) => (
          <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Show item ${k + 1}`}>
            <img src={m.type === 'video' ? m.poster : m.sm} alt="" loading="lazy" />
            {m.type === 'video' && <Play size={14} className="lb-thumb-play" fill="currentColor" />}
          </button>
        ))}
      </div>
    </motion.div>,
    document.body,
  );
}

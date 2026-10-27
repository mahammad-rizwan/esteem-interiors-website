import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Phone, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { NAV, COMPANY, SOCIALS } from '../data/site';
import { SOCIAL_ICON } from './SocialIcons';
import { EASE } from './ui';

export default function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  // Pages whose top band is dark (video hero / dark page header) start with a light header.
  const overDark = !scrolled && !open && (pathname === '/' || pathname.startsWith('/projects/'));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''} ${overDark ? 'is-over-dark' : ''} ${open ? 'is-open' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="header-logo" aria-label="Esteem Interiors & Consultants, home"><Logo /></Link>
          <nav className="header-nav" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <a href={COMPANY.phoneHref} className="header-call"><Phone size={15} /><span>{COMPANY.phone}</span></a>
          <Link to="/contact" className="header-cta">Free consultation <ArrowUpRight size={15} /></Link>
          <button className="burger" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            <span /><span />
          </button>
        </div>
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="menu" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.6, ease: EASE }}>
            <nav className="menu-nav" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASE }}>
                  <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                    <small>0{i + 1}</small>{n.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div className="menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <a href={COMPANY.phoneHref} className="menu-phone">{COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              <div className="socials">
                {SOCIALS.map((s) => { const I = SOCIAL_ICON[s.id]; return <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}><I /></a>; })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

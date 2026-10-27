import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { COMPANY, NAV, SERVICES, SOCIALS } from '../data/site';
import { SOCIAL_ICON } from './SocialIcons';
import { Reveal, SplitHeading, Button } from './ui';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <SplitHeading text="Have a space in mind? *Let's talk.*" className="footer-title" />
          <Reveal delay={0.2} className="footer-cta-actions">
            <Button to="/contact" variant="light">Book a free consultation</Button>
            <Button href={`https://wa.me/${COMPANY.whatsapp}`} variant="outline-light" target="_blank" rel="noreferrer">WhatsApp us</Button>
          </Reveal>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{COMPANY.tagline}<br />Interiors, construction and consulting in Bengaluru since 1996.</p>
            <div className="socials">
              {SOCIALS.map((s) => { const I = SOCIAL_ICON[s.id]; return <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}><I /></a>; })}
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            {NAV.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            {SERVICES.map((s) => <Link key={s.id} to={`/services#${s.id}`}>{s.title}</Link>)}
          </div>
          <div className="footer-col">
            <h4>Visit us</h4>
            <a href={COMPANY.mapsLink} target="_blank" rel="noreferrer" className="footer-address">{COMPANY.address[0]},<br />{COMPANY.address[1]}<ArrowUpRight size={14} /></a>
            <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span>Crafted in Bengaluru · Since 1996</span>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">esteem</div>
    </footer>
  );
}

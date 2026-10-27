import { useState } from 'react';
import { Phone, Mail, MapPin, ArrowUpRight, Copy, Check, Navigation } from 'lucide-react';
import { PageHeader, ConsultForm } from '../components/Blocks';
import { Reveal, SectionHead, Eyebrow, SplitHeading } from '../components/ui';
import { SOCIAL_ICON, WhatsappIcon } from '../components/SocialIcons';
import { COMPANY, SOCIALS } from '../data/site';

function CopyButton({ text }) {
  const [ok, setOk] = useState(false);
  const copy = async (e) => {
    e.preventDefault();
    try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1600); } catch { /* clipboard blocked */ }
  };
  return <button className="copy-btn" onClick={copy} aria-label={`Copy ${text}`}>{ok ? <Check size={15} /> : <Copy size={15} />}</button>;
}

export default function Contact() {
  const cards = [
    { icon: Phone, label: 'Call us', value: COMPANY.phone, href: COMPANY.phoneHref, copy: COMPANY.phone },
    { icon: WhatsappIcon, label: 'WhatsApp', value: COMPANY.whatsappDisplay, href: `https://wa.me/${COMPANY.whatsapp}`, external: true },
    { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}`, copy: COMPANY.email },
    { icon: MapPin, label: 'Visit our office', value: `${COMPANY.address[0]}, ${COMPANY.address[1]}`, href: COMPANY.mapsLink, external: true },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's build something *remarkable.*"
        lead="Tell us about your space. We'll get back to you with ideas, an honest view of budget and a clear plan. The first consultation is free." />

      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-cards">
            {cards.map((c, i) => {
              const I = c.icon;
              return (
                <Reveal key={c.label} delay={i * 0.06} className="contact-card">
                  <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    <span className="contact-card-icon"><I size={20} /></span>
                    <span className="contact-card-label">{c.label}</span>
                    <span className="contact-card-value">{c.value}</span>
                    <span className="contact-card-arrow"><ArrowUpRight size={18} /></span>
                  </a>
                  {c.copy && <CopyButton text={c.copy} />}
                </Reveal>
              );
            })}
            <Reveal delay={0.3} className="contact-socials">
              <span>Follow our work</span>
              <div>
                {SOCIALS.map((s) => { const I = SOCIAL_ICON[s.id]; return <a key={s.id} href={s.href} target="_blank" rel="noreferrer"><I size={18} /><span>{s.label}</span></a>; })}
              </div>
            </Reveal>
          </div>
          <Reveal className="contact-form-card" delay={0.1}>
            <Eyebrow>Free design consultation</Eyebrow>
            <h2>Tell us about your project</h2>
            <ConsultForm />
          </Reveal>
        </div>
      </section>

      <section className="section map-section">
        <div className="container">
          <div className="split-head">
            <div>
              <Reveal><Eyebrow>Find us</Eyebrow></Reveal>
              <SplitHeading text="Visit our *studio.*" className="section-title" />
            </div>
            <Reveal delay={0.1} className="map-address">
              <p>{COMPANY.address[0]},<br />{COMPANY.address[1]}</p>
              <a className="btn btn-solid" href={COMPANY.mapsLink} target="_blank" rel="noreferrer">
                <span className="btn-label">Get directions</span><span className="btn-icon"><Navigation size={16} /></span>
              </a>
            </Reveal>
          </div>
          <Reveal className="map-frame" y={40}>
            <a className="map-fallback" href={COMPANY.mapsLink} target="_blank" rel="noreferrer" aria-hidden="true" tabIndex={-1}>
              <MapPin size={34} />
              <span>Open our location in Google Maps</span>
            </a>
            <iframe title="Esteem Interiors & Consultants on Google Maps" src={COMPANY.mapsEmbed} referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            <a className="map-pin-card" href={COMPANY.mapsLink} target="_blank" rel="noreferrer">
              <b>Esteem Interiors &amp; Consultants</b>
              <span>Lalbagh Fort Road, Mavalli</span>
              <span className="map-open">Open in Google Maps <ArrowUpRight size={14} /></span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container"><SectionHead eyebrow="Prefer to talk?" title={`Call us on *${COMPANY.phone}*`} align="center" /></div>
      </section>
    </>
  );
}

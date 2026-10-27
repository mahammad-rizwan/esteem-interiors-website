// Brand marks drawn as simple line icons (lucide-react v1 ships no brand icons).
const base = (size) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true });

export const InstagramIcon = ({ size = 18 }) => (
  <svg {...base(size)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" /></svg>
);
export const YoutubeIcon = ({ size = 18 }) => (
  <svg {...base(size)}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" /></svg>
);
export const WhatsappIcon = ({ size = 18 }) => (
  <svg {...base(size)}><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.6-4.3A8.5 8.5 0 1 1 20.5 11.6z" /><path d="M9 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.4.7 1 1.4 1.7 1.9.6.4 1 .6 1.3.7.2.1.4 0 .5-.1l.6-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .5-.2 1.2-.7 1.6-.5.4-1.4.6-2.3.3-1.2-.4-2.6-1.1-3.8-2.3-1.1-1.1-1.9-2.4-2.2-3.4-.3-.9-.1-1.8.4-2.4z" fill="currentColor" stroke="none" /></svg>
);

export const SOCIAL_ICON = { instagram: InstagramIcon, youtube: YoutubeIcon, whatsapp: WhatsappIcon };

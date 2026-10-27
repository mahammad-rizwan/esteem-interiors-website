// Site copy and structured content. Sourced from esteeminteriors.in, extended where noted.
import { MEDIA } from './media.generated';
import CLIENT_LIST from '../../scripts/media/clients.json';

export const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;

export const COMPANY = {
  name: 'Esteem Interiors & Consultants',
  tagline: 'Trust That Builds. Design That Inspires.',
  founded: 1996,
  founder: 'Mohammed Ameenuddin',
  phone: '+91 93418 18210',
  phoneHref: 'tel:+919341818210',
  whatsapp: '918147367609',
  whatsappDisplay: '+91 81473 67609',
  email: 'enquire@esteeminteriors.in',
  address: ['#7, Lalbagh Fort Road, Doddamavalli', 'Mavalli, Bengaluru, Karnataka 560004'],
  mapsLink: 'https://www.google.com/maps/place/Esteem+Interiors+%26+Consultant/@12.9547443,77.581497,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15002a5eeda7:0x16253d3a0ee996b3!8m2!3d12.9547443!4d77.581497!16s%2Fg%2F11ymjywyfc',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.581497!3d12.9547443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15002a5eeda7%3A0x16253d3a0ee996b3!2sEsteem%20Interiors%20%26%20Consultant!5e0!3m2!1sen!2sin!4v1761500000000!5m2!1sen!2sin',
};

export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', handle: '@esteem.constructions', href: 'https://www.instagram.com/esteem.constructions' },
  { id: 'youtube', label: 'YouTube', handle: '@esteem.constructions', href: 'https://www.youtube.com/@esteem.constructions' },
  { id: 'whatsapp', label: 'WhatsApp', handle: COMPANY.whatsappDisplay, href: `https://wa.me/${COMPANY.whatsapp}` },
];

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export const STATS = [
  { value: 30, suffix: '+', label: 'Years in business' },
  { value: 350, suffix: '+', label: 'Projects delivered' },
  { value: 22, suffix: '+', label: 'Brands that trust us' },
  { value: 1996, suffix: '', label: 'Founded in Bengaluru' },
];

// ---------------------------------------------------------------- media helpers
const photo = (proj, p) => ({
  src: asset(`media/${proj}/${p.name}.webp`), md: asset(`media/${proj}/${p.name}-md.webp`), sm: asset(`media/${proj}/${p.name}-sm.webp`),
  w: p.w, h: p.h, landscape: p.landscape,
});
const video = (proj, v) => ({ src: asset(`media/${proj}/${v.name}.mp4`), poster: asset(`media/${proj}/${v.name}.webp`), dur: v.dur });

const PROJECT_META = [
  {
    id: 'pizza-bakery-hsr', media: 'pizza-hsr', title: 'The Pizza Bakery', location: 'HSR Layout, Bengaluru', category: 'Hospitality',
    scope: 'Turnkey interiors · Restaurant & café',
    summary: 'A Neapolitan-inspired bakery-restaurant across two levels: hand-finished timber panelling, arched niches, rattan pendants, monochrome stripe floors and white-tiled wood-fired ovens, with a Paris Panini café on the ground floor.',
    highlights: ['Hand-built tiled wood-fired ovens', 'Mona Lisa mural arches', 'Hex-tile "handcrafted" floor lettering', 'Open-air terrace dining', 'Custom timber joinery from our factory'],
  },
  {
    id: 'pizza-bakery-koramangala', media: 'pizza-koramangala', title: 'The Pizza Bakery', location: 'Koramangala, Bengaluru', category: 'Hospitality',
    scope: 'Turnkey interiors · Restaurant & café',
    summary: 'A double-height trussed dining hall under a clay-tile roof, with Mona Lisa arches, a show kitchen of tiled ovens, hand-drawn city murals and a leafy terrace overlooking the street.',
    highlights: ['Exposed timber truss roof', 'Show kitchen with three tiled ovens', 'Hand-drawn Bengaluru street murals', 'Crêpe & coffee counter', 'Terrace seating'],
  },
  {
    id: 'blue-hyundai-rajajinagar', media: 'hyundai-rajajinagar', title: 'Blue Hyundai Showroom', location: 'Rajajinagar, Bengaluru', category: 'Automotive',
    scope: 'Showroom fit-out · Brand-compliant interiors',
    summary: 'A multi-level dealership built to Hyundai brand standards: oak-clad display bays, customer lounges, an accessories wall and glass-partitioned sales offices.',
    highlights: ['Oak-clad vehicle display bays', 'Customer lounges and delivery bay', 'Accessories wall with custom shelving', 'Frameless-glass sales cabins', 'Multi-level showroom'],
  },
  {
    id: 'blue-hyundai-service', media: 'hyundai-service', title: 'Blue Hyundai Service Centre', location: 'Rajajinagar, Bengaluru', category: 'Automotive',
    scope: 'Service reception · Customer lounge',
    summary: 'A calm, bright service reception: long advisor desks, a customer lounge with a view into the workshop, and storage built to the brand palette.',
    highlights: ['Service-advisor desks', 'Customer lounge overlooking the workshop', 'Built-in white joinery', 'Brand wall and signage'],
  },
  {
    id: 'blue-hyundai-hesarghatta', media: 'hyundai-hesarghatta', title: 'Blue Hyundai Showroom', location: 'Hesarghatta, Bengaluru', category: 'Automotive',
    scope: 'Showroom & offices · Turnkey',
    summary: 'A large, light-filled showroom with timber feature walls, a delivery celebration bay, lounges, reception, frameless-glass cabins and open-plan offices for the sales team.',
    highlights: ['Delivery celebration bay', 'Timber feature walls', 'Reception and customer lounges', 'Glass cabins and conference rooms', 'Open-plan sales offices'],
  },
];

export const PROJECTS = PROJECT_META.map((p) => ({
  ...p,
  photos: MEDIA[p.media].photos.map((x) => photo(p.media, x)),
  videos: MEDIA[p.media].videos.map((x) => video(p.media, x)),
}));
export const projectById = (id) => PROJECTS.find((p) => p.id === id);

export const CLIENTS = CLIENT_LIST.map((c) => ({ ...c, src: asset(`clients/${c.slug}.webp`) }));

// ---------------------------------------------------------------- services
const P = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
export const SERVICES = [
  {
    id: 'interior-design', title: 'Interior Design', icon: 'PenTool',
    short: 'Design tailored to your style, your space and the way you live or work.',
    body: 'Every project starts with listening. We study how a space will be used, then develop layouts, material palettes and 3D views until the design feels exactly right, before anything is built.',
    points: ['Space planning & layouts', 'Mood boards and material palettes', '3D visualisation', 'Lighting and furniture design'],
    image: P['pizza-bakery-hsr'].photos[14],
  },
  {
    id: 'residential', title: 'Residential Interiors', icon: 'Home',
    short: 'Apartments, villas and independent homes with a personal touch.',
    body: 'From 2 and 3 BHK apartments to villas, we design and deliver complete homes: modular kitchens, wardrobes, living spaces and bedrooms, with furniture made to measure in our own factory.',
    points: ['2 BHK, 3 BHK & villas', 'Modular kitchens & wardrobes', 'Custom furniture', 'False ceilings, lighting & finishes'],
    image: P['blue-hyundai-rajajinagar'].photos[6],
  },
  {
    id: 'commercial', title: 'Commercial Interiors', icon: 'Building2',
    short: 'Offices, showrooms, retail and hospitality spaces that work hard and look right.',
    body: 'We have built showrooms for leading automotive brands, restaurants, retail stores and corporate offices, delivering brand-compliant interiors to tight schedules without compromising on finish.',
    points: ['Automotive showrooms', 'Restaurants & cafés', 'Retail stores', 'Corporate offices'],
    image: P['blue-hyundai-hesarghatta'].photos[0],
  },
  {
    id: 'turnkey', title: 'Turnkey Projects', icon: 'KeyRound',
    short: 'One team from concept to handover: a single point of accountability.',
    body: 'Design, civil work, MEP coordination, joinery, finishes and furniture are all managed by us under one contract. You get one schedule, one budget and one team answerable for the result.',
    points: ['Design to handover', 'Single contract & schedule', 'Site supervision', 'Quality checks at every stage'],
    image: P['pizza-bakery-koramangala'].photos[0],
  },
  {
    id: 'construction', title: 'Construction & Renovation', icon: 'HardHat',
    short: 'Quality civil, structural and renovation work that realises the vision.',
    body: 'Our construction teams handle new builds, extensions and complete renovations, from structure and masonry to flooring, plumbing and electrical work.',
    points: ['Civil & structural work', 'Renovations & extensions', 'Flooring, tiling & masonry', 'Electrical & plumbing'],
    image: P['pizza-bakery-koramangala'].photos[15],
  },
  {
    id: 'consulting', title: 'Consulting', icon: 'Compass',
    short: 'Expert guidance on space, materials and budgets before you commit.',
    body: 'Thirty years on site gives us a practical view of what works. We help clients plan spaces, choose materials, set realistic budgets and timelines, and avoid costly surprises.',
    points: ['Feasibility & space planning', 'Material selection', 'Budget & timeline planning', 'Project reviews'],
    image: P['blue-hyundai-hesarghatta'].photos[11],
  },
];

export const PROCESS = [
  { title: 'Consultation', text: 'A detailed conversation about your goals, site, lifestyle and budget.' },
  { title: 'Space planning & concept', text: 'Layouts, mood boards and 3D views that bring the idea into focus.' },
  { title: 'Materials, budget & timeline', text: 'Finalised specifications and an itemised proposal with a schedule you can hold us to.' },
  { title: 'Execution & handover', text: 'In-house manufacturing, site supervision, regular progress updates and an on-time handover.' },
];

export const WHY = [
  { title: 'Three decades of experience', text: 'Building and designing in Bengaluru since 1996.' },
  { title: 'Our own factory', text: 'Custom interiors and furniture made in-house for better quality, fit and timelines.' },
  { title: 'One team, end to end', text: 'Design, construction and execution under one roof.' },
  { title: 'Transparent pricing', text: 'Itemised proposals and honest advice on what your budget can achieve.' },
  { title: 'On-time delivery', text: 'Professional project management and regular progress updates.' },
  { title: 'Trusted by leading brands', text: 'Showrooms, stores and restaurants for national and international names.' },
];

export const VALUES = [
  { title: 'Trust', text: 'We say what we will do, and then do it. Most of our work comes from repeat clients and referrals.' },
  { title: 'Craft', text: 'Details matter. Our own factory lets us control joinery, finish and fit down to the last millimetre.' },
  { title: 'Clarity', text: 'Clear drawings, clear budgets and clear timelines, so there are no surprises on site.' },
  { title: 'Care', text: 'We treat every space, whether a family home or a flagship showroom, as if it were our own.' },
];

export const FAQS = [
  { q: 'What types of projects do you handle?', a: 'Residential, commercial, hospitality, automotive and turnkey projects: apartments, villas, showrooms, offices, restaurants and retail.' },
  { q: 'Do you provide turnkey solutions?', a: 'Yes. We handle everything from concept and design through construction, interiors and final handover, under one roof.' },
  { q: 'Do you have your own factory?', a: 'Yes. We manufacture custom interiors and furniture in-house, which gives us tighter control over quality, finish and timelines.' },
  { q: 'How long does a residential project take?', a: 'It depends on scope. Apartments and villas typically take from a few weeks to a few months, and we share a detailed schedule before work begins.' },
  { q: 'Can you work within my budget?', a: 'Yes. We align design, materials and scope to your budget and are upfront about what is feasible.' },
  { q: 'How is pricing structured?', a: 'Pricing depends on scope, material specifications and complexity. Our proposals itemise all major costs.' },
];

export const PROJECT_TYPES = ['2 BHK', '3 BHK', 'Villa', 'Office', 'Showroom', 'Restaurant / Café', 'Retail', 'Renovation'];

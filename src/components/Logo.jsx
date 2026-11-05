import { LOGO } from '../data/logo';

// Vector logo. Colours follow the --lg-* variables of its surroundings; `full` adds the tagline.
export default function Logo({ full = false, className = '' }) {
  const g = full ? LOGO.full : LOGO.compact;
  return (
    <svg className={`logo ${className}`} viewBox={`0 0 ${g.w} ${g.h}`} role="img" aria-label="Esteem Interior Consultants"
      dangerouslySetInnerHTML={{ __html: g.body }} />
  );
}

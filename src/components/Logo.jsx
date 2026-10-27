import { LOGO } from '../data/logo';

export default function Logo({ icon = false, className = '' }) {
  const w = icon ? LOGO.iconW : LOGO.w;
  const h = icon ? LOGO.iconH : LOGO.h;
  return (
    <svg className={`logo ${className}`} viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Esteem Interiors & Consultants"
      dangerouslySetInnerHTML={{ __html: icon ? LOGO.iconBody : LOGO.body }} />
  );
}

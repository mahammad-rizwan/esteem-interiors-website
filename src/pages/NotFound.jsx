import { PageHeader } from '../components/Blocks';
import { Button } from '../components/ui';

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="This page has *moved.*" lead="The page you were looking for isn't here. Let's get you back on track." />
      <div className="container center-cta" style={{ paddingBottom: 120 }}><Button to="/">Back to home</Button></div>
    </>
  );
}

import { Link } from 'wouter';
import { SiteHeader, SiteFooter, usePageTitle } from '@/components/Site';

export function NotFound() {
  usePageTitle('Not found — Leyline');
  return (
    <div className="site wrap">
      <SiteHeader />
      <section className="hero" style={{ paddingBottom: 120 }}>
        <h1 className="display"><span>This page</span> <em>isn’t here.</em></h1>
        <p className="lede">It may have moved when we rebuilt the site.</p>
        <div><Link href="/" className="btn">Go to the homepage</Link></div>
      </section>
      <SiteFooter />
    </div>
  );
}

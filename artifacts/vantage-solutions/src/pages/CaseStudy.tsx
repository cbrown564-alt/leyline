import { Link, useParams } from 'wouter';
import { SiteHeader, SiteFooter, Ley, useReveal, usePageTitle, asset } from '@/components/Site';
import { findWork, WORK } from '@/content/work';
import { NotFound } from '@/pages/NotFound';

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 18L18 6M9 6h9v9" />
  </svg>
);

export function CaseStudy() {
  const { slug = '' } = useParams<{ slug: string }>();
  const w = findWork(slug);
  usePageTitle(w ? `${w.client} — Leyline` : 'Not found — Leyline');
  useReveal(slug);
  if (!w) return <NotFound />;

  const i = WORK.indexOf(w);
  const next = WORK[(i + 1) % WORK.length];

  return (
    <div className="site wrap">
      <SiteHeader />

      <section className="hero">
        <div className="eyebrow in"><Ley /><span className="label">{w.client}</span></div>
        <h1 className="display in" style={{ ['--d' as string]: '80ms' }}>
          <span>{w.title[0]}</span> <em>{w.title[1]}</em>
        </h1>
        <p className="lede in" style={{ ['--d' as string]: '160ms' }}>
          {w.lede} Live at <a href={w.site.url}>{w.site.label}</a>.
        </p>
      </section>

      <section className="section" aria-labelledby="compare-h">
        <h2 id="compare-h" className="h2" style={{ marginBottom: 28 }}>
          {w.compare.heading[0]} <em>{w.compare.heading[1]}</em>
        </h2>
        <div className="pair">
          <figure>
            <img src={asset(w.compare.before.src)} alt={w.compare.before.alt} width={1440} height={660} />
            <figcaption className="label"><b>Before</b><span>{w.compare.before.date}</span></figcaption>
          </figure>
          <figure className="now">
            <img src={asset(w.compare.after.src)} alt={w.compare.after.alt} width={1440} height={660} />
            <figcaption className="label"><b>After</b><span>{w.compare.after.date}</span></figcaption>
          </figure>
        </div>
        <p className="prose" style={{ marginTop: 40 }}>{w.compare.text}</p>
      </section>

      <section className="section lead-wrap" aria-label="Results">
        <div className="lead">
          <div className="in">
            <div className="big">{w.lead.value}{w.lead.unit && <small>{w.lead.unit}</small>}</div>
            <p className="big-note">{w.lead.label} <span>{w.lead.note}</span></p>
          </div>
          <div className="support">
            {w.support.map((s, n) => (
              <div key={s.value} className="in" style={{ ['--d' as string]: `${120 + n * 80}ms` }}>
                <strong>{s.value}</strong><p><b>{s.label}</b> {s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section changes">
        <h3 className="label">Also changed</h3>
        {w.changes.map((c, n) => (
          <div key={c.now} className="row in" style={{ ['--d' as string]: `${n * 80}ms` }}>
            <span className="was">{c.was}</span><Ley /><span className="now">{c.now}</span>
          </div>
        ))}
      </section>

      <div className="close">
        <a className="visit" href={w.site.url}>Visit the site <Arrow /></a>
        <div className="meta label">
          <div>Size<strong>{w.meta.size}</strong></div>
          <div>Time<strong>{w.meta.time}</strong></div>
          <div>Live<strong>{w.meta.live}</strong></div>
        </div>
      </div>

      <nav className="foot" aria-label="More work" style={{ borderTop: '1px solid var(--rule)', paddingBottom: 28 }}>
        <Link href="/#work" className="label">← All work</Link>
        {next !== w && <Link href={`/work/${next.slug}`} className="label">Next: {next.client} →</Link>}
      </nav>
      <SiteFooter />
    </div>
  );
}

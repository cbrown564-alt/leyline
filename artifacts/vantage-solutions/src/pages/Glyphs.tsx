import { SiteHeader, Ley, usePageTitle } from '@/components/Site';
import { Glyph, GLYPH_GROUPS } from '@/glyphs/Glyph';

// Reference sheet for the glyph library. Not linked from the site.
export function Glyphs() {
  usePageTitle('Glyphs — Leyline');
  return (
    <div className="site wrap">
      <SiteHeader />
      <section className="hero" style={{ paddingBottom: 24 }}>
        <div className="eyebrow"><Ley /><span className="label">Reference</span></div>
        <h1 className="display"><span>Glyphs.</span> <em>One node each.</em></h1>
        <p className="lede">24 grid, 1.5 stroke, one burgundy node marking the part that matters. They never animate.</p>
      </section>
      {GLYPH_GROUPS.map(g => (
        <section key={g.title} className="section" style={{ paddingTop: 64 }}>
          <div className="section-head"><h2 className="h2">{g.title}</h2><p /></div>
          <div className="specimen">
            {g.names.map(n => (
              <figure key={n}>
                <div className="sizes-row">
                  <Glyph name={n} size={64} />
                  <Glyph name={n} size={32} />
                  <Glyph name={n} size={20} />
                  <span className="dark"><Glyph name={n} size={32} /></span>
                </div>
                <figcaption className="label">{n}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
      <div style={{ height: 96 }} />
    </div>
  );
}

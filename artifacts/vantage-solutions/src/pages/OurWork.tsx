import { useEffect } from 'react';
import { Link } from 'wouter';
import { useIsMobile } from '../hooks/useIsMobile';
import { CONTACT_MAILTO } from '../lib/mailto';

const CREAM       = '#F5F3EC';
const INK         = '#1a1918';
const MUTE        = '#7a7367';
const BURGUNDY    = '#8B1A2C';
const GRID_FAINT  = 'rgba(139, 26, 44, 0.08)';
const GRID_ACTIVE = 'rgba(139, 26, 44, 0.20)';

const Logo = () => (
  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, letterSpacing: '0.01em', color: INK }}>
    leyline
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 6 }}>
      <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: BURGUNDY, flexShrink: 0 }} />
      <div style={{ flex: 1, height: 1, backgroundColor: BURGUNDY }} />
      <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: BURGUNDY, flexShrink: 0 }} />
    </div>
  </div>
);

const Section = ({ n, title, isMobile, children }: {
  n: string;
  title: string;
  isMobile: boolean;
  children: React.ReactNode;
}) => (
  <div style={{ borderTop: `1px solid ${GRID_ACTIVE}`, padding: isMobile ? '20px 0' : '26px 0', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 10 : 48 }}>
    <div>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: BURGUNDY, marginRight: 14 }}>{n}</span>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 19 : 21, lineHeight: 1.3 }}>{title}</span>
    </div>
    <div style={{ fontSize: 15, lineHeight: 1.75, color: '#3a3733', maxWidth: '62ch' }}>{children}</div>
  </div>
);

const P = ({ children, first = false }: { children: React.ReactNode; first?: boolean }) => (
  <p style={{ margin: 0, marginTop: first ? 0 : 14 }}>{children}</p>
);

// Note: keep these single-quoted strings free of apostrophes (past Vite crash).
const CAPABILITIES: [string, string][] = [
  ['AI implementation', 'Practical AI inside real workflows — drafting, triage and quicker answers for teams with no time to experiment.'],
  ['Logistics management', 'Sites, equipment and deliveries coordinated, so the right things are in the right place when the doors open.'],
  ['Contractor compliance', 'Documents, certifications and approvals tracked, so every contractor on site is known, qualified and recorded.'],
  ['Crew management', 'Seasonal crews scheduled, briefed and managed — at scale and often at short notice.'],
  ['Project management', 'Whole operations run against fixed dates, with everyone working from the same picture.'],
  ['Inductions', 'Every person arriving on site inducted properly — the right information, acknowledged and recorded, before work begins.'],
];

export function OurWork() {
  const isMobile = useIsMobile();
  const px = isMobile ? 'px-5' : 'px-12';
  const pl = isMobile ? '' : 'pl-12';

  useEffect(() => {
    const previous = document.title;
    document.title = 'Our Work — Leyline';
    return () => { document.title = previous; };
  }, []);

  return (
    <div
      className="min-h-screen w-full relative"
      style={{ backgroundColor: CREAM, color: INK, fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── HEADER ── */}
      <header
        className={`sticky top-0 flex justify-between items-center ${px} ${isMobile ? 'py-4' : 'py-7'} z-50`}
        style={{ borderBottom: `1px solid ${GRID_ACTIVE}`, backgroundColor: CREAM }}
      >
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logo />
        </Link>
        <Link
          href="/"
          style={{ fontSize: isMobile ? 10 : 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTE, textDecoration: 'none', transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = BURGUNDY}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTE}
        >
          ← Back to home
        </Link>
      </header>

      {/* ── INTRO ── */}
      <section className={`relative ${px} ${isMobile ? 'pt-10 pb-8' : 'pt-16 pb-12'} z-10`}>
        <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ left: isMobile ? 20 : 48, backgroundColor: GRID_FAINT }} />
        <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ right: isMobile ? 20 : 48, backgroundColor: GRID_FAINT }} />
        <div className={pl}>
          <div className="flex items-center gap-4 mb-8" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: MUTE }}>
            <div style={{ width: 32, height: 1, backgroundColor: BURGUNDY }} />
            Our work
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 'clamp(34px, 9vw, 48px)' : 'clamp(48px, 6vw, 72px)', lineHeight: 1.08, letterSpacing: '-0.01em', margin: 0 }}>
            A year in live events.
          </h1>
          <p style={{ marginTop: 24, fontSize: 16, color: MUTE, maxWidth: 520, lineHeight: 1.75, marginBottom: 0 }}>
            For the past year we have been building software for the live events sector — custom platforms and bespoke applications for the businesses that make things happen in the real world.
          </p>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <section className={`relative ${px} ${isMobile ? 'pb-10' : 'pb-14'} z-10`}>
        <div className={pl}>
          <Section n="01" title="An unforgiving sector" isMobile={isMobile}>
            <P first>
              Live events do not forgive average software. Everything happens once, in public, on a date that cannot move.
            </P>
            <P>
              Sites are temporary, crews are seasonal and contractors come and go — and when the doors open, the systems either work or they do not. That is the standard we build to, everywhere.
            </P>
          </Section>

          <Section n="02" title="Ice rinks" isMobile={isMobile}>
            <P first>
              Custom platforms for the ice rink industry — seasonal operations that compress a year of work into a few months, with sites standing up, running flat out and coming down again, and no room for error in between.
            </P>
            <P>
              The systems keep sites, crews, equipment and schedules moving in step, so the operation runs on the software rather than around it.
            </P>
          </Section>

          <Section n="03" title="Health &amp; safety" isMobile={isMobile}>
            <P first>
              Bespoke software for the health and safety sector — inductions, contractor compliance and documentation that stands up when it matters.
            </P>
            <P>
              Compliance is only real when it is recorded. These systems make the right thing the easy thing — every person inducted, every contractor approved, every document where it should be.
            </P>
          </Section>

          <Section n="04" title="Food markets" isMobile={isMobile}>
            <P first>
              Software for food markets — traders, logistics and the day-to-day running of operations that never sit still.
            </P>
            <P>
              Markets live on movement: traders arriving, stock turning, pitches changing. The software keeps the day organised without slowing it down.
            </P>
          </Section>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className={`relative ${px} ${isMobile ? 'pb-10' : 'pb-14'} z-10`}>
        <div className={pl}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 24 : 30, lineHeight: 1.2, margin: 0, borderTop: `1px solid ${GRID_ACTIVE}`, paddingTop: isMobile ? 24 : 32 }}>
            What the work included.
          </h2>
          {CAPABILITIES.map(([name, blurb]) => (
            <div key={name} style={{ borderTop: `1px solid ${GRID_ACTIVE}`, padding: isMobile ? '16px 0' : '20px 0', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 6 : 48 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 17 : 18, lineHeight: 1.35 }}>{name}</div>
              <div style={{ fontSize: 15, lineHeight: 1.75, color: '#3a3733', maxWidth: '62ch' }}>{blurb}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className={`relative ${px} ${isMobile ? 'pb-12' : 'pb-16'} z-10`}>
        <div className={pl}>
          <div style={{ borderTop: `1px solid ${GRID_ACTIVE}`, paddingTop: isMobile ? 24 : 32 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 24 : 30, lineHeight: 1.2, margin: 0 }}>
              What this means for you.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#3a3733', maxWidth: '62ch', marginTop: 16, marginBottom: 0 }}>
              If we can build software that holds up in live events — the most unforgiving environment there is — we can build it for your business. Whatever your world looks like, we would like to hear about it.
            </p>
            <div className="flex flex-wrap items-center" style={{ gap: isMobile ? 14 : 24, marginTop: 28 }}>
              <a
                href={CONTACT_MAILTO}
                style={{ backgroundColor: INK, color: CREAM, padding: '14px 32px', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'background .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = BURGUNDY; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = INK; }}
              >
                Start a conversation
              </a>
              <Link
                href="/"
                style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTE, textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = BURGUNDY}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTE}
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <footer
        className={`relative ${px} ${isMobile ? 'py-5' : 'py-6'} z-10 flex justify-between`}
        style={{ borderTop: `1px solid ${GRID_ACTIVE}`, fontSize: 11, letterSpacing: '0.12em', color: MUTE, textTransform: 'uppercase' }}
      >
        <span>© 2026 Leyline Ltd.</span>
        <Link
          href="/"
          style={{ color: MUTE, textDecoration: 'none', transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = BURGUNDY}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTE}
        >
          Back to home
        </Link>
      </footer>
    </div>
  );
}


import { useEffect } from 'react';
import { Link } from 'wouter';
import { useIsMobile } from '../hooks/useIsMobile';

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
const FAQ_ITEMS: [string, string][] = [
  ['Do I need to be technical?', 'No. You make the business decisions; we handle everything technical and explain it in plain language. If you can describe how your business works, you know enough to start.'],
  ['How long does a project take?', 'It depends on the scope, which we agree in writing before work begins — and you see working progress throughout, not just at the end.'],
  ['What does bespoke software cost?', 'Every project is fixed-price and agreed in writing before we start, so you always know the full cost before you commit to anything.'],
  ['Can it work with the tools we already use?', 'Connecting to the tools you already rely on — email, accounts packages, spreadsheets and the like — is something we assess and agree with you before any work begins.'],
  ['What if we need changes later?', 'You call us and we talk it through — the same people who built it. And because you own the code and the documentation, you are free to take it to anyone else, too.'],
];

export function PeaceOfMind() {
  const isMobile = useIsMobile();
  const px = isMobile ? 'px-5' : 'px-12';
  const pl = isMobile ? '' : 'pl-12';

  useEffect(() => {
    const previous = document.title;
    document.title = 'Peace of Mind — Leyline';
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
            Leyline Ltd
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 'clamp(34px, 9vw, 48px)' : 'clamp(48px, 6vw, 72px)', lineHeight: 1.08, letterSpacing: '-0.01em', margin: 0 }}>
            Peace of mind.
          </h1>
          <p style={{ marginTop: 24, fontSize: 16, color: MUTE, maxWidth: 480, lineHeight: 1.75, marginBottom: 0 }}>
            Bespoke software is a big decision. Here is exactly what you get with us — ownership, documentation, security and support, in plain language.
          </p>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <section className={`relative ${px} ${isMobile ? 'pb-10' : 'pb-14'} z-10`}>
        <div className={pl}>
          <Section n="01" title="You own the software" isMobile={isMobile}>
            <P first>
              Every system we build is bespoke, and once it is paid for it is yours — the code, the design and the intellectual property, in full.
            </P>
            <P>
              There are no licence fees, no subscriptions to keep your own software running, and no lock-in. If you ever want the entire codebase handed over, you get it.
            </P>
          </Section>

          <Section n="02" title="Complete documentation" isMobile={isMobile}>
            <P first>
              Every process we automate and every part of the technical stack is documented in plain English as we build — never as an afterthought.
            </P>
            <P>
              You receive documentation that explains what the system does, how it is put together, and how to run it day to day. It is written for you, not for other developers.
            </P>
          </Section>

          <Section n="03" title="Security and sign-in" isMobile={isMobile}>
            <P first>
              We do not hand-roll password systems. Sign-in is handled by established third-party authentication providers — the same kind of technology that protects the apps you already use — with access limited to the people in your business who need it.
            </P>
            <P>
              Your data travels over encrypted connections as standard.
            </P>
          </Section>

          <Section n="04" title="Your data, looked after" isMobile={isMobile}>
            <P first>
              Your database is the heart of the system, and we treat it that way. It is structured properly from the start, managed and maintained as your business changes, and backed up so that a mistake or a failure never becomes a lost afternoon — or a lost decade.
            </P>
          </Section>

          <Section n="05" title="Onboarding" isMobile={isMobile}>
            <P first>
              A new system only works if your team actually uses it. We onboard everyone who will touch it — setting people up, walking them through their part of it, and staying close until it feels ordinary.
            </P>
          </Section>

          <Section n="06" title="Training" isMobile={isMobile}>
            <P first>
              Training is included, hands-on and at your team’s pace. We show people how to do their real work in the new system, answer questions in plain language, and leave you with guides you can refer back to long after we have gone.
            </P>
          </Section>

          <Section n="07" title="Never dependent on us" isMobile={isMobile}>
            <P first>
              Because you own the code and hold the documentation, you are never dependent on us. Any competent developer could pick up your system and run with it.
            </P>
            <P>
              We would rather you stay because the work is good — not because leaving is hard.
            </P>
          </Section>

          <Section n="08" title="Your data can leave with you" isMobile={isMobile}>
            <P first>
              Your business data belongs to you. Ask at any point and we will provide a full export in a usable format — customers, history, documents, all of it.
            </P>
          </Section>

          <Section n="09" title="Support after launch" isMobile={isMobile}>
            <P first>
              When something needs fixing or changing, you speak to a person who knows your system — not a ticket queue. The same people who built it are the people who look after it.
            </P>
          </Section>

          <Section n="10" title="Fixed price, agreed scope" isMobile={isMobile}>
            <P first>
              The price and the scope are agreed in writing before any work begins. If the scope changes, we agree that too before it happens. You will never receive an invoice you were not expecting.
            </P>
          </Section>

          <Section n="11" title="Staged payments" isMobile={isMobile}>
            <P first>
              Nothing is paid in one lump sum. Payments are staged and tied to milestones you can see — working software in front of you before each payment falls due. You never pay for promises.
            </P>
          </Section>

          <Section n="12" title="Source-code deposit" isMobile={isMobile}>
            <P first>
              On request, your source code is deposited with an independent escrow service. If anything ever happened to Leyline, the code would be released to you — your business keeps running, whatever happens to ours.
            </P>
          </Section>

          <Section n="13" title="Insured, professional work" isMobile={isMobile}>
            <P first>
              Leyline Ltd carries professional indemnity insurance. Policy details are available on request.
            </P>
          </Section>
        </div>
      </section>

      {/* ── COMMON QUESTIONS ── */}
      <section className={`relative ${px} ${isMobile ? 'pb-12' : 'pb-16'} z-10`}>
        <div className={pl}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 24 : 30, lineHeight: 1.2, margin: 0, borderTop: `1px solid ${GRID_ACTIVE}`, paddingTop: isMobile ? 24 : 32 }}>
            Common questions.
          </h2>
          {FAQ_ITEMS.map(([q, a]) => (
            <div key={q} style={{ borderTop: `1px solid ${GRID_ACTIVE}`, padding: isMobile ? '16px 0' : '20px 0', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? 6 : 48 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 17 : 18, lineHeight: 1.35 }}>{q}</div>
              <div style={{ fontSize: 15, lineHeight: 1.75, color: '#3a3733', maxWidth: '62ch' }}>{a}</div>
            </div>
          ))}
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


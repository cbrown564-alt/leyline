import { useEffect } from 'react';
import { Link } from 'wouter';
import { useIsMobile } from '../hooks/useIsMobile';
import { CONTACT_MAILTO } from '../lib/mailto';

const CREAM = '#F5F3EC';
const INK = '#1a1918';
const MUTE = '#7a7367';
const BURGUNDY = '#8B1A2C';
const GRID_FAINT = 'rgba(139, 26, 44, 0.08)';
const GRID_ACTIVE = 'rgba(139, 26, 44, 0.20)';

const Logo = () => (
  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: INK }}>
    leyline
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 6 }}>
      <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: BURGUNDY }} />
      <div style={{ flex: 1, height: 1, backgroundColor: BURGUNDY }} />
      <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: BURGUNDY }} />
    </div>
  </div>
);

const Section = ({ n, title, isMobile, children }: {
  n: string;
  title: string;
  isMobile: boolean;
  children: React.ReactNode;
}) => (
  <div
    style={{
      borderTop: `1px solid ${GRID_ACTIVE}`,
      padding: isMobile ? '20px 0' : '26px 0',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '240px 1fr',
      gap: isMobile ? 10 : 48,
    }}
  >
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

export function LocalGrowth() {
  const isMobile = useIsMobile();
  const px = isMobile ? 'px-5' : 'px-12';
  const pl = isMobile ? '' : 'pl-12';

  useEffect(() => {
    const previous = document.title;
    document.title = 'Local Growth Systems — Leyline';
    return () => { document.title = previous; };
  }, []);

  return (
    <div className="min-h-screen w-full relative" style={{ backgroundColor: CREAM, color: INK, fontFamily: "'Inter', sans-serif" }}>
      <header
        className={`sticky top-0 flex justify-between items-center ${px} ${isMobile ? 'py-4' : 'py-7'} z-50`}
        style={{ borderBottom: `1px solid ${GRID_ACTIVE}`, backgroundColor: CREAM }}
      >
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}><Logo /></Link>
        <Link href="/" style={{ fontSize: isMobile ? 10 : 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTE, textDecoration: 'none' }}>
          ← Back to home
        </Link>
      </header>

      <section className={`relative ${px} ${isMobile ? 'pt-10 pb-8' : 'pt-16 pb-12'} z-10`}>
        <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ left: isMobile ? 20 : 48, backgroundColor: GRID_FAINT }} />
        <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ right: isMobile ? 20 : 48, backgroundColor: GRID_FAINT }} />
        <div className={pl}>
          <div className="flex items-center gap-4 mb-8" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: MUTE }}>
            <div style={{ width: 32, height: 1, backgroundColor: BURGUNDY }} />
            Local growth systems
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 'clamp(34px, 9vw, 48px)' : 'clamp(48px, 6vw, 72px)', lineHeight: 1.08, letterSpacing: '-0.01em', margin: 0, maxWidth: 850 }}>
            Be found when customers are ready to choose.
          </h1>
          <p style={{ marginTop: 24, fontSize: 16, color: MUTE, maxWidth: 560, lineHeight: 1.75, marginBottom: 0 }}>
            We help local businesses appear where buying decisions now begin — Google Maps, search and AI recommendations — then turn that attention into enquiries your team can act on.
          </p>
        </div>
      </section>

      <section className={`relative ${px} ${isMobile ? 'pb-10' : 'pb-14'} z-10`}>
        <div className={pl}>
          <Section n="01" title="The problem" isMobile={isMobile}>
            <P first>
              A good local business can be almost invisible online. Customers search nearby, compare a handful of results and make a decision before they ever reach most websites.
            </P>
            <P>
              Paid advertising can buy attention, but it stops when the budget stops. Meanwhile, unanswered calls, slow replies and disconnected enquiry forms allow valuable work to quietly go elsewhere.
            </P>
          </Section>

          <Section n="02" title="Local search visibility" isMobile={isMobile}>
            <P first>
              We strengthen the information that helps search engines understand who you are, what you do and where you work — including your Google Business Profile, service pages and local business details.
            </P>
            <P>
              The aim is simple: when someone nearby needs the service you provide, your business has a better chance of being considered.
            </P>
          </Section>

          <Section n="03" title="AI discoverability" isMobile={isMobile}>
            <P first>
              Customers are increasingly asking AI tools for recommendations instead of working through a page of search results.
            </P>
            <P>
              We structure your website and business information so AI systems can read it clearly, connect your business to the right services and locations, and find credible reasons to include you in an answer.
            </P>
          </Section>

          <Section n="04" title="A website built to convert" isMobile={isMobile}>
            <P first>
              Visibility only matters if the next step is obvious. We build fast, focused websites around the action a real customer needs to take — call, enquire, book or request a quote.
            </P>
            <P>
              The site becomes part of the operating system for winning work, not a brochure your team forgets to update.
            </P>
          </Section>

          <Section n="05" title="Reviews and reputation" isMobile={isMobile}>
            <P first>
              Reviews give people confidence and give search systems evidence. We can build a straightforward process for requesting feedback, keeping track of responses and making strong proof easier to find.
            </P>
          </Section>

          <Section n="06" title="A clearer follow-up system" isMobile={isMobile}>
            <P first>
              Calls, forms and messages should arrive in one place, with clear ownership and a next action. We connect enquiry capture to a simple CRM and practical automation, shaped around how your team already works.
            </P>
            <P>
              That can include immediate acknowledgements, missed-call follow-up, reminders and a visible pipeline — so promising enquiries do not go cold because everyone thought someone else had replied.
            </P>
          </Section>

          <Section n="07" title="One joined-up system" isMobile={isMobile}>
            <P first>
              Search visibility, AI discoverability, your website, reviews and follow-up are often sold as separate services. They work better as one system.
            </P>
            <P>
              Leyline designs the complete path from being discovered to winning the work, then builds only the parts your business actually needs.
            </P>
          </Section>
        </div>
      </section>

      <section className={`relative ${px} ${isMobile ? 'pb-12' : 'pb-16'} z-10`}>
        <div className={pl}>
          <div style={{ borderTop: `1px solid ${GRID_ACTIVE}`, paddingTop: isMobile ? 24 : 32 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 26 : 34, lineHeight: 1.2, margin: 0 }}>
              Built for businesses that win work locally.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: '#3a3733', maxWidth: '62ch', marginTop: 16 }}>
              If customers choose you based on where you work, what people say about you and how quickly you respond, we can help you build a stronger route from search to sale.
            </p>
            <a
              href={CONTACT_MAILTO}
              style={{ backgroundColor: INK, color: CREAM, padding: '14px 32px', marginTop: 14, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}
            >
              Talk about local growth
            </a>
          </div>
        </div>
      </section>

      <footer
        className={`relative ${px} ${isMobile ? 'py-5' : 'py-6'} z-10 flex justify-between`}
        style={{ borderTop: `1px solid ${GRID_ACTIVE}`, fontSize: 11, letterSpacing: '0.12em', color: MUTE, textTransform: 'uppercase' }}
      >
        <span>© 2026 Leyline Ltd.</span>
        <Link href="/" style={{ color: MUTE, textDecoration: 'none' }}>Back to home</Link>
      </footer>
    </div>
  );
}

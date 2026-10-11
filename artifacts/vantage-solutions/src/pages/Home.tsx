import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import ContactForm from '../components/ContactForm';
import SelectionPill from '../components/SelectionPill';
import { useIsMobile } from '../hooks/useIsMobile';
import { CONTACT_MAILTO } from '../lib/mailto';

const CREAM       = '#F5F3EC';
const INK         = '#1a1918';
const MUTE        = '#7a7367';
const BORDER      = '#e8e4db';
const WARM        = '#efece3';
const BURGUNDY    = '#8B1A2C';
const GRID_FAINT  = 'rgba(139, 26, 44, 0.08)';
const GRID_ACTIVE = 'rgba(139, 26, 44, 0.20)';

const NoiseOverlay = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-overlay">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="vb-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#vb-noise)" />
    </svg>
  </div>
);

const RuleLines = ({ isMobile = false }: { isMobile?: boolean }) => (
  <>
    <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ left: isMobile ? 20 : 48, backgroundColor: GRID_FAINT }} />
    <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ right: isMobile ? 20 : 48, backgroundColor: GRID_FAINT }} />
  </>
);


const ArrowUpRight = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="19" x2="19" y2="5" />
    <polyline points="9 5 19 5 19 15" />
  </svg>
);

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

const BUILD_ITEMS: { name: string; blurb: string }[] = [
  { name: 'CRM systems',          blurb: "Every customer, conversation and follow-up in one place, shaped around how you actually sell." },
  { name: 'Workflow automation',  blurb: "The repetitive work your team does every week, done automatically and without errors." },
  { name: 'Websites & web apps',  blurb: "Fast, considered websites and applications that win work rather than just list services." },
  { name: 'AI implementation',    blurb: "Practical AI where it genuinely saves time — drafted documents, triaged inboxes, quicker answers." },
  { name: 'Internal platforms',   blurb: "The spreadsheets and workarounds your business runs on, replaced by one proper system." },
  { name: 'Marketing materials',  blurb: "Print, decks and campaign assets produced to the same standard as your software." },
  { name: 'Client portals',       blurb: "A secure place for customers to check progress, share files and approve work themselves." },
  { name: 'Data dashboards',      blurb: "Your numbers in one live view, so decisions stop waiting for month-end reports." },
  { name: 'Booking & scheduling', blurb: "Appointments, rotas and availability that organise themselves and remind everyone involved." },
  { name: 'Document automation',  blurb: "Quotes, contracts and reports generated in seconds from information you already have." },
  { name: 'Inventory management', blurb: "Stock, orders and suppliers tracked live — no more counting, guessing or over-ordering." },
  { name: 'Mobile apps',          blurb: "Your service in your customers' pockets, and your team's tools in their hands on site." },
];

const BuildCard = ({ item, index, isMobile, open, onToggle, selected, onSelectToggle }: {
  item: { name: string; blurb: string };
  index: number;
  isMobile: boolean;
  open: boolean;
  onToggle: () => void;
  selected: boolean;
  onSelectToggle: () => void;
}) => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  // Touch devices synthesize mouseenter on tap but never fire mouseleave, which
  // left the burgundy "preview" stuck on and corrupted every card colour. Only
  // hover-capable devices (mouse/trackpad) may preview; taps drive open/selected.
  const canHover = typeof window !== 'undefined'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const preview = canHover && hover && !open; // burgundy tease while closed; open cards return to cream
  const i = index;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        backgroundColor: preview ? BURGUNDY : 'transparent',
        transition: 'background-color .25s ease',
        borderRight: (isMobile ? i % 2 === 0 : i % 4 < 3) ? `1px solid ${GRID_ACTIVE}` : 'none',
        borderBottom: (isMobile ? i < 10 : i < 8) ? `1px solid ${GRID_ACTIVE}` : 'none',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        aria-expanded={open}
        className="w-full text-left"
        style={{
          display: 'block',
          font: 'inherit',
          cursor: 'pointer',
          border: 'none',
          background: 'transparent',
          outline: focus ? `2px solid ${BURGUNDY}` : 'none',
          outlineOffset: -2,
          padding: '20px 20px 18px 0',
          paddingLeft: (isMobile ? i % 2 > 0 : i % 4 > 0) ? 20 : 0,
          color: INK,
        }}
      >
        <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: preview ? 'rgba(245,243,236,0.75)' : BURGUNDY, marginBottom: 10, transition: 'color .25s ease' }}>
          {String(i + 1).padStart(2, '0')}
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, lineHeight: 1.25, paddingRight: 36, color: preview ? CREAM : INK, transition: 'color .25s ease' }}>{item.name}</div>
        {open && (
          <p style={{ fontSize: 13, lineHeight: 1.65, color: MUTE, marginTop: 10, marginBottom: 0, maxWidth: '26ch' }}>
            {item.blurb}
          </p>
        )}
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onSelectToggle(); }}
        aria-pressed={selected}
        aria-label={selected ? `Remove ${item.name} from your inquiry` : `Add ${item.name} to your inquiry`}
        title={selected ? `Remove ${item.name} from your inquiry` : `Add ${item.name} to your inquiry`}
        style={{
          position: 'absolute',
          top: 14,
          right: 12,
          width: 26,
          height: 26,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          fontSize: 15,
          lineHeight: 1,
          cursor: 'pointer',
          border: `1px solid ${preview ? 'rgba(245,243,236,0.7)' : BURGUNDY}`,
          backgroundColor: selected ? (preview ? CREAM : BURGUNDY) : 'transparent',
          color: selected ? (preview ? BURGUNDY : CREAM) : (preview ? CREAM : BURGUNDY),
          transition: 'background-color .25s ease, color .25s ease, border-color .25s ease',
        }}
      >
        {selected ? '✓' : '+'}
      </button>
    </div>
  );
};

const FloatingCta = () => {
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const footer = document.getElementById('contact');
    const obs = new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting), { threshold: 0.05 });
    if (footer) obs.observe(footer);
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect(); };
  }, []);

  const visible = pastHero && !footerVisible;
  return (
    <a
      href="#contact"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      style={{
        position: 'fixed',
        right: 24,
        bottom: 'calc(24px + env(safe-area-inset-bottom))',
        zIndex: 50,
        backgroundColor: INK,
        color: CREAM,
        textDecoration: 'none',
        padding: '14px 22px 13px',
        display: 'block',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity .3s ease, transform .3s ease, background-color .2s ease',
        boxShadow: '0 8px 24px rgba(26,25,24,0.25)',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = BURGUNDY)}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = INK)}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        Start a conversation <ArrowUpRight size={14} />
      </span>
    </a>
  );
};

export function VantageSolutionsHome() {
  const [openPhase, setOpenPhase] = useState<number | null>(null);
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const toggleService = (name: string) =>
    setSelectedServices(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
  const isMobile = useIsMobile();
  // The full desktop header (8 links + CTA) needs ~1120px; below that, use the two-row layout.
  const compactHeader = useIsMobile(1120);

  // Mirrors FloatingCta's scroll observers: hides the selection pill while the
  // contact section is on screen, and lifts it above the CTA when both show.
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const footer = document.getElementById('contact');
    const obs = new IntersectionObserver(([e]) => setContactVisible(e.isIntersecting), { threshold: 0.05 });
    if (footer) obs.observe(footer);
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect(); };
  }, []);

  const px = isMobile ? 'px-5' : 'px-12';
  const pl = isMobile ? '' : 'pl-12';
  const sectionPy = isMobile ? 'py-10' : 'py-14';

  // Shared by the desktop header row and the mobile second-row nav strip.
  const navLinks = [
    ...['Services', 'Process', 'Approach', 'About', 'Contact'].map((l) => (
      <a key={l} href={`#${l.toLowerCase()}`} style={{ transition: 'color .2s' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = BURGUNDY}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTE}
      >{l}</a>
    )),
    <Link key="our-work" href="/our-work" style={{ transition: 'color .2s' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = BURGUNDY}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTE}
    >Our work</Link>,
    <Link key="peace-of-mind" href="/peace-of-mind" style={{ transition: 'color .2s' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = BURGUNDY}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTE}
    >Peace of mind</Link>,
    <Link key="privacy" href="/privacy" style={{ transition: 'color .2s' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = BURGUNDY}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = MUTE}
    >Privacy</Link>,
  ];

  return (
    <div
      className="min-h-screen w-full relative"
      style={{ backgroundColor: CREAM, color: INK, fontFamily: "'Inter', sans-serif" }}
    >
      <NoiseOverlay />

      {/* ── HEADER ── */}
      <header
        className={`sticky top-0 ${px} z-50`}
        style={{ borderBottom: `1px solid ${GRID_ACTIVE}`, backgroundColor: CREAM }}
      >
        <div className={`flex justify-between items-center ${compactHeader ? 'py-4' : 'py-7'}`}>
          <Logo />
          {!compactHeader && (
            <div className="flex items-center" style={{ gap: 36 }}>
              <nav className="flex items-center" style={{ gap: 26, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTE }}>
                {navLinks}
              </nav>
              <a
                href="#contact"
                className="transition-all duration-300"
                style={{ padding: '12px 28px', border: `1px solid ${INK}`, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', background: 'transparent', color: INK, display: 'inline-block', textDecoration: 'none', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = BURGUNDY; (e.currentTarget as HTMLElement).style.borderColor = BURGUNDY; (e.currentTarget as HTMLElement).style.color = CREAM; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = INK; (e.currentTarget as HTMLElement).style.color = INK; }}
              >
                Book a consultation
              </a>
            </div>
          )}
        </div>
        {compactHeader && (
          <nav className="flex flex-wrap items-center" style={{ gap: '10px 18px', paddingBottom: 14, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTE }}>
            {navLinks}
          </nav>
        )}
      </header>

      {/* ── HERO ── */}
      <section className={`relative flex flex-col ${px} ${isMobile ? 'pt-10' : 'pt-16'} pb-0 z-10`} style={{ borderBottom: `1px solid ${GRID_ACTIVE}`, minHeight: '80vh' }}>
        {/* Aerial fields background — fades in from right, leaves text side clear */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(/hero-bg-fields.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            WebkitMaskImage: 'linear-gradient(to right, transparent 20%, rgba(0,0,0,0.25) 44%, rgba(0,0,0,0.58) 100%)',
            maskImage: 'linear-gradient(to right, transparent 20%, rgba(0,0,0,0.25) 44%, rgba(0,0,0,0.58) 100%)',
            opacity: 0.72,
          }}
        />
        <RuleLines isMobile={isMobile} />
        <div className={`${pl} relative z-10`}>
          <div className="flex items-center gap-4 mb-10" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: MUTE }}>
            <div style={{ width: 32, height: 1, backgroundColor: BURGUNDY }} />
            Bespoke Software &amp; AI Consultancy
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 'clamp(38px, 11vw, 64px)' : 'clamp(64px, 9vw, 115px)', lineHeight: 1.05, letterSpacing: '-0.01em', maxWidth: 960, color: INK }}>
            Software <span style={{ color: BURGUNDY, fontWeight: 400, fontStyle: 'italic' }}>designed</span>
            <br />
            for how you
            <br />
            work.
          </h1>
          <p style={{ marginTop: 32, fontSize: 16, color: MUTE, maxWidth: 420, lineHeight: 1.75 }}>
            We build bespoke systems that fit your business.
          </p>
          <div style={{ marginTop: 44, display: 'flex', alignItems: 'center', gap: 32 }}>
            <a
              href="#contact"
              style={{ backgroundColor: INK, color: CREAM, padding: '14px 32px', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'background .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = BURGUNDY; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = INK; }}
            >
              Start a Conversation
            </a>
          </div>
        </div>

        {/* Services footer strip — every-engagement grid */}
        <div id="services" className={isMobile ? 'mt-12' : 'mt-16'} style={{ borderTop: `1px solid ${GRID_ACTIVE}` }}>
          <div style={{ padding: isMobile ? '12px 0 0' : '14px 0 0', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: BURGUNDY }}>
            Every engagement
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 0, borderTop: `1px solid ${GRID_ACTIVE}`, marginTop: isMobile ? 12 : 14 }}>
            {[
              'Custom build',
              'AI integration',
              'Documentation',
              'Training',
              'Support',
              'Roadmap',
              'Fixed pricing',
              'Continuity',
            ].map((title, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? '16px 20px' : '20px 28px',
                  textAlign: 'center',
                  borderBottom: (isMobile ? i < 6 : i < 4) ? `1px solid ${GRID_ACTIVE}` : 'none',
                  borderRight: (isMobile ? i % 2 === 0 : i % 4 < 3) ? `1px solid ${GRID_ACTIVE}` : 'none',
                }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16 }}>{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL STRIP ── */}
      <section
        className={`relative ${px} ${sectionPy} z-10`}
        style={{ backgroundColor: INK, borderBottom: `1px solid rgba(245,243,236,0.15)` }}
      >
        <div className="absolute top-0 bottom-0 w-px opacity-10 pointer-events-none" style={{ left: isMobile ? 20 : 48, backgroundColor: CREAM }} />
        <div className="absolute top-0 bottom-0 w-px opacity-10 pointer-events-none" style={{ right: isMobile ? 20 : 48, backgroundColor: CREAM }} />
        <div className={isMobile ? 'grid grid-cols-1 gap-6' : 'pl-12 grid grid-cols-12 gap-8 items-center'}>
          {isMobile ? (
            <div style={{ width: 32, height: 1, backgroundColor: BURGUNDY }} />
          ) : (
            <div className="col-span-1">
              <div style={{ width: 1, height: 56, backgroundColor: BURGUNDY }} />
            </div>
          )}
          <div className={isMobile ? '' : 'col-span-9'}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 2.5vw, 34px)', lineHeight: 1.45, letterSpacing: '-0.01em', color: CREAM, maxWidth: '52ch' }}>
              This is the era of bespoke software for established businesses with real domain expertise. AI has made it accessible — and those moving now are building advantages that compound every day.
            </p>
          </div>
          {!isMobile && (
            <div className="col-span-2 self-end text-right">
              <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,243,236,0.35)' }}>
                The case<br />for bespoke
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section
        id="approach"
        className={`relative ${px} ${sectionPy} z-10`}
        style={{ borderBottom: `1px solid ${GRID_ACTIVE}` }}
      >
        <RuleLines isMobile={isMobile} />
        <div className={pl}>
          <div className={isMobile ? 'grid grid-cols-1 gap-10 mb-10' : 'grid grid-cols-2 gap-16 items-start mb-10'}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: BURGUNDY, marginBottom: 14 }}>
                What we build
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                Built for your business.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: MUTE, maxWidth: '40ch', marginTop: 20 }}>
                Software that conforms to how your business operates. No licences, no lock-in — entirely yours.
              </p>
            </div>
            <div className="pt-4">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: `1px solid ${GRID_ACTIVE}` }}>
                {[
                  ['40–60%', 'Less manual work'],
                  ['5 phases', 'Fixed scope'],
                  ['100%', 'Custom-built'],
                ].map(([n, l], i) => (
                  <div key={i} style={{ paddingTop: 20, paddingRight: isMobile ? 10 : 16, paddingBottom: 4, borderRight: i < 2 ? `1px solid ${GRID_ACTIVE}` : 'none', paddingLeft: i > 0 ? (isMobile ? 10 : 16) : 0 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 22 : 28, letterSpacing: '-0.02em', color: BURGUNDY }}>{n}</div>
                    <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTE, marginTop: 6 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTE, marginBottom: 14 }}>
            Press + to add a service to your inquiry — press a card to read more.
          </div>
          <div style={{ borderTop: `1px solid ${GRID_ACTIVE}`, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)' }}>
            {BUILD_ITEMS.map((item, i) => (
              <BuildCard
                key={item.name}
                item={item}
                index={i}
                isMobile={isMobile}
                open={openCard === i}
                onToggle={() => setOpenCard(openCard === i ? null : i)}
                selected={selectedServices.includes(item.name)}
                onSelectToggle={() => {
                  // Adding a service also opens the card, so the description is
                  // seen at the moment of interest; deselecting leaves it open.
                  if (!selectedServices.includes(item.name)) setOpenCard(i);
                  toggleService(item.name);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR WORK (teaser) ── */}
      <section
        className={`relative ${px} ${sectionPy} z-10`}
        style={{ borderBottom: `1px solid ${GRID_ACTIVE}` }}
      >
        <RuleLines isMobile={isMobile} />
        <div className={pl}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: BURGUNDY, marginBottom: 14 }}>
            Our work
          </div>
          <div className={isMobile ? 'grid grid-cols-1 gap-8' : 'grid grid-cols-2 gap-16 items-start'}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.15, letterSpacing: '-0.01em', margin: 0 }}>
              A year in live events.
            </h2>
            <div className={isMobile ? '' : 'pt-4'}>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#3a3733', maxWidth: '52ch', margin: 0 }}>
                Custom platforms and bespoke applications for the ice rink industry, the health and safety sector and food markets — AI implementation, logistics, contractor compliance, crew management and more.
              </p>
              <Link href="/our-work" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 22, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: BURGUNDY, textDecoration: 'none' }}>
                See our work <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCAL GROWTH SYSTEMS ── */}
      <section
        className={`relative ${px} ${sectionPy} z-10`}
        style={{ backgroundColor: INK, color: CREAM, borderBottom: `1px solid ${GRID_ACTIVE}` }}
      >
        <div className="absolute top-0 bottom-0 w-px opacity-10 pointer-events-none" style={{ left: isMobile ? 20 : 48, backgroundColor: CREAM }} />
        <div className="absolute top-0 bottom-0 w-px opacity-10 pointer-events-none" style={{ right: isMobile ? 20 : 48, backgroundColor: CREAM }} />
        <div className={pl}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c35b6c', marginBottom: 14 }}>
            New service
          </div>
          <div className={isMobile ? 'grid grid-cols-1 gap-8' : 'grid grid-cols-2 gap-16 items-start'}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.15, letterSpacing: '-0.01em', margin: 0 }}>
              Be found. Be chosen. Follow every lead.
            </h2>
            <div className={isMobile ? '' : 'pt-4'}>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(245,243,236,0.7)', maxWidth: '52ch', margin: 0 }}>
                Local growth systems that connect Google Maps visibility, AI recommendations, a conversion-focused website, reviews and automated follow-up — creating a clearer route from search to conversation.
              </p>
              <Link href="/local-growth" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 22, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: CREAM, textDecoration: 'none' }}>
                Explore local growth <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        id="process"
        className={`relative ${px} ${sectionPy} z-10`}
        style={{ borderBottom: `1px solid ${GRID_ACTIVE}` }}
      >
        <RuleLines isMobile={isMobile} />
        <div className={pl}>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: BURGUNDY, marginBottom: 14 }}>
            How we work
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: 28 }}>
            Five phases. Fixed price throughout.
          </h2>
          <div style={{ borderTop: `1px solid ${GRID_ACTIVE}` }}>
            {[
              { n: '01', name: 'Consultation', tag: 'No obligation', body: "Real time inside your business before recommending anything. Honest advice, not a pre-written proposal." },
              { n: '02', name: 'Design',       tag: 'Fixed scope',   body: "The full solution documented and approved before a line of code is written." },
              { n: '03', name: 'Prototype',    tag: 'Testable',      body: "A working prototype tested by your team. You see exactly what you are buying." },
              { n: '04', name: 'Deployment',   tag: 'Full rollout',  body: "Full build and live rollout with embedded training until your team is independent." },
              { n: '05', name: 'Hosting',      tag: 'Managed',       body: "Deployed, monitored, and maintained. We handle the infrastructure." },
            ].map((ph, i) => (
              <div key={ph.n} style={{ borderBottom: `1px solid ${GRID_ACTIVE}` }}>
                <button
                  onClick={() => setOpenPhase(openPhase === i ? null : i)}
                  className={`w-full text-left flex items-baseline ${isMobile ? 'gap-4' : 'gap-6'} py-4 transition-colors duration-200`}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: INK }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = WARM}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
                >
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: BURGUNDY, minWidth: 28 }}>{ph.n}</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 20 : 'clamp(20px, 2.5vw, 30px)', flex: 1 }}>{ph.name}</span>
                  <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: MUTE, marginRight: isMobile ? 8 : 12 }}>{ph.tag}</span>
                  <span style={{ fontSize: 18, color: BURGUNDY, lineHeight: 1 }}>{openPhase === i ? '−' : '+'}</span>
                </button>
                {openPhase === i && (
                  <div style={{ paddingLeft: isMobile ? 20 : 34, paddingBottom: 24, paddingRight: isMobile ? 20 : 40 }}>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: '#3a3733', maxWidth: '52ch' }}>{ph.body}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section
        id="about"
        className={`relative ${px} ${sectionPy} z-10`}
        style={{ borderBottom: `1px solid ${GRID_ACTIVE}` }}
      >
        <RuleLines isMobile={isMobile} />
        <div className={pl}>
          <div className={isMobile ? 'grid grid-cols-1 gap-8' : 'grid grid-cols-2 gap-16 items-start'}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: BURGUNDY, marginBottom: 14 }}>
                About us
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                You will only ever speak to a human.
              </h2>
            </div>
            <div className={isMobile ? '' : 'pt-4'}>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#3a3733', maxWidth: '52ch' }}>
                As much as we love AI, it is great at some things and not so great at others. It drafts, sorts and accelerates — but it does not listen, judge or take responsibility.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#3a3733', maxWidth: '52ch', marginTop: 18 }}>
                So while we use AI every day to build better software, every conversation you have with Leyline is with a person — someone who knows your business and cares about the outcome. Real-life customer service, from the first call to long after handover.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 30, width: 120 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: BURGUNDY, flexShrink: 0 }} />
                <div style={{ flex: 1, height: 1, backgroundColor: BURGUNDY }} />
                <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: BURGUNDY, flexShrink: 0 }} />
              </div>
              <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: MUTE, marginTop: 14 }}>
                Human, always.
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${GRID_ACTIVE}`, marginTop: isMobile ? 32 : 40, paddingTop: isMobile ? 24 : 28, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 64 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: BURGUNDY }}>
              Where we work
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 20 : 'clamp(20px, 2vw, 26px)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                UK-wide, with a team based between London and Belfast.
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#3a3733', maxWidth: '52ch', marginTop: 12, marginBottom: 0 }}>
                We work with established businesses across the UK — on-site or remote, whichever works for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER / CTA ── */}
      <footer
        id="contact"
        className={`relative ${px} ${sectionPy} z-10`}
        style={{ backgroundColor: INK, color: CREAM }}
      >
        <div className="absolute top-0 bottom-0 w-px opacity-10 pointer-events-none" style={{ left: isMobile ? 20 : 48, backgroundColor: CREAM }} />
        <div className="absolute top-0 bottom-0 w-px opacity-10 pointer-events-none" style={{ right: isMobile ? 20 : 48, backgroundColor: CREAM }} />
        <div className={isMobile ? 'grid grid-cols-1 gap-12' : 'pl-12 grid grid-cols-2 gap-20 items-start'}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,243,236,0.5)', marginBottom: 28 }}>
              Start a conversation
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: 28 }}>
              Tell us what you are working with.
              <br />
              <span style={{ color: BURGUNDY, fontStyle: 'italic', fontWeight: 400 }}>
                See what's possible for your business.
              </span>
            </h2>
            <ContactForm
              selectedServices={selectedServices}
              onRemoveService={toggleService}
              onSubmitted={() => setSelectedServices([])}
            />
            <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,243,236,0.5)', marginBottom: 14 }}>
              Prefer email?
            </div>
            <a
              href={CONTACT_MAILTO}
              className="inline-flex items-center gap-3 transition-all duration-300"
              style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: CREAM, border: `1px solid rgba(245,243,236,0.4)`, padding: '14px 28px', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = BURGUNDY; (e.currentTarget as HTMLElement).style.borderColor = BURGUNDY; (e.currentTarget as HTMLElement).style.color = CREAM; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,243,236,0.4)'; (e.currentTarget as HTMLElement).style.color = CREAM; }}
            >
              hello@leylinedigital.co.uk
              <ArrowUpRight size={14} />
            </a>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(245,243,236,0.5)', marginTop: 12, marginBottom: 0 }}>
              Opens your email app with a few starter lines.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,243,236,0.5)', marginBottom: 28 }}>
              Contact
            </div>
            <p style={{ fontSize: 14, lineHeight: 2.2, color: 'rgba(245,243,236,0.7)' }}>
              <a
                href={CONTACT_MAILTO}
                style={{ color: 'rgba(245,243,236,0.7)', textDecoration: 'underline', textUnderlineOffset: 4, transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = CREAM}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,243,236,0.7)'}
              >hello@leylinedigital.co.uk</a>
            </p>
            <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(245,243,236,0.15)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              {['Services', 'Process', 'Approach', 'About', 'Contact'].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{ display: 'block', padding: '7px 0', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,243,236,0.5)', textDecoration: 'none', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = CREAM}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,243,236,0.5)'}
                >{l}</a>
              ))}
              <Link href="/our-work" style={{ display: 'block', padding: '7px 0', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,243,236,0.5)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = CREAM}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,243,236,0.5)'}
              >Our work</Link>
            </div>
          </div>
        </div>
        <div
          className={isMobile ? 'mt-10 pt-5 flex flex-col gap-2' : 'pl-12 mt-10 pt-5 flex justify-between'}
          style={{ borderTop: '1px solid rgba(245,243,236,0.12)', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(245,243,236,0.3)', textTransform: 'uppercase' }}
        >
          <span>© 2025 Leyline Ltd.</span>
          <span>Bespoke software &amp; AI · Fixed price · Five phases</span>
        </div>
      </footer>

      {/* ── FLOATING CTA ── */}
      <FloatingCta />

      {/* ── SELECTION PILL ── */}
      {selectedServices.length > 0 && (
        <SelectionPill
          count={selectedServices.length}
          hidden={contactVisible}
          raised={pastHero && !contactVisible}
          onReview={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        />
      )}
    </div>
  );
}


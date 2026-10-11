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

const PolicySection = ({ n, title, isMobile, children }: {
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

export function PrivacyPolicy() {
  const isMobile = useIsMobile();
  const px = isMobile ? 'px-5' : 'px-12';
  const pl = isMobile ? '' : 'pl-12';

  useEffect(() => {
    const previous = document.title;
    document.title = 'Privacy Policy — Leyline';
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
            Privacy policy.
          </h1>
          <p style={{ marginTop: 24, fontSize: 16, color: MUTE, maxWidth: 480, lineHeight: 1.75, marginBottom: 0 }}>
            Plain language, no legal fog — what we collect, why we collect it, and the control you have over it.
          </p>
          <div style={{ marginTop: 28, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTE }}>
            Effective date: August 2026 &nbsp;·&nbsp; Last updated: 2 August 2026
          </div>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <section className={`relative ${px} ${isMobile ? 'pb-10' : 'pb-14'} z-10`}>
        <div className={pl}>
          <PolicySection n="01" title="What this policy covers" isMobile={isMobile}>
            <P first>
              This policy explains how we handle your information when you visit our website, send us a message through the contact form, or email us directly.
            </P>
            <P>
              It applies to this website only. Work we do for clients is covered by its own agreements.
            </P>
          </PolicySection>

          <PolicySection n="02" title="What we collect" isMobile={isMobile}>
            <P first>
              <strong style={{ fontWeight: 600, color: INK }}>Information you give us.</strong> Your name, email address and whatever you tell us about your business when you submit the contact form or write to us.
            </P>
            <P>
              <strong style={{ fontWeight: 600, color: INK }}>Collected automatically.</strong> Our hosting platform keeps standard server logs — pages requested, browser type and IP address — which keep the site running and secure. We do not run analytics trackers or advertising cookies on this website.
            </P>
          </PolicySection>

          <PolicySection n="03" title="How we use your data" isMobile={isMobile}>
            <P first>
              We use what you send us to reply to your inquiry and carry on the conversation, to prepare a proposal if you ask for one, and to deliver and support any work that follows.
            </P>
            <P>
              We do not sell or rent your data, and we never will.
            </P>
          </PolicySection>

          <PolicySection n="04" title="AI tools" isMobile={isMobile}>
            <P first>
              We build AI systems for our clients, but this website has no AI chatbot, and nothing you send us through the contact form is used to train AI models.
            </P>
          </PolicySection>

          <PolicySection n="05" title="Third-party services" isMobile={isMobile}>
            <P first>
              Two services help us run this website: our hosting provider stores the site and contact form submissions on our behalf, and Resend delivers the email notification that tells us you have been in touch. Each has its own privacy policy covering how it handles that data. When you email us, your message travels through your own email provider to ours.
            </P>
          </PolicySection>

          <PolicySection n="06" title="Your rights" isMobile={isMobile}>
            <P first>
              Under UK GDPR you can ask us at any time to show you the personal data we hold about you, correct it, delete it, or stop using it for anything beyond replying to you.
            </P>
            <P>
              Email hello@leylinedigital.co.uk and we will sort it out.
            </P>
          </PolicySection>

          <PolicySection n="07" title="How long we keep it" isMobile={isMobile}>
            <P first>
              We keep inquiry details for as long as they are relevant to our conversation or any work that follows — and no longer. Ask us to delete them at any point and we will.
            </P>
          </PolicySection>

          <PolicySection n="08" title="Security" isMobile={isMobile}>
            <P first>
              This site is served over HTTPS and access to stored submissions is restricted to our team. Please do not include sensitive personal information in your message — a short description of what you need is plenty.
            </P>
          </PolicySection>

          <PolicySection n="09" title="Changes to this policy" isMobile={isMobile}>
            <P first>
              If we update this policy, the latest version will always be posted on this page with a revised date.
            </P>
          </PolicySection>

          <PolicySection n="10" title="Contact" isMobile={isMobile}>
            <P first>
              Questions, requests or concerns about privacy: email{' '}
              <a
                href="mailto:hello@leylinedigital.co.uk"
                style={{ color: INK, textDecoration: 'underline', textUnderlineOffset: 4, transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = BURGUNDY}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = INK}
              >
                hello@leylinedigital.co.uk
              </a>
              .
            </P>
          </PolicySection>
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


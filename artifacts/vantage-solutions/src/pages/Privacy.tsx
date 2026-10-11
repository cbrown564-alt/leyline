import type { ReactNode } from 'react';
import { SiteHeader, SiteFooter, Ley, usePageTitle } from '@/components/Site';
import { CONTACT_EMAIL } from '@/lib/mailto';

const Part = ({ title, children }: { title: string; children: ReactNode }) => (
  <section><h2>{title}</h2><div>{children}</div></section>
);

export function PrivacyPolicy() {
  usePageTitle('Privacy policy — Leyline');
  return (
    <div className="site wrap">
      <SiteHeader />
      <section className="hero" style={{ paddingBottom: 56 }}>
        <div className="eyebrow"><Ley /><span className="label">Leyline Ltd · Updated 2 August 2026</span></div>
        <h1 className="display">Privacy policy.</h1>
        <p className="lede">What we collect, why, and what you can ask us to do with it.</p>
      </section>

      <div className="policy">
        <Part title="What this covers">
          <p>How we handle your information when you visit this website, use the contact form, or email us. Client work is covered by its own agreements.</p>
        </Part>
        <Part title="What we collect">
          <p><strong>What you send us:</strong> your name, email address and what you tell us about your business.</p>
          <p><strong>Server logs:</strong> our host keeps standard logs (pages requested, browser type, IP address) to keep the site running and secure. We do not use analytics or advertising cookies.</p>
        </Part>
        <Part title="How we use it">
          <p>To reply to you, prepare a proposal if you ask for one, and deliver any work that follows. We do not sell or rent your data.</p>
        </Part>
        <Part title="AI tools">
          <p>This website has no chatbot, and nothing you send us is used to train AI models.</p>
        </Part>
        <Part title="Other services">
          <p>Our hosting provider stores the site and form submissions. Resend delivers the email that tells us you have been in touch. Each has its own privacy policy.</p>
        </Part>
        <Part title="Your rights">
          <p>Under UK GDPR you can ask us to show, correct or delete the data we hold about you, or to stop using it. Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </Part>
        <Part title="How long we keep it">
          <p>For as long as it is relevant to our conversation or any work that follows. Ask us to delete it at any time.</p>
        </Part>
        <Part title="Security">
          <p>The site uses HTTPS and only we can see stored submissions. Please do not send sensitive personal information through the form.</p>
        </Part>
        <Part title="Changes">
          <p>If we update this policy, the new version goes on this page with a new date.</p>
        </Part>
      </div>

      <div style={{ marginTop: 96, borderTop: '1px solid var(--rule)' }}><SiteFooter /></div>
    </div>
  );
}

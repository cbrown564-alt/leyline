import { useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { CONTACT_EMAIL } from '@/lib/mailto';

// The Leyline mark: a line between two nodes.
export const Ley = ({ className = '' }: { className?: string }) => (
  <span className={`ley ${className}`} aria-hidden="true"><i /><b /><i /></span>
);

const SECTIONS: { id: string; label: string; wide?: boolean }[] = [
  { id: 'work', label: 'Work' },
  { id: 'how', label: 'How we work', wide: true },
  { id: 'people', label: 'People', wide: true },
  { id: 'contact', label: 'Contact' },
];

// On the homepage the nav scrolls in place; elsewhere it returns home to that section.
function SectionLink({ id, wide, children }: { id: string; wide?: boolean; children: ReactNode }) {
  const [location] = useLocation();
  const className = wide ? 'wide' : undefined;
  return location === '/'
    ? <a href={`#${id}`} className={className}>{children}</a>
    : <Link href={`/#${id}`} className={className}>{children}</Link>;
}

export function SiteHeader() {
  return (
    <header className="mast">
      <Link href="/" className="word" aria-label="Leyline, home">leyline<Ley /></Link>
      <nav className="nav" aria-label="Main">
        {SECTIONS.map(s => <SectionLink key={s.id} id={s.id} wide={s.wide}>{s.label}</SectionLink>)}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="foot label">
      <span>© 2026 Leyline Ltd · London and Belfast</span>
      <nav aria-label="Footer">
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <Link href="/privacy">Privacy</Link>
      </nav>
    </footer>
  );
}

// Reveal `.in` elements once as they scroll into view. Re-run per page.
export function useReveal(key: unknown = null) {
  useEffect(() => {
    const els = document.querySelectorAll('.in:not(.shown)');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.classList.add('shown'));
      return;
    }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

export function usePageTitle(title: string) {
  useEffect(() => { document.title = title; }, [title]);
}

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

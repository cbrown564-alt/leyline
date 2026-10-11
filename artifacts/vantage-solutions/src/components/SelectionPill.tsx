const CREAM    = '#F5F3EC';
const BURGUNDY = '#8B1A2C';

/**
 * Floating confirmation shown once at least one service card has been added
 * to the inquiry. Sits in the bottom corner — stacked above the floating CTA
 * when that is visible — and smooth-scrolls to the contact form on click.
 */
export default function SelectionPill({ count, hidden, raised, onReview }: {
  count: number;    // how many services are currently selected
  hidden: boolean;  // true while the contact section is on screen
  raised: boolean;  // true while the floating CTA occupies the corner — stack above it
  onReview: () => void;
}) {
  const visible = !hidden;
  return (
    <button
      type="button"
      onClick={onReview}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      style={{
        position: 'fixed',
        right: 24,
        bottom: `calc(${raised ? 84 : 24}px + env(safe-area-inset-bottom))`,
        zIndex: 49,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        backgroundColor: BURGUNDY,
        color: CREAM,
        border: 'none',
        padding: '12px 18px 11px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity .3s ease, transform .3s ease, bottom .3s ease',
        boxShadow: '0 8px 24px rgba(26,25,24,0.25)',
      }}
    >
      <span aria-live="polite">{count} added to your inquiry</span>
      <span aria-hidden="true" style={{ width: 1, height: 12, backgroundColor: 'rgba(245,243,236,0.4)' }} />
      <span style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>Review</span>
    </button>
  );
}


import type { ReactElement } from 'react';

/**
 * Leyline glyphs.
 *
 * Grammar (keep new glyphs to it):
 *  - 24×24 grid, 1.25 stroke, round caps — drawn in currentColor.
 *  - Every glyph carries exactly one accent "node": a filled burgundy dot,
 *    the same dot that ends the ley line in the logo. It marks the point
 *    of value in the drawing (the key's bow, the chart's latest value).
 *  - Lines are paths with pathLength=1 so the motion library can draw them on.
 */

type Shape = { d?: string; circle?: [number, number, number]; rect?: [number, number, number, number, number?] };
type Def = { lines: Shape[]; node: [number, number, number?] };

const c = (cx: number, cy: number, r: number): Shape => ({ circle: [cx, cy, r] });
const r = (x: number, y: number, w: number, h: number, rx = 0): Shape => ({ rect: [x, y, w, h, rx] });
const p = (d: string): Shape => ({ d });

export const GLYPHS = {
  // ── What we build ──
  crm:        { lines: [r(3, 5, 18, 14, 1), c(9, 11, 2), p('M5.8 16.5c1.6-2.4 4.8-2.4 6.4 0'), p('M14 10h4'), p('M14 13h3')], node: [18, 13] },
  platform:   { lines: [p('M12 4l8 4-8 4-8-4z'), p('M4 12l8 4 8-4'), p('M4 16l8 4 8-4')], node: [12, 8] },
  inventory:  { lines: [p('M4 8l8-4 8 4v8l-8 4-8-4z'), p('M4 8l8 4 8-4'), p('M12 12v8')], node: [12, 12] },
  booking:    { lines: [r(4, 6, 16, 14, 1), p('M4 10h16'), p('M8 4v3'), p('M16 4v3'), p('M8 14h3')], node: [15.5, 15.5] },
  dashboard:  { lines: [p('M4 4v16h16'), p('M7 16l4-5 3 2 5-6')], node: [19, 7] },
  workflow:   { lines: [c(6, 6, 2.5), p('M8.5 6h7.5'), p('M6 8.5v4a3 3 0 0 0 3 3h6'), r(15, 13, 5, 5, 1)], node: [17.5, 6] },
  document:   { lines: [p('M6 3h8l4 4v14H6z'), p('M14 3v4h4'), p('M9 11h6'), p('M9 14h6'), p('M9 17.5h3.5')], node: [15, 17.5] },
  ai:         { lines: [p('M11 4c0 5 2 7 7 7-5 0-7 2-7 7 0-5-2-7-7-7 5 0 7-2 7-7z')], node: [18.5, 4.5] },
  web:        { lines: [r(3, 5, 18, 14, 1), p('M3 9h18'), p('M7 13h7'), p('M7 16h4')], node: [6, 7] },
  portal:     { lines: [p('M6 21V10a6 6 0 0 1 12 0v11'), p('M3 21h18')], node: [14.5, 15] },
  mobile:     { lines: [r(7, 3, 10, 18, 2), p('M10.5 18h3')], node: [12, 7] },
  marketing:  { lines: [p('M4 10v4h3l8 4V6l-8 4z'), p('M7 14l1.2 5'), p('M18 9.5a3.5 3.5 0 0 1 0 5')], node: [20.5, 12] },

  // ── Sectors ──
  rink:       { lines: [p('M6 4h6v8h6a2 2 0 0 1 2 2v2H6z'), p('M4 20h17'), p('M8.5 16v4'), p('M17 16v4'), p('M6 8h3')], node: [12, 8] },
  safety:     { lines: [p('M3 17h18'), p('M5.5 17v-2a6.5 6.5 0 0 1 13 0v2'), p('M10 9V6.5h4V9')], node: [12, 13] },
  market:     { lines: [p('M4 8l2-4h12l2 4'), p('M4 8c0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0'), p('M5 11v9h14v-9'), p('M10 20v-5h4v5')], node: [12, 6] },

  // ── Capabilities ──
  logistics:  { lines: [p('M3 6h11v10H3z'), p('M14 9.5h4l3 3.5v3h-7'), c(7, 17.5, 1.6)], node: [17.5, 17.5, 1.6] },
  compliance: { lines: [r(5, 4, 14, 17, 1), p('M9 4V3h6v1'), p('M8.5 12.5l2.5 2.5 4.5-4.5')], node: [15.5, 10.5] },
  crew:       { lines: [c(7, 9, 2), c(17, 9, 2), c(12, 7, 2.5), p('M3 18c0-3 1.8-5 4-5'), p('M21 18c0-3-1.8-5-4-5'), p('M7 20c0-4 2.2-6.5 5-6.5s5 2.5 5 6.5')], node: [12, 7, 1.2] },
  project:    { lines: [p('M4 3v18'), p('M4 6h8'), p('M8 11h10'), p('M11 16h7')], node: [20, 16] },
  induction:  { lines: [r(12, 3, 8, 18, 1), p('M3 12h7'), p('M7 9l3 3-3 3')], node: [17, 12] },

  // ── Promises ──
  own:        { lines: [c(7, 12, 3.5), p('M10.5 12H21'), p('M17 12v3'), p('M20 12v2')], node: [7, 12] },
  docs:       { lines: [p('M12 6C9 4 6 4 3 5v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1z'), p('M12 6v14')], node: [16.5, 10] },
  secure:     { lines: [r(5, 11, 14, 10, 1), p('M8 11V8a4 4 0 0 1 8 0v3')], node: [12, 16] },
  backup:     { lines: [p('M5 6c0-1.4 3.1-2.5 7-2.5s7 1.1 7 2.5-3.1 2.5-7 2.5S5 7.4 5 6z'), p('M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6'), p('M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5')], node: [16, 17.5] },
  onboard:    { lines: [c(10, 8, 3.5), p('M3 20c0-4 3-7 7-7 2.4 0 4.4 1 5.6 2.8'), p('M18 14v6'), p('M15 17h6')], node: [10, 8, 1.2] },
  train:      { lines: [r(3, 4, 18, 11, 1), p('M12 15v5'), p('M8 20h8'), p('M6 12l3-3 3 2 4-4')], node: [16, 7] },
  independent:{ lines: [p('M9.5 14.5L7 17a3.5 3.5 0 0 1-5-5l2.5-2.5'), p('M14.5 9.5L17 7a3.5 3.5 0 0 1 5 5l-2.5 2.5'), p('M9 4.5V7'), p('M15 17v2.5')], node: [12, 12] },
  export:     { lines: [p('M14 4h6v6'), p('M20 4l-9 9'), p('M18 14v6H4V6h6')], node: [11, 13] },
  support:    { lines: [p('M4 5h16v11h-9l-4 4v-4H4z'), p('M8 10.5h.01'), p('M16 10.5h.01')], node: [12, 10.5, 1.3] },
  price:      { lines: [p('M3 12V4h8l9 9-7 7z')], node: [7.5, 8] },
  staged:     { lines: [p('M3 20h5v-5h5v-5h5V5h3')], node: [18, 5] },
  escrow:     { lines: [r(3, 4, 18, 16, 1), c(12, 12, 4), p('M12 8v1.5'), p('M16 12h-1.5'), p('M3 9h-1'), p('M3 15h-1')], node: [12, 12] },
  insured:    { lines: [p('M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z'), p('M9 12l2 2 4-4')], node: [15, 10] },
  human:      { lines: [c(12, 8, 3.5), p('M5 20c0-4 3-7 7-7s7 3 7 7')], node: [12, 8, 1.2] },

  // ── Local growth ──
  pin:        { lines: [p('M12 21s-7-6.5-7-11.5a7 7 0 0 1 14 0C19 14.5 12 21 12 21z')], node: [12, 9.5, 2] },
  search:     { lines: [c(10.5, 10.5, 6), p('M15 15l5 5')], node: [10.5, 10.5] },
  answer:     { lines: [p('M4 5h16v11h-9l-4 4v-4H4z'), p('M12 7.5c0 2 1 3 3 3-2 0-3 1-3 3 0-2-1-3-3-3 2 0 3-1 3-3z')], node: [17.5, 7] },
  star:       { lines: [p('M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8L3.5 9.7l5.9-.9z')], node: [12, 12, 1.2] },
  inbox:      { lines: [p('M3 13l3-8h12l3 8v6H3z'), p('M3 13h5l1.5 2.5h5L16 13h5')], node: [12, 9] },
  reply:      { lines: [p('M10 8L5 12l5 4'), p('M5 12h9a5 5 0 0 1 5 5v1')], node: [19, 18] },

  // ── Utility ──
  arrow:      { lines: [p('M5 12h13'), p('M13 7l5 5-5 5')], node: [5, 12, 1.2] },
  check:      { lines: [p('M5 12.5l4.5 4.5L19 7.5')], node: [19, 7.5, 1.2] },
  plus:       { lines: [p('M12 5v14'), p('M5 12h14')], node: [12, 12, 1.2] },
} satisfies Record<string, Def>;

export type GlyphName = keyof typeof GLYPHS;

export function Glyph({ name, size = 24, draw, delay = 0, title, className = '' }: {
  name: GlyphName;
  size?: number;
  /** undefined = static; false = waiting to draw; true = draw on. Driven by useInView. */
  draw?: boolean;
  /** Stagger offset in ms when drawing as part of a group. */
  delay?: number;
  title?: string;
  className?: string;
}): ReactElement {
  const g: Def = GLYPHS[name];
  const state = draw === undefined ? '' : draw ? ' is-drawn' : ' is-waiting';
  return (
    <svg
      className={`glyph${draw !== undefined ? ' glyph--draw' : ''}${state} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ ['--d' as string]: `${delay}ms` }}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {g.lines.map((s, i) =>
        s.circle ? <circle key={i} cx={s.circle[0]} cy={s.circle[1]} r={s.circle[2]} pathLength={1} />
        : s.rect ? <rect key={i} x={s.rect[0]} y={s.rect[1]} width={s.rect[2]} height={s.rect[3]} rx={s.rect[4]} pathLength={1} />
        : <path key={i} d={s.d} pathLength={1} />,
      )}
      <circle className="glyph-node" cx={g.node[0]} cy={g.node[1]} r={g.node[2] ?? 1.5} fill="var(--node, var(--burgundy))" stroke="none" />
    </svg>
  );
}

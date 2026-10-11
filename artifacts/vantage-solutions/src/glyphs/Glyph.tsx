import type { ReactElement } from 'react';

/**
 * Leyline glyphs.
 *
 * Grammar (keep new glyphs to it):
 *  - 24×24 grid, 1.5 stroke, round caps and joins, drawn in currentColor.
 *  - Exactly one filled burgundy node per glyph: the dot from the logo. It
 *    marks the point that matters in the drawing (the button you press, the
 *    part being built). Everything else is line.
 *  - Things that connect are joined by straight lines, as in the logo.
 *  - Dashed line means "not built yet" (only the prototype uses it).
 *  - On dark backgrounds set --node to the light rose (see site.css).
 *  - Glyphs never animate. Motion is for feedback, not decoration.
 *  - Only draw what the site talks about. No glyph without a sentence beside it.
 */

type Shape = { d?: string; circle?: [number, number, number]; rect?: [number, number, number, number, number?]; dashed?: boolean };
type Def = { lines: Shape[]; node: [number, number, number?] };

const r = (x: number, y: number, w: number, h: number, rx = 0): Shape => ({ rect: [x, y, w, h, rx] });
const p = (d: string): Shape => ({ d });
// Dashed lines mean "not built yet". Use sparingly.
const dashed = (s: Shape): Shape => ({ ...s, dashed: true });

export const GLYPHS = {
  // ── How we work: one per step ──
  talk:      { lines: [p('M4 5.5h16v10.5h-8.5L7 19.5V16H4z')], node: [12, 10.75] },
  design:    { lines: [p('M6 3h8.5L18 6.5V21H6z'), p('M14.5 3v3.5H18'), p('M9 10.5h6'), p('M9 13.5h6')], node: [10, 17.5] },
  prototype: { lines: [dashed(r(3, 4.5, 18, 15, 1.5)), dashed(p('M7 9h10')), r(7, 12.5, 10, 4, 1.5)], node: [12, 14.5, 1.3] },
  build:     { lines: [p('M12 3.5l8 4-8 4-8-4z'), p('M4 12l8 4 8-4'), p('M4 16.5l8 4 8-4')], node: [12, 7.5] },
  lookAfter: { lines: [p('M19.5 12a7.5 7.5 0 1 1-2.2-5.3'), p('M19.5 3.5v4h-4')], node: [12, 12] },

  // ── Project sizes: one part, two joined, several joined ──
  small:     { lines: [r(6, 6, 12, 12, 2)], node: [12, 12, 1.9] },
  medium:    { lines: [r(2.5, 7.5, 8, 9, 1.5), r(13.5, 7.5, 8, 9, 1.5), p('M10.5 12h3')], node: [17.5, 12, 1.7] },
  large:     { lines: [r(2.5, 2.5, 7, 7, 1.5), r(14.5, 2.5, 7, 7, 1.5), r(8.5, 14.5, 7, 7, 1.5), p('M9.5 6h5'), p('M7 9.5l3.5 5'), p('M17 9.5l-3.5 5')], node: [12, 18, 1.6] },

  // ── What we build ──
  website:   { lines: [r(3, 4.5, 18, 15, 1.5), p('M3 8.5h18'), p('M6.5 12.5h8'), p('M6.5 15.5h5')], node: [5.75, 6.5, 1] },
  tool:      { lines: [r(5, 3, 14, 18, 1.5), p('M8 7.5h8'), p('M8 11h8'), r(8, 14.5, 5, 3, 1)], node: [10.5, 16, 1.1] },
  system:    { lines: [p('M5 6c0-1.4 3.1-2.5 7-2.5s7 1.1 7 2.5-3.1 2.5-7 2.5S5 7.4 5 6z'), p('M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6'), p('M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5')], node: [15.5, 17.5] },
  dashboard: { lines: [p('M4 4v16h16'), p('M7.5 15.5l3.5-4.5 3 2 4.5-6')], node: [18.5, 7] },

  // ── Utility ──
  arrow:     { lines: [p('M5 12h13.5'), p('M14 7.5l4.5 4.5-4.5 4.5')], node: [5, 12, 1.4] },
  external:  { lines: [p('M7 17L17 7'), p('M9.5 7H17v7.5')], node: [7, 17, 1.4] },
  check:     { lines: [p('M5 12.5l4.5 4.5L19 7.5')], node: [19, 7.5, 1.4] },
} satisfies Record<string, Def>;

export type GlyphName = keyof typeof GLYPHS;

export const GLYPH_GROUPS: { title: string; names: GlyphName[] }[] = [
  { title: 'How we work', names: ['talk', 'design', 'prototype', 'build', 'lookAfter'] },
  { title: 'Project sizes', names: ['small', 'medium', 'large'] },
  { title: 'What we build', names: ['website', 'tool', 'system', 'dashboard'] },
  { title: 'Utility', names: ['arrow', 'external', 'check'] },
];

export function Glyph({ name, size = 24, title, className = '' }: {
  name: GlyphName;
  size?: number;
  /** Give a title only when the glyph stands alone; beside text it is decorative. */
  title?: string;
  className?: string;
}): ReactElement {
  const g: Def = GLYPHS[name];
  return (
    <svg
      className={`glyph ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {g.lines.map((s, i) => {
        const dash = s.dashed ? { strokeDasharray: '2 2.5' } : undefined;
        return s.circle ? <circle key={i} cx={s.circle[0]} cy={s.circle[1]} r={s.circle[2]} {...dash} />
          : s.rect ? <rect key={i} x={s.rect[0]} y={s.rect[1]} width={s.rect[2]} height={s.rect[3]} rx={s.rect[4]} {...dash} />
          : <path key={i} d={s.d} {...dash} />;
      })}
      <circle cx={g.node[0]} cy={g.node[1]} r={g.node[2] ?? 1.6} fill="var(--node, var(--burgundy))" stroke="none" />
    </svg>
  );
}

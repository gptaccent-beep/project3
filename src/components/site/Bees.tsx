/**
 * Bees
 * Several bees that fly on their own looping, wandering paths across a section.
 * Purely decorative: no pointer events, hidden from screen readers, and fully
 * disabled when the visitor prefers reduced motion (handled in bees.css).
 *
 * Values are deterministic (no Math.random) so the server and client markup
 * always match and React never throws a hydration mismatch.
 */

type BeeSpec = {
  x: string
  y: string
  size: number
  path: 1 | 2 | 3 | 4
  duration: number
  delay: number
  drift: number
  opacity: number
}

const PRESETS: Record<string, BeeSpec[]> = {
  // Bigger, calmer swarm for tall image sections
  wide: [
    { x: "12%", y: "22%", size: 30, path: 1, duration: 19, delay: 0, drift: 1, opacity: 0.95 },
    { x: "68%", y: "14%", size: 22, path: 2, duration: 24, delay: -6, drift: 1.25, opacity: 0.8 },
    { x: "38%", y: "64%", size: 26, path: 3, duration: 21, delay: -3, drift: 0.85, opacity: 0.9 },
    { x: "82%", y: "58%", size: 18, path: 4, duration: 27, delay: -12, drift: 1.4, opacity: 0.7 },
    { x: "55%", y: "36%", size: 16, path: 2, duration: 30, delay: -18, drift: 1.6, opacity: 0.6 },
  ],
  // Fewer bees so they never fight with hero copy
  hero: [
    { x: "74%", y: "26%", size: 26, path: 1, duration: 22, delay: -2, drift: 1.2, opacity: 0.85 },
    { x: "86%", y: "62%", size: 19, path: 3, duration: 26, delay: -9, drift: 1.45, opacity: 0.7 },
    { x: "58%", y: "78%", size: 15, path: 4, duration: 31, delay: -16, drift: 1.7, opacity: 0.55 },
  ],
  // Compact swarm for side-by-side image blocks
  compact: [
    { x: "22%", y: "18%", size: 24, path: 2, duration: 20, delay: -1, drift: 0.9, opacity: 0.9 },
    { x: "70%", y: "52%", size: 18, path: 4, duration: 25, delay: -8, drift: 1.2, opacity: 0.72 },
    { x: "44%", y: "80%", size: 14, path: 1, duration: 29, delay: -14, drift: 1.5, opacity: 0.6 },
  ],
}

function Bee({ spec, index }: { spec: BeeSpec; index: number }) {
  const style = {
    left: spec.x,
    top: spec.y,
    width: spec.size,
    opacity: spec.opacity,
    animationName: `bee-wander-${spec.path}`,
    animationDuration: `${spec.duration}s`,
    animationDelay: `${spec.delay}s`,
    ["--bee-drift" as string]: spec.drift,
  } as React.CSSProperties

  return (
    <span className="bee-fly" style={style}>
      <span className="bee-bob" style={{ animationDuration: `${2.6 + index * 0.4}s` }}>
        <svg viewBox="0 0 64 44" role="presentation" focusable="false">
          <defs>
            <linearGradient id={`bee-body-${index}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f6d271" />
              <stop offset="55%" stopColor="#d89b22" />
              <stop offset="100%" stopColor="#8a5a12" />
            </linearGradient>
          </defs>
          {/* wings */}
          <g className="bee-wing bee-wing-back">
            <ellipse cx="26" cy="13" rx="13" ry="8" fill="rgba(255,252,240,0.55)" />
          </g>
          <g className="bee-wing bee-wing-front">
            <ellipse cx="36" cy="12" rx="11" ry="7" fill="rgba(255,255,255,0.68)" />
          </g>
          {/* body */}
          <ellipse cx="34" cy="26" rx="18" ry="11" fill={`url(#bee-body-${index})`} />
          {/* stripes */}
          <path d="M30 16.5c2.6 6 2.6 13 0 19" stroke="#2a1a08" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M38 17.5c2.2 5.5 2.2 11.5 0 17" stroke="#2a1a08" strokeWidth="3.1" fill="none" strokeLinecap="round" />
          {/* head + antennae */}
          <circle cx="51" cy="25" r="7" fill="#2a1a08" />
          <path d="M54 19c3-3 5-4 7-3.5" stroke="#2a1a08" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M52 18c1.5-4 3-5.5 5-6" stroke="#2a1a08" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* tail tip */}
          <path d="M16 26c-4-2-6-4-6-4s2-2 6-4" fill="#8a5a12" opacity="0.85" />
        </svg>
      </span>
    </span>
  )
}

export default function Bees({ variant = "wide" }: { variant?: "wide" | "hero" | "compact" }) {
  const bees = PRESETS[variant] ?? PRESETS.wide
  return (
    <div className="bee-field" aria-hidden="true">
      {bees.map((spec, i) => (
        <Bee key={`${variant}-${i}`} spec={spec} index={i} />
      ))}
    </div>
  )
}

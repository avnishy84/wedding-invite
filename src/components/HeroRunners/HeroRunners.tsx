import styles from './HeroRunners.module.css';

/**
 * HeroRunners
 * Decorative running animation: groom followed by bride crossing the hero bottom.
 * Plays once on load, hidden when prefers-reduced-motion is set.
 */
export function HeroRunners() {
  return (
    <div className={styles.runners} aria-hidden="true">
      {/* Ground line under characters */}
      <div className={styles.ground} />

      {/* Groom character - starts immediately */}
      <div className={styles.groom}>
        <svg
          viewBox="0 0 100 140"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.character}
        >
          {/* Head + safa (turban) */}
          <circle cx="50" cy="25" r="12" fill="var(--parchment)" />
          <ellipse cx="50" cy="20" rx="14" ry="8" fill="var(--peacock)" />
          <circle cx="50" cy="18" r="3" fill="var(--gold)" />

          {/* Sherwani body */}
          <ellipse cx="50" cy="50" rx="16" ry="20" fill="var(--ivory)" />
          <rect x="42" y="40" width="16" height="30" fill="var(--ivory)" rx="2" />
          {/* Gold trim on sherwani */}
          <line x1="42" y1="40" x2="42" y2="70" stroke="var(--gold)" strokeWidth="1.5" />
          <line x1="58" y1="40" x2="58" y2="70" stroke="var(--gold)" strokeWidth="1.5" />

          {/* Arms (will animate) */}
          <g className={styles.armLeft}>
            <rect x="32" y="45" width="8" height="25" fill="var(--ivory)" rx="4" />
            <circle cx="36" cy="72" r="4" fill="var(--parchment)" />
          </g>
          <g className={styles.armRight}>
            <rect x="60" y="45" width="8" height="25" fill="var(--ivory)" rx="4" />
            <circle cx="64" cy="72" r="4" fill="var(--parchment)" />
          </g>

          {/* Legs (will animate) */}
          <g className={styles.legLeft}>
            <rect x="42" y="70" width="7" height="35" fill="var(--ivory)" rx="3" />
            <ellipse cx="45" cy="107" rx="6" ry="4" fill="var(--gold)" />
          </g>
          <g className={styles.legRight}>
            <rect x="51" y="70" width="7" height="35" fill="var(--ivory)" rx="3" />
            <ellipse cx="54" cy="107" rx="6" ry="4" fill="var(--gold)" />
          </g>
        </svg>
      </div>

      {/* Bride character - delayed start */}
      <div className={styles.bride}>
        <svg
          viewBox="0 0 100 140"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.character}
        >
          {/* Head + jewelry */}
          <circle cx="50" cy="25" r="12" fill="var(--parchment)" />
          <circle cx="50" cy="20" r="5" fill="var(--gold)" />
          <circle cx="43" cy="27" r="2" fill="var(--gold)" />
          <circle cx="57" cy="27" r="2" fill="var(--gold)" />

          {/* Lehenga top */}
          <ellipse cx="50" cy="50" rx="18" ry="22" fill="var(--maroon)" />
          <rect x="40" y="38" width="20" height="30" fill="var(--maroon)" rx="2" />
          {/* Gold border */}
          <line x1="40" y1="38" x2="40" y2="68" stroke="var(--gold)" strokeWidth="1.5" />
          <line x1="60" y1="38" x2="60" y2="68" stroke="var(--gold)" strokeWidth="1.5" />
          <line x1="40" y1="68" x2="60" y2="68" stroke="var(--gold)" strokeWidth="2" />

          {/* Arms */}
          <g className={styles.armLeft}>
            <rect x="30" y="43" width="7" height="24" fill="var(--maroon)" rx="3" />
            <circle cx="33" cy="69" r="3" fill="var(--parchment)" />
          </g>
          <g className={styles.armRight}>
            <rect x="63" y="43" width="7" height="24" fill="var(--maroon)" rx="3" />
            <circle cx="66" cy="69" r="3" fill="var(--parchment)" />
          </g>

          {/* Lehenga skirt */}
          <path
            d="M 35 68 Q 35 90 30 110 L 70 110 Q 65 90 65 68 Z"
            fill="var(--maroon)"
            stroke="var(--gold)"
            strokeWidth="1.5"
          />

          {/* Legs (mostly hidden by lehenga) */}
          <g className={styles.legLeft}>
            <rect x="42" y="85" width="5" height="25" fill="var(--maroon-deep)" rx="2" />
            <ellipse cx="44" cy="112" rx="5" ry="3" fill="var(--gold)" />
          </g>
          <g className={styles.legRight}>
            <rect x="53" y="85" width="5" height="25" fill="var(--maroon-deep)" rx="2" />
            <ellipse cx="55" cy="112" rx="5" ry="3" fill="var(--gold)" />
          </g>

          {/* Dupatta flowing behind */}
          <g className={styles.dupatta}>
            <path
              d="M 50 40 Q 70 45 75 60 Q 78 75 80 95"
              fill="none"
              stroke="var(--gold-light)"
              strokeWidth="8"
              opacity="0.7"
            />
            <path
              d="M 50 42 Q 68 47 73 62 Q 76 77 78 97"
              fill="none"
              stroke="var(--maroon)"
              strokeWidth="4"
              opacity="0.6"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

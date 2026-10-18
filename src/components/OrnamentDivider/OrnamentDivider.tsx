import styles from './OrnamentDivider.module.css';
import LotusIcon from '../../assets/ornaments/lotus-divider.svg?react';

export type OrnamentVariant = 'lotus' | 'kalash' | 'paisley';

interface OrnamentDividerProps {
  variant: OrnamentVariant;
}

export function OrnamentDivider({ variant }: OrnamentDividerProps): JSX.Element {
  // TODO: Add a dedicated kalash.svg ornament in a future task.
  // For now, the 'kalash' variant reuses the lotus SVG with a different CSS class.
  // TODO: Add a dedicated paisley divider SVG. Currently all variants use the lotus SVG.
  return (
    <div
      className={`${styles.ornamentDivider} ornament-divider--${variant}`}
      aria-hidden="true"
    >
      <LotusIcon aria-hidden="true" focusable="false" />
    </div>
  );
}

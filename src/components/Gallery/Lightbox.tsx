import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import styles from './Lightbox.module.css';

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const { t } = useLang();
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
    // prev and next use functional state updates, so they're stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <div
      ref={dialogRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={images[index]?.alt ?? 'Photo'}
      tabIndex={-1}
    >
      <button
        className={styles.close}
        onClick={onClose}
        aria-label={t('closeLabel')}
        type="button"
      >
        ✕
      </button>
      <button className={styles.prev} onClick={prev} aria-label={t('prevLabel')} type="button">
        &#8249;
      </button>
      <img
        src={images[index]?.src}
        alt={images[index]?.alt ?? ''}
        className={styles.image}
        width={800}
        height={1200}
      />
      <button className={styles.next} onClick={next} aria-label={t('nextLabel')} type="button">
        &#8250;
      </button>
    </div>
  );
}

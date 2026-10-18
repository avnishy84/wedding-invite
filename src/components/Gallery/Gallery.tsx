import { useState, Suspense, lazy } from 'react';
import { useReveal } from '../../hooks/useReveal';
import styles from './Gallery.module.css';

const Lightbox = lazy(() => import('./Lightbox'));

const images = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/placeholder-${i + 1}.webp`,
  alt: `Wedding photo ${i + 1}`,
}));

export function Gallery() {
  const revealRef = useReveal();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className={styles.gallery} ref={revealRef} data-reveal>
      <div className={styles.grid}>
        {images.map((img, idx) => (
          <figure key={img.src} className={styles.figure}>
            <button
              className={styles.imgBtn}
              onClick={() => setSelectedIndex(idx)}
              aria-label={`View ${img.alt}`}
              type="button"
            >
              <img
                loading="lazy"
                src={img.src}
                width={400}
                height={600}
                alt={img.alt}
                className={styles.img}
              />
            </button>
            <figcaption className={styles.caption}>{img.alt}</figcaption>
          </figure>
        ))}
      </div>
      {selectedIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox
            images={images}
            initialIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
          />
        </Suspense>
      )}
    </section>
  );
}

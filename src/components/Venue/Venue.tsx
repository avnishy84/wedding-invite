import { useLang } from '../../hooks/useLang';
import { useReveal } from '../../hooks/useReveal';
import { weddingData } from '../../content/wedding';
import styles from './Venue.module.css';

export function Venue() {
  const { lang, t } = useLang();
  const revealRef = useReveal();

  return (
    <section id="venue" className={styles.venue} ref={revealRef} data-reveal>
      <div className={styles.inner}>
        <h2 className={styles.venueName}>{weddingData.venue.name[lang]}</h2>
        <p className={styles.address}>{weddingData.venue.address[lang]}</p>
        <div className={styles.travelBlock}>
          <h3 className={styles.travelHeading}>{t('travelLabel')}</h3>
          <p>{weddingData.venue.travelNotes[lang]}</p>
        </div>
        <a
          href={weddingData.venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapsBtn}
        >
          {t('openMaps')}
        </a>
      </div>
    </section>
  );
}

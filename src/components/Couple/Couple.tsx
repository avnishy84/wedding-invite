import { useLang } from '../../hooks/useLang';
import { useReveal } from '../../hooks/useReveal';
import { weddingData } from '../../content/wedding';
import { OrnamentDivider } from '../OrnamentDivider/OrnamentDivider';
import styles from './Couple.module.css';

export function Couple() {
  const { lang } = useLang();
  const revealRef = useReveal();

  return (
    <section id="couple" className={styles.couple} ref={revealRef} data-reveal>
      <div className={styles.inner}>
        <div className={styles.familyBlock}>
          <h2 className={styles.familyHeading}>{weddingData.couple.brideName[lang]}</h2>
          <p className={styles.parents}>{weddingData.couple.brideParents[lang]}</p>
        </div>
        <OrnamentDivider variant="lotus" />
        <div className={styles.familyBlock}>
          <h2 className={styles.familyHeading}>{weddingData.couple.groomName[lang]}</h2>
          <p className={styles.parents}>{weddingData.couple.groomParents[lang]}</p>
        </div>
        <p className={styles.coupleNote}>{weddingData.couple.coupleNote[lang]}</p>
      </div>
    </section>
  );
}

import { useLang } from '../../hooks/useLang';
import { useReveal } from '../../hooks/useReveal';
import { weddingData } from '../../content/wedding';
import { OrnamentDivider } from '../OrnamentDivider/OrnamentDivider';
import styles from './Blessing.module.css';

export function Blessing() {
  const { lang } = useLang();
  const revealRef = useReveal();

  return (
    <section id="blessing" className={styles.blessing} ref={revealRef} data-reveal>
      <div className={styles.inner}>
        <p className={styles.invocation}>{weddingData.meta.invocation[lang]}</p>
        <blockquote className={styles.quote}>{weddingData.couple.coupleNote[lang]}</blockquote>
      </div>
      <OrnamentDivider variant="lotus" />
    </section>
  );
}

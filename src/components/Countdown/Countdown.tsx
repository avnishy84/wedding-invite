import { useLang } from '../../hooks/useLang';
import { useReveal } from '../../hooks/useReveal';
import { useCountdown } from '../../hooks/useCountdown';
import { weddingData } from '../../content/wedding';
import styles from './Countdown.module.css';

export function Countdown() {
  const { t } = useLang();
  const revealRef = useReveal();
  const { days, hours, minutes, seconds, isPast } = useCountdown(
    weddingData.weddingDateIso,
    weddingData.timezone
  );

  if (isPast) {
    return (
      <section id="countdown" className={styles.countdown} ref={revealRef} data-reveal>
        <p className={styles.celebration}>{t('celebrationMessage')}</p>
      </section>
    );
  }

  return (
    <section id="countdown" className={styles.countdown} ref={revealRef} data-reveal>
      <div className={styles.grid}>
        <div className={styles.box}>
          <span className={styles.number}>{days}</span>
          <span className={styles.label}>{t('days')}</span>
        </div>
        <div className={styles.box}>
          <span className={styles.number}>{hours}</span>
          <span className={styles.label}>{t('hours')}</span>
        </div>
        <div className={styles.box}>
          <span className={styles.number}>{minutes}</span>
          <span className={styles.label}>{t('minutes')}</span>
        </div>
        <div className={styles.box}>
          <span className={styles.number}>{seconds}</span>
          <span className={styles.label}>{t('seconds')}</span>
        </div>
      </div>
    </section>
  );
}

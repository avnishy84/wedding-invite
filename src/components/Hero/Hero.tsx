import { useLang } from '../../hooks/useLang';
import { useReveal } from '../../hooks/useReveal';
import { weddingData } from '../../content/wedding';
import MandalaIcon from '../../assets/ornaments/mandala.svg?react';
import ArchIcon from '../../assets/ornaments/arch.svg?react';
import ToranIcon from '../../assets/ornaments/toran.svg?react';
import styles from './Hero.module.css';

export function Hero() {
  const { lang, t } = useLang();
  const revealRef = useReveal();

  const dateObj = new Date(weddingData.weddingDateIso);
  const formatter = new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    dateStyle: 'full',
    timeZone: 'Asia/Kolkata',
  });
  const formattedDate = formatter.format(dateObj);

  return (
    <section id="hero" className={styles.hero} ref={revealRef} data-reveal>
      <div className={styles.toranWrap} aria-hidden="true">
        <ToranIcon />
      </div>
      <div className={styles.mandalaWrap} aria-hidden="true">
        <MandalaIcon />
      </div>
      <div className={styles.archWrap} aria-hidden="true">
        <ArchIcon />
      </div>
      <div className={styles.content}>
        <p className={styles.invocation}>{weddingData.meta.invocation[lang]}</p>
        <h1>
          <span className={styles.brideName}>{weddingData.couple.brideName[lang]}</span>
          <span className={styles.weds}>{t('weds')}</span>
          <span className={styles.groomName}>{weddingData.couple.groomName[lang]}</span>
        </h1>
        <p className={styles.date}>{formattedDate}</p>
        <p className={styles.scrollCue} aria-label={t('scrollCue')}>
          <span className={styles.chevron} aria-hidden="true">
            &#8964;
          </span>{' '}
          {t('scrollCue')}
        </p>
      </div>
    </section>
  );
}

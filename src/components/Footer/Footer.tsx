import { useLang } from '../../hooks/useLang';
import { weddingData } from '../../content/wedding';
import styles from './Footer.module.css';

export function Footer() {
  const { lang, t } = useLang();

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.signoff}>
          {weddingData.couple.brideName[lang]} & {weddingData.couple.groomName[lang]}
        </p>
        <p className={styles.withLove}>{t('withLove')}</p>
        <div className={styles.contacts}>
          <a
            href={`https://wa.me/${weddingData.contact.phone1.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waLink}
          >
            {t('contactUs')} — {weddingData.contact.phone1}
          </a>
          <a
            href={`https://wa.me/${weddingData.contact.phone2.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waLink}
          >
            {t('contactUs')} — {weddingData.contact.phone2}
          </a>
        </div>
        <p className={styles.copyright}>© 2027 | No tracking, no ads, just love</p>
      </div>
    </footer>
  );
}

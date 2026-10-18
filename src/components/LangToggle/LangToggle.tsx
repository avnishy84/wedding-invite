import { useLang } from '../../hooks/useLang';
import styles from './LangToggle.module.css';

export function LangToggle() {
  const { lang, setLang, t } = useLang();

  const handleToggle = () => {
    setLang(lang === 'en' ? 'hi' : 'en');
  };

  return (
    <button
      className={styles.button}
      onClick={handleToggle}
      aria-label={t('langToggleLabel')}
    >
      {lang === 'en' ? 'हि' : 'EN'}
    </button>
  );
}

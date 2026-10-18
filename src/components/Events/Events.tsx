import { useLang } from '../../hooks/useLang';
import { useReveal } from '../../hooks/useReveal';
import { weddingData } from '../../content/wedding';
import { downloadIcs } from '../../lib/ics';
import MandalaIcon from '../../assets/ornaments/mandala.svg?react';
import styles from './Events.module.css';

export function Events() {
  const { lang, t } = useLang();
  const revealRef = useReveal();

  return (
    <section id="events" className={styles.events} ref={revealRef} data-reveal>
      <h2 className={styles.heading}>
        {lang === 'hi' ? 'कार्यक्रम' : 'Wedding Events'}
      </h2>
      <div className={styles.grid}>
        {weddingData.events.map((event) => {
          const dateObj = new Date(event.dateIso);
          const dateFormatted = new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', {
            dateStyle: 'long',
            timeZone: 'Asia/Kolkata',
          }).format(dateObj);
          const timeFormatted = new Intl.DateTimeFormat('en-IN', {
            timeStyle: 'short',
            timeZone: 'Asia/Kolkata',
            hour12: true,
          }).format(dateObj);

          return (
            <article key={event.id} className={styles.card}>
              <MandalaIcon className={styles.watermark} aria-hidden="true" />
              <h3 className={styles.eventName}>{event.name[lang]}</h3>
              <p className={styles.eventDate}>{dateFormatted}</p>
              <p className={styles.eventTime}>{timeFormatted}</p>
              <p className={styles.eventVenue}>{event.venue[lang]}</p>
              <span className={styles.dressCode}>
                <span className={styles.dressCodeLabel}>{t('dressCodeLabel')}:</span>{' '}
                {event.dressCode[lang]}
              </span>
              <button
                className={styles.calBtn}
                onClick={() => downloadIcs(event, lang, event.name[lang] + '.ics')}
                type="button"
              >
                {t('addToCalendar')}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

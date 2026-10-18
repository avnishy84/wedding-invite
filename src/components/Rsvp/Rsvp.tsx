import { useState } from 'react';
import { useLang } from '../../hooks/useLang';
import { useReveal } from '../../hooks/useReveal';
import { weddingData } from '../../content/wedding';
import { validateRsvp, submitRsvp } from '../../lib/rsvp';
import styles from './Rsvp.module.css';

export function Rsvp() {
  const { lang, t } = useLang();
  const revealRef = useReveal();

  const [name, setName] = useState('');
  const [guests, setGuests] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleEventChange = (eventId: string, checked: boolean) => {
    setSelectedEvents((prev) =>
      checked ? [...prev, eventId] : prev.filter((id) => id !== eventId)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateRsvp({
      name,
      guests: Number(guests),
      events: selectedEvents,
      attending: attending ?? undefined,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      await submitRsvp({
        name: name.trim(),
        guests: Number(guests),
        events: selectedEvents,
        attending: attending as boolean,
        message: message || undefined,
      });
      setStatus('success');
    } catch (e) {
      if ((e as Error).message === 'RSVP_DISABLED') {
        setStatus('idle');
      } else {
        setStatus('error');
      }
    }
  };

  const handleRetry = () => {
    setStatus('idle');
  };

  const deadlineFormatted = new Intl.DateTimeFormat('en-IN', { dateStyle: 'long' }).format(
    new Date(weddingData.rsvp.deadline)
  );

  const isFirestoreEnabled = import.meta.env.VITE_ENABLE_RSVP_FIRESTORE === 'true';

  // WhatsApp fallback URL
  const waText = encodeURIComponent(
    `Name: ${name}\nEvents: ${selectedEvents
      .map((id) => weddingData.events.find((e) => e.id === id)?.name[lang] ?? id)
      .join(', ')}`
  );
  const waUrl = `https://wa.me/${weddingData.rsvp.whatsappNumber.replace(/\D/g, '')}?text=${waText}`;

  if (status === 'success') {
    return (
      <section id="rsvp" className={styles.rsvp} ref={revealRef} data-reveal>
        <div className={styles.inner}>
          <div className={styles.successOverlay}>
            <h2 className={styles.heading}>{t('rsvpSectionTitle')}</h2>
            <p className={styles.successMessage}>{t('rsvpSuccessMessage')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className={styles.rsvp} ref={revealRef} data-reveal>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t('rsvpSectionTitle')}</h2>
        <p className={styles.deadline}>
          {t('rsvpDeadline')} {deadlineFormatted}
        </p>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Name field */}
          <div className={styles.field}>
            <label htmlFor="rsvp-name">{t('rsvpNameLabel')}</label>
            <input
              id="rsvp-name"
              type="text"
              required
              maxLength={80}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            {errors.name && (
              <span role="alert" className={styles.error}>
                {errors.name}
              </span>
            )}
          </div>

          {/* Guests field */}
          <div className={styles.field}>
            <label htmlFor="rsvp-guests">{t('rsvpGuestsLabel')}</label>
            <input
              id="rsvp-guests"
              type="number"
              required
              min={1}
              max={10}
              value={guests}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGuests(e.target.value)}
            />
            {errors.guests && (
              <span role="alert" className={styles.error}>
                {errors.guests}
              </span>
            )}
          </div>

          {/* Events field */}
          <div className={styles.field}>
            <fieldset>
              <legend>{t('rsvpEventsLabel')}</legend>
              {weddingData.events.map((event) => (
                <label key={event.id} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={event.id}
                    checked={selectedEvents.includes(event.id)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleEventChange(event.id, e.target.checked)
                    }
                  />
                  {event.name[lang]}
                </label>
              ))}
            </fieldset>
            {errors.events && (
              <span role="alert" className={styles.error}>
                {errors.events}
              </span>
            )}
          </div>

          {/* Attending field */}
          <div className={styles.field}>
            <fieldset>
              <legend>{t('rsvpAttendingLabel')}</legend>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === true}
                  onChange={() => setAttending(true)}
                />
                {t('rsvpYes')}
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === false}
                  onChange={() => setAttending(false)}
                />
                {t('rsvpNo')}
              </label>
            </fieldset>
            {errors.attending && (
              <span role="alert" className={styles.error}>
                {errors.attending}
              </span>
            )}
          </div>

          {/* Message field */}
          <div className={styles.field}>
            <label htmlFor="rsvp-message">{t('rsvpMessageLabel')}</label>
            <textarea
              id="rsvp-message"
              maxLength={300}
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            />
            {errors.message && (
              <span role="alert" className={styles.error}>
                {errors.message}
              </span>
            )}
          </div>

          {/* Submit or WhatsApp button */}
          {status === 'error' ? (
            <div className={styles.errorMsg}>
              <p>{t('rsvpErrorMessage')}</p>
              <button type="button" className={styles.submitBtn} onClick={handleRetry}>
                Retry
              </button>
            </div>
          ) : isFirestoreEnabled ? (
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? t('rsvpSubmitting') : t('rsvpSubmitButton')}
            </button>
          ) : (
            <a href={waUrl} className={styles.waBtn} target="_blank" rel="noopener noreferrer">
              {t('rsvpWhatsappFallback')}
            </a>
          )}
        </form>
      </div>
    </section>
  );
}

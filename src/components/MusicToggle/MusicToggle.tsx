// Audio file at /public/audio/wedding-music.mp3 (add in production)
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../hooks/useLang';
import styles from './MusicToggle.module.css';

export function MusicToggle() {
  const { t } = useLang();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    const stored = localStorage.getItem('wedding-music-muted');
    return stored === 'false' ? false : true; // default true (muted)
  });

  useEffect(() => {
    localStorage.setItem('wedding-music-muted', String(isMuted));
  }, [isMuted]);

  const handleToggle = async () => {
    try {
      // Create audio element on first interaction (user gesture required)
      if (!audioRef.current) {
        const audio = new Audio('/audio/wedding-music.mp3');
        audio.loop = true;
        audioRef.current = audio;
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsMuted(true);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
      }
    } catch (error) {
      // Handle missing file or playback error gracefully
      console.warn('Music playback failed:', error);
      setIsPlaying(false);
      setIsMuted(true);
    }
  };

  return (
    <button
      className={styles.button}
      onClick={handleToggle}
      aria-label={t('musicToggleLabel')}
      type="button"
    >
      <span aria-hidden="true">{isPlaying ? '⏸' : '▶'}</span>
    </button>
  );
}

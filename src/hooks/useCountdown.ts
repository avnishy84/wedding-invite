import { useState, useEffect } from 'react';

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function useCountdown(isoDate: string, tz: string): CountdownValue {
  const computeCountdown = (): CountdownValue => {
    let targetUtcMs: number;

    if (tz === 'Asia/Kolkata') {
      // Parse the ISO string manually (local time in IST)
      const [datePart, timePart] = isoDate.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute, second] = (timePart ?? '00:00:00').split(':').map(Number);

      // Asia/Kolkata is UTC+5:30 = 330 minutes
      const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
      targetUtcMs = Date.UTC(year, month - 1, day, hour, minute, second ?? 0) - IST_OFFSET_MS;
    } else {
      // Fallback for other timezones
      targetUtcMs = new Date(isoDate).getTime();
    }

    const diff = targetUtcMs - Date.now();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [countdown, setCountdown] = useState<CountdownValue>(computeCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(computeCountdown());
    }, 1000);

    return () => clearInterval(interval);
    // computeCountdown is recreated on every render and depends on isoDate and tz
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isoDate, tz]);

  return countdown;
}

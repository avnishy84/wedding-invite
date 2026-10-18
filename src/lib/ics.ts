import type { WeddingEvent } from '../content/types';

export function generateIcs(event: WeddingEvent, lang: 'en' | 'hi'): string {
  // Parse dateIso like '2027-02-12T10:00:00'
  const [datePart, timePart] = event.dateIso.split('T');
  const dtStart = datePart.replace(/-/g, '') + 'T' + (timePart ?? '000000').replace(/:/g, '');
  const uid = `${event.id}@wedding-invite`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WeddingInvite//EN',
    'BEGIN:VEVENT',
    `DTSTART;TZID=Asia/Kolkata:${dtStart}`,
    `SUMMARY:${event.name[lang]}`,
    `LOCATION:${event.venue[lang]}`,
    `DESCRIPTION:${event.dressCode[lang]}`,
    `UID:${uid}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

export function downloadIcs(event: WeddingEvent, lang: 'en' | 'hi', filename: string): void {
  const content = generateIcs(event, lang);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

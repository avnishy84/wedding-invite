import { describe, it, expect } from 'vitest';
import { generateIcs } from '../../lib/ics';
import type { WeddingEvent } from '../../content/types';

describe('ics', () => {
  const mockEvent: WeddingEvent = {
    id: 'test',
    name: { en: 'Wedding', hi: 'विवाह' },
    dateIso: '2027-02-14T19:00:00',
    venue: { en: 'Grand Palace, Mumbai', hi: 'ग्रैंड पैलेस' },
    dressCode: { en: 'Formal', hi: 'औपचारिक' },
  };

  it('generates valid iCalendar structure', () => {
    const result = generateIcs(mockEvent, 'en');

    expect(result).toContain('BEGIN:VCALENDAR');
    expect(result).toContain('END:VCALENDAR');
    expect(result).toContain('BEGIN:VEVENT');
    expect(result).toContain('END:VEVENT');
    expect(result).toContain('VERSION:2.0');
  });

  it('formats DTSTART correctly with timezone', () => {
    const result = generateIcs(mockEvent, 'en');

    expect(result).toContain('DTSTART;TZID=Asia/Kolkata:20270214T190000');
  });

  it('includes event summary in English', () => {
    const result = generateIcs(mockEvent, 'en');

    expect(result).toContain('SUMMARY:Wedding');
  });

  it('includes event summary in Hindi', () => {
    const result = generateIcs(mockEvent, 'hi');

    expect(result).toContain('SUMMARY:विवाह');
  });

  it('includes event location in English', () => {
    const result = generateIcs(mockEvent, 'en');

    expect(result).toContain('LOCATION:Grand Palace, Mumbai');
  });

  it('includes event location in Hindi', () => {
    const result = generateIcs(mockEvent, 'hi');

    expect(result).toContain('LOCATION:ग्रैंड पैलेस');
  });

  it('includes dress code in description', () => {
    const result = generateIcs(mockEvent, 'en');

    expect(result).toContain('DESCRIPTION:Formal');
  });

  it('includes unique UID', () => {
    const result = generateIcs(mockEvent, 'en');

    expect(result).toContain('UID:test@wedding-invite');
  });
});

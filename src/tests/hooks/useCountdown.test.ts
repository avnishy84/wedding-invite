import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useCountdown } from '../../hooks/useCountdown';

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns correct countdown for future date', () => {
    // Target: 2030-01-01T00:00:00 IST = 2029-12-31T18:30:00Z
    // Now: 2029-12-31T18:29:00Z
    // Diff: 60 seconds = 1 minute
    vi.setSystemTime(Date.UTC(2029, 11, 31, 18, 29, 0));

    const { result } = renderHook(() => useCountdown('2030-01-01T00:00:00', 'Asia/Kolkata'));

    expect(result.current.isPast).toBe(false);
    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(1);
    expect(result.current.seconds).toBe(0);
  });

  it('returns isPast true for past date', () => {
    // Now: 2028-01-01T00:00:00Z
    // Target: 2027-02-14T19:00:00 IST = 2027-02-14T13:30:00Z
    vi.setSystemTime(Date.UTC(2028, 0, 1, 0, 0, 0));

    const { result } = renderHook(() => useCountdown('2027-02-14T19:00:00', 'Asia/Kolkata'));

    expect(result.current.isPast).toBe(true);
    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });

  it('returns correct countdown 1 second before event', () => {
    // Target: 2027-02-14T19:00:00 IST = 2027-02-14T13:30:00Z
    // Now: 2027-02-14T13:29:59Z
    // Diff: 1 second
    vi.setSystemTime(Date.UTC(2027, 1, 14, 13, 29, 59));

    const { result } = renderHook(() => useCountdown('2027-02-14T19:00:00', 'Asia/Kolkata'));

    expect(result.current.isPast).toBe(false);
    expect(result.current.seconds).toBe(1);
  });

  it('updates countdown every second', () => {
    // Target: 2027-02-14T19:00:00 IST = 2027-02-14T13:30:00Z
    // Now: 2027-02-14T13:29:58Z
    // Diff: 2 seconds
    vi.setSystemTime(Date.UTC(2027, 1, 14, 13, 29, 58));

    const { result } = renderHook(() => useCountdown('2027-02-14T19:00:00', 'Asia/Kolkata'));

    expect(result.current.seconds).toBe(2);

    // Advance 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.seconds).toBe(1);

    // Advance 1 more second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.seconds).toBe(0);
    expect(result.current.isPast).toBe(true);
  });
});

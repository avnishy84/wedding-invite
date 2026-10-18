import { describe, it, expect } from 'vitest';
import { validateRsvp } from '../../lib/rsvp';

describe('validateRsvp', () => {
  it('rejects empty name', () => {
    const result = validateRsvp({
      name: '',
      guests: 2,
      events: ['ceremony'],
      attending: true,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe('This field is required');
  });

  it('rejects name longer than 80 chars', () => {
    const result = validateRsvp({
      name: 'A'.repeat(81),
      guests: 2,
      events: ['ceremony'],
      attending: true,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe('Name must be 1 to 80 characters');
  });

  it('rejects guests = 0 (below min)', () => {
    const result = validateRsvp({
      name: 'John Doe',
      guests: 0,
      events: ['ceremony'],
      attending: true,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.guests).toBe('Please enter a number between 1 and 10');
  });

  it('rejects guests = 11 (above max)', () => {
    const result = validateRsvp({
      name: 'John Doe',
      guests: 11,
      events: ['ceremony'],
      attending: true,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.guests).toBe('Please enter a number between 1 and 10');
  });

  it('rejects missing guests', () => {
    const result = validateRsvp({
      name: 'John Doe',
      events: ['ceremony'],
      attending: true,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.guests).toBe('This field is required');
  });

  it('rejects empty events array', () => {
    const result = validateRsvp({
      name: 'John Doe',
      guests: 2,
      events: [],
      attending: true,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.events).toBe('Please select at least one event');
  });

  it('rejects message longer than 300 chars', () => {
    const result = validateRsvp({
      name: 'John Doe',
      guests: 2,
      events: ['ceremony'],
      attending: true,
      message: 'A'.repeat(301),
    });

    expect(result.valid).toBe(false);
    expect(result.errors.message).toBe('Message must be 300 characters or fewer');
  });

  it('accepts a fully valid payload', () => {
    const result = validateRsvp({
      name: 'John Doe',
      guests: 2,
      events: ['ceremony', 'reception'],
      attending: true,
      message: 'Looking forward to celebrating with you!',
    });

    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('message is optional — valid payload with no message', () => {
    const result = validateRsvp({
      name: 'John Doe',
      guests: 2,
      events: ['ceremony'],
      attending: true,
    });

    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('rejects missing attending', () => {
    const result = validateRsvp({
      name: 'John Doe',
      guests: 2,
      events: ['ceremony'],
    });

    expect(result.valid).toBe(false);
    expect(result.errors.attending).toBe('This field is required');
  });

  it('accepts attending = false', () => {
    const result = validateRsvp({
      name: 'John Doe',
      guests: 1,
      events: ['ceremony'],
      attending: false,
    });

    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('rejects whitespace-only name', () => {
    const result = validateRsvp({
      name: '   ',
      guests: 2,
      events: ['ceremony'],
      attending: true,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe('This field is required');
  });

  it('accepts name at exactly 80 chars', () => {
    const result = validateRsvp({
      name: 'A'.repeat(80),
      guests: 2,
      events: ['ceremony'],
      attending: true,
    });

    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('accepts guests at boundary values 1 and 10', () => {
    const resultMin = validateRsvp({
      name: 'John Doe',
      guests: 1,
      events: ['ceremony'],
      attending: true,
    });

    const resultMax = validateRsvp({
      name: 'Jane Doe',
      guests: 10,
      events: ['ceremony'],
      attending: true,
    });

    expect(resultMin.valid).toBe(true);
    expect(resultMax.valid).toBe(true);
  });

  it('accepts message at exactly 300 chars', () => {
    const result = validateRsvp({
      name: 'John Doe',
      guests: 2,
      events: ['ceremony'],
      attending: true,
      message: 'A'.repeat(300),
    });

    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('rejects non-integer guests', () => {
    const result = validateRsvp({
      name: 'John Doe',
      guests: 2.5,
      events: ['ceremony'],
      attending: true,
    });

    expect(result.valid).toBe(false);
    expect(result.errors.guests).toBe('Please enter a number between 1 and 10');
  });

  it('accumulates multiple validation errors', () => {
    const result = validateRsvp({
      name: '',
      events: [],
      message: 'A'.repeat(301),
    });

    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.guests).toBeDefined();
    expect(result.errors.events).toBeDefined();
    expect(result.errors.attending).toBeDefined();
    expect(result.errors.message).toBeDefined();
  });
});

export interface RsvpData {
  name: string;
  guests: number;
  events: string[]; // event IDs
  attending: boolean;
  message?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>; // field name -> error message
}

export function validateRsvp(data: Partial<RsvpData>): ValidationResult {
  const errors: Record<string, string> = {};

  // name: required, 1-80 chars
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'This field is required';
  } else if (data.name.trim().length > 80) {
    errors.name = 'Name must be 1 to 80 characters';
  }

  // guests: required, 1-10
  if (data.guests === undefined || data.guests === null) {
    errors.guests = 'This field is required';
  } else if (data.guests < 1 || data.guests > 10 || !Number.isInteger(data.guests)) {
    errors.guests = 'Please enter a number between 1 and 10';
  }

  // events: required, at least one
  if (!data.events || data.events.length === 0) {
    errors.events = 'Please select at least one event';
  }

  // attending: required (boolean)
  if (data.attending === undefined || data.attending === null) {
    errors.attending = 'This field is required';
  }

  // message: optional, max 300 chars
  if (data.message !== undefined && data.message !== null && data.message.length > 300) {
    errors.message = 'Message must be 300 characters or fewer';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export async function submitRsvp(data: RsvpData): Promise<void> {
  if (import.meta.env.VITE_ENABLE_RSVP_FIRESTORE === 'true') {
    const [{ getDb }, { addDoc, collection, serverTimestamp }] = await Promise.all([
      import('./firebase'),
      import('firebase/firestore'),
    ]);
    await addDoc(collection(getDb(), 'rsvps'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return;
  }
  throw new Error('RSVP_DISABLED');
}

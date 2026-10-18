export interface BilingualString { en: string; hi: string }

export interface WeddingEvent {
  id: string
  name: BilingualString
  dateIso: string          // e.g. "2027-02-14T19:00:00"
  venue: BilingualString
  dressCode: BilingualString
}

export interface WeddingData {
  meta: { invocation: BilingualString; ogTitle: string; ogDescription: string }
  couple: {
    brideName: BilingualString
    groomName: BilingualString
    brideParents: BilingualString
    groomParents: BilingualString
    coupleNote: BilingualString
  }
  weddingDateIso: string
  timezone: string
  events: WeddingEvent[]
  venue: {
    name: BilingualString
    address: BilingualString
    mapsUrl: string
    travelNotes: BilingualString
  }
  rsvp: {
    deadline: string
    whatsappNumber: string
  }
  contact: { phone1: string; phone2: string }
  strings: { en: Record<string, string>; hi: Record<string, string> }
}

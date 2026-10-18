import type { WeddingData } from './types';

export const weddingData: WeddingData = {
  meta: {
    invocation: { en: '|| Shree Ganeshay Namah ||', hi: '॥ श्री गणेशाय नमः ॥' },
    ogTitle: 'Ankita & Avnish Wedding',
    ogDescription: 'Join us to celebrate the wedding of Ankita and Avnish',
  },
  couple: {
    brideName: { en: 'Ankita', hi: 'अंकिता' },
    groomName: { en: 'Avnish', hi: 'अवनीश' },
    brideParents: { en: 'Shri & Smt. XYZ Sharma', hi: 'श्री व श्रीमती XYZ शर्मा' }, // PLACEHOLDER
    groomParents: { en: 'Shri & Smt. ABC Gupta', hi: 'श्री व श्रीमती ABC गुप्ता' }, // PLACEHOLDER
    coupleNote: {
      en: 'With the blessings of the Almighty and our elders, we joyfully invite you to celebrate our wedding.',
      hi: 'ईश्वर और बुजुर्गों के आशीर्वाद से हम आपको अपने विवाह समारोह में सादर आमंत्रित करते हैं।', // TODO: native review
    },
  },
  weddingDateIso: '2027-02-14T19:00:00', // PLACEHOLDER
  timezone: 'Asia/Kolkata',
  events: [
    {
      id: 'haldi',
      name: { en: 'Haldi', hi: 'हल्दी' }, // TODO: native review
      dateIso: '2027-02-12T10:00:00', // PLACEHOLDER
      venue: { en: 'Bride Home, 45 Rose Lane, Mumbai', hi: 'दुल्हन का घर, 45 रोज़ लेन, मुम्बई' }, // TODO: native review
      dressCode: { en: 'Yellow & White', hi: 'पीला और सफ़ेद' }, // TODO: native review
    },
    {
      id: 'mehndi',
      name: { en: 'Mehndi', hi: 'मेहंदी' }, // TODO: native review
      dateIso: '2027-02-12T18:00:00', // PLACEHOLDER
      venue: { en: 'Bride Home, 45 Rose Lane, Mumbai', hi: 'दुल्हन का घर, 45 रोज़ लेन, मुम्बई' }, // TODO: native review
      dressCode: { en: 'Pastel colours', hi: 'पेस्टल रंग' }, // TODO: native review
    },
    {
      id: 'sangeet',
      name: { en: 'Sangeet', hi: 'संगीत' }, // TODO: native review
      dateIso: '2027-02-13T19:00:00', // PLACEHOLDER
      venue: { en: 'Grand Palace, 123 Example St, Mumbai', hi: 'ग्रैंड पैलेस, 123 उदाहरण मार्ग, मुम्बई' }, // TODO: native review
      dressCode: { en: 'Festive Ethnic', hi: 'उत्सवी पारंपरिक' }, // TODO: native review
    },
    {
      id: 'wedding',
      name: { en: 'Wedding (Phere)', hi: 'विवाह (फेरे)' }, // TODO: native review
      dateIso: '2027-02-14T19:00:00', // PLACEHOLDER
      venue: { en: 'Grand Palace, 123 Example St, Mumbai', hi: 'ग्रैंड पैलेस, 123 उदाहरण मार्ग, मुम्बई' }, // TODO: native review
      dressCode: { en: 'Traditional Indian Formal', hi: 'पारंपरिक भारतीय औपचारिक' }, // TODO: native review
    },
    {
      id: 'reception',
      name: { en: 'Reception', hi: 'रिसेप्शन' }, // TODO: native review
      dateIso: '2027-02-15T19:00:00', // PLACEHOLDER
      venue: { en: 'Grand Palace, 123 Example St, Mumbai', hi: 'ग्रैंड पैलेस, 123 उदाहरण मार्ग, मुम्बई' }, // TODO: native review
      dressCode: { en: 'Cocktail / Ethnic', hi: 'कॉकटेल / पारंपरिक' }, // TODO: native review
    },
  ],
  venue: {
    name: { en: 'Grand Palace', hi: 'ग्रैंड पैलेस' }, // TODO: native review
    address: { en: '123 Example St, Mumbai, Maharashtra 400001', hi: '123 उदाहरण मार्ग, मुम्बई, महाराष्ट्र 400001' }, // TODO: native review
    mapsUrl: 'https://maps.google.com/?q=Grand+Palace+Mumbai', // PLACEHOLDER
    travelNotes: {
      en: 'Nearest metro: Example Metro Station (5 min walk). Parking available on-site.',
      hi: 'निकटतम मेट्रो: उदाहरण मेट्रो स्टेशन (5 मिनट पैदल)। साइट पर पार्किंग उपलब्ध है।', // TODO: native review
    },
  },
  rsvp: {
    deadline: '2027-02-01', // PLACEHOLDER
    whatsappNumber: '+910000000000', // PLACEHOLDER
  },
  contact: {
    phone1: '+910000000001', // PLACEHOLDER
    phone2: '+910000000002', // PLACEHOLDER
  },
  strings: {
    en: {
      // Hero
      scrollCue: 'Scroll to explore',
      weds: 'weds',
      // Countdown
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      celebrationMessage: 'The celebration has begun!',
      // Language toggle
      langToggleLabel: 'Switch to Hindi',
      // Music toggle
      musicToggleLabel: 'Toggle background music',
      // Events
      addToCalendar: 'Add to Calendar',
      dressCodeLabel: 'Dress Code',
      // Venue
      openMaps: 'Open in Maps',
      travelLabel: 'Getting There',
      // RSVP
      rsvpSectionTitle: 'RSVP',
      rsvpDeadline: 'Kindly respond by',
      rsvpName: 'Your Name',
      rsvpNameLabel: 'Your Name',
      rsvpGuests: 'Number of Guests',
      rsvpGuestsLabel: 'Number of Guests',
      rsvpEventsAttending: 'Events Attending',
      rsvpEventsLabel: 'Events You Will Attend',
      rsvpMessage: 'Message (optional)',
      rsvpMessageLabel: 'Message (optional)',
      rsvpAttending: 'Will you be attending?',
      rsvpAttendingLabel: 'Will you be attending?',
      rsvpYes: 'Joyfully Accept',
      rsvpNo: 'Regretfully Decline',
      rsvpSubmit: 'Send RSVP',
      rsvpSubmitButton: 'Send RSVP',
      rsvpSubmitting: 'Submitting...',
      rsvpWhatsappFallback: 'RSVP via WhatsApp',
      rsvpSuccessMessage: 'Thank you! We look forward to celebrating with you.',
      rsvpErrorMessage: 'Something went wrong. Please try again or WhatsApp us.',
      rsvpErrorRequired: 'This field is required',
      rsvpErrorRange: 'Please enter a number between 1 and 10',
      rsvpErrorNameLength: 'Name must be 1 to 80 characters',
      rsvpErrorEventRequired: 'Please select at least one event',
      rsvpErrorMessageLength: 'Message must be 300 characters or fewer',
      // Gallery
      closeLabel: 'Close',
      prevLabel: 'Previous',
      nextLabel: 'Next',
      // Footer
      contactUs: 'Contact Us',
      withLove: 'With love, from our family to yours',
    },
    hi: {
      // Hero
      scrollCue: 'नीचे स्क्रॉल करें', // TODO: native review
      weds: 'से विवाह', // TODO: native review
      // Countdown
      days: 'दिन', // TODO: native review
      hours: 'घंटे', // TODO: native review
      minutes: 'मिनट', // TODO: native review
      seconds: 'सेकंड', // TODO: native review
      celebrationMessage: 'उत्सव शुरू हो गया है!', // TODO: native review
      // Language toggle
      langToggleLabel: 'अंग्रेजी में बदलें', // TODO: native review
      // Music toggle
      musicToggleLabel: 'पृष्ठभूमि संगीत चालू/बंद करें', // TODO: native review
      // Events
      addToCalendar: 'कैलेंडर में जोड़ें', // TODO: native review
      dressCodeLabel: 'ड्रेस कोड', // TODO: native review
      // Venue
      openMaps: 'मैप में खोलें', // TODO: native review
      travelLabel: 'कैसे पहुँचें', // TODO: native review
      // RSVP
      rsvpSectionTitle: 'RSVP', // TODO: native review
      rsvpDeadline: 'कृपया इस तारीख तक जवाब दें', // TODO: native review
      rsvpName: 'आपका नाम', // TODO: native review
      rsvpNameLabel: 'आपका नाम', // TODO: native review
      rsvpGuests: 'मेहमानों की संख्या', // TODO: native review
      rsvpGuestsLabel: 'मेहमानों की संख्या', // TODO: native review
      rsvpEventsAttending: 'कार्यक्रम जिनमें आएंगे', // TODO: native review
      rsvpEventsLabel: 'आप किन कार्यक्रमों में आएंगे', // TODO: native review
      rsvpMessage: 'संदेश (वैकल्पिक)', // TODO: native review
      rsvpMessageLabel: 'संदेश (वैकल्पिक)', // TODO: native review
      rsvpAttending: 'क्या आप आएंगे?', // TODO: native review
      rsvpAttendingLabel: 'क्या आप आएंगे?', // TODO: native review
      rsvpYes: 'हर्षपूर्वक स्वीकार है', // TODO: native review
      rsvpNo: 'खेद के साथ असमर्थ', // TODO: native review
      rsvpSubmit: 'RSVP भेजें', // TODO: native review
      rsvpSubmitButton: 'RSVP भेजें', // TODO: native review
      rsvpSubmitting: 'भेजा जा रहा है...', // TODO: native review
      rsvpWhatsappFallback: 'WhatsApp पर RSVP करें', // TODO: native review
      rsvpSuccessMessage: 'धन्यवाद! हम आपके साथ जश्न मनाने की प्रतीक्षा करते हैं।', // TODO: native review
      rsvpErrorMessage: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें या WhatsApp करें।', // TODO: native review
      rsvpErrorRequired: 'यह फ़ील्ड आवश्यक है', // TODO: native review
      rsvpErrorRange: 'कृपया 1 से 10 के बीच संख्या दर्ज करें', // TODO: native review
      rsvpErrorNameLength: 'नाम 1 से 80 अक्षरों का होना चाहिए', // TODO: native review
      rsvpErrorEventRequired: 'कृपया कम से कम एक कार्यक्रम चुनें', // TODO: native review
      rsvpErrorMessageLength: 'संदेश 300 अक्षरों से कम होना चाहिए', // TODO: native review
      // Gallery
      closeLabel: 'बंद करें', // TODO: native review
      prevLabel: 'पिछला', // TODO: native review
      nextLabel: 'अगला', // TODO: native review
      // Footer
      contactUs: 'संपर्क करें', // TODO: native review
      withLove: 'प्रेम सहित, हमारे परिवार की ओर से आपके परिवार को', // TODO: native review
    },
  },
};

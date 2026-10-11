export const CONTACT_EMAIL = 'hello@leylinedigital.co.uk';

const SUBJECT = 'Consultation enquiry — [your business name]';

const BODY = [
  'Hi Leyline,',
  '',
  "We'd like to talk about what you could build for us. A few notes to get started:",
  '',
  'What our business does: ',
  "What's slowing us down: ",
  'Best time to reach us: ',
  '',
  'Thanks,',
  '',
].join('\r\n');

// Pre-filled email link with a few starter lines to make writing easy.
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;


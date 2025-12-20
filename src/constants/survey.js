// Survey configuration constants

export const AUTO_ADVANCE_DELAY = 400; // ms - delay before auto-advancing to next question

export const PRE_QUESTIONS = [
  { id: 'openness', type: 'scale' },
  { id: 'knowledge', type: 'scale' },
  { id: 'environment', type: 'scale' },
  { id: 'insectProtein', type: 'scale' },
  { id: 'tryProduct', type: 'scale' },
  { id: 'barriers', type: 'single' },
];

export const POST_QUESTIONS = [
  { id: 'insectProteinPost', type: 'scale' },
  { id: 'tryProductPost', type: 'scale' },
  { id: 'barriersPost', type: 'single' },
  { id: 'learned', type: 'scale' },
];

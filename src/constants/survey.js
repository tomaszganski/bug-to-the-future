// Survey configuration constants

export const AUTO_ADVANCE_DELAY = 400; // ms - delay before auto-advancing to next question

export const PRE_QUESTIONS = [
  { id: 'willingness', type: 'scale11' }, // 1-10 scale
  { id: 'barriers', type: 'single' },
  { id: 'knowledge', type: 'single' },
  { id: 'euRegulation', type: 'single' },
  { id: 'age', type: 'single' },
  { id: 'gender', type: 'single' },
];

export const POST_QUESTIONS = [
  { id: 'attitudeChange', type: 'single' },
  { id: 'willingnessPost', type: 'scale11' },
  { id: 'barriersPost', type: 'single' },
  { id: 'euRegulationPost', type: 'single' },
];

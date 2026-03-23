// Survey configuration constants

export const AUTO_ADVANCE_DELAY = 400; // ms - delay before auto-advancing to next question

export const PRE_QUESTIONS = [
  { id: "willingness", type: "scale10" }, // 1-10 scale
  { id: "barriers", type: "multiple", otherAllowsInput: true },
  { id: "nutritionValue", type: "single" },
  { id: "euRegulation", type: "single" },
  { id: "age", type: "single" },
  { id: "gender", type: "single" },
];

export const POST_QUESTIONS = [
  { id: "attitudeChange", type: "single" },
  { id: "barriersPost", type: "multiple", otherAllowsInput: true },
  { id: "nutritionValuePost", type: "single" },
  { id: "euRegulationPost", type: "single" },
];

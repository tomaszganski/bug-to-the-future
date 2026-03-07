import { getUserIdentification } from "./userIdentification";

const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

function formatBarriers(barriers) {
  if (!barriers) return "";
  if (typeof barriers === "string") return barriers;
  if (barriers.selected) {
    let result = barriers.selected.join(", ");
    if (barriers.otherText) {
      result += (result ? ", " : "") + barriers.otherText;
    }
    return result;
  }
  return "";
}

export async function submitSurveyToGoogleSheets(preAnswers, postAnswers) {
  if (!GOOGLE_SHEETS_URL) {
    console.error("Google Sheets URL not configured");
    throw new Error("Google Sheets URL not configured");
  }

  const { userId, ipAddress } = await getUserIdentification();

  const payload = {
    userId,
    ipAddress,
    preAnswers: {
      willingness: preAnswers.willingness || "",
      barriers: formatBarriers(preAnswers.barriers),
      nutritionValue: preAnswers.nutritionValue || "",
      euRegulation: preAnswers.euRegulation || "",
      age: preAnswers.age || "",
      gender: preAnswers.gender || "",
    },
    postAnswers: {
      attitudeChange: postAnswers.attitudeChange || "",
      barriersPost: formatBarriers(postAnswers.barriersPost),
      nutritionValuePost: postAnswers.nutritionValuePost || "",
      euRegulationPost: postAnswers.euRegulationPost || "",
    },
  };

  const response = await fetch(GOOGLE_SHEETS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // With no-cors mode, we can't read the response, but the request will be sent
  // Google Apps Script will handle it and return success
  // If the fetch itself fails, it will throw an error
  return { success: true };
}

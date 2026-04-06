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

/**
 * @param {object} [educationVideo] - From education step; append to sheet (e.g. columns after post answers).
 *   Apps Script: JSON.parse → data.client (userAgent, browser, deviceType, device, os), data.education.*
 */
/**
 * @param {"pre" | "complete"} [phase] - "pre" after pre-survey (Tab1); "complete" after full survey (Tab2)
 */
export async function submitSurveyToGoogleSheets(
  preAnswers,
  postAnswers,
  educationVideo,
  phase = "complete",
) {
  if (!GOOGLE_SHEETS_URL) {
    console.error("Google Sheets URL not configured");
    throw new Error("Google Sheets URL not configured");
  }

  const { userId, ipAddress, client } = await getUserIdentification();

  const payload = {
    phase,
    userId,
    ipAddress,
    client,
    education: {
      totalWatchSeconds:
        educationVideo && typeof educationVideo.totalWatchSeconds === "number"
          ? educationVideo.totalWatchSeconds
          : "",
      maxPlaybackSeconds:
        educationVideo && typeof educationVideo.maxPlaybackSeconds === "number"
          ? educationVideo.maxPlaybackSeconds
          : "",
    },
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

  await fetch(GOOGLE_SHEETS_URL, {
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

/** Tab names in the spreadsheet (create sheets with these exact names). */
var SHEET_PRE = "Pre";
var SHEET_FULL = "Complete";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const phase = data.phase === "pre" ? "pre" : "complete";
    const sheetName = phase === "pre" ? SHEET_PRE : SHEET_FULL;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error('Sheet not found: "' + sheetName + '"');
    }

    const formatBarriers = (barriers) => {
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
    };

    const c = data.client || {};
    const edu = data.education || {};

    const now = new Date().toISOString();

    // Same columns for every request; pre-only payloads leave post/education empty.
    const row = [
      now,
      data.userId || "",
      data.ipAddress || "",
      data.preAnswers?.willingness || "",
      formatBarriers(data.preAnswers?.barriers),
      data.preAnswers?.nutritionValue || "",
      data.preAnswers?.euRegulation || "",
      data.preAnswers?.age || "",
      data.preAnswers?.gender || "",
      data.postAnswers?.attitudeChange || "",
      formatBarriers(data.postAnswers?.barriersPost),
      data.postAnswers?.nutritionValuePost || "",
      data.postAnswers?.euRegulationPost || "",
      edu.totalWatchSeconds || "",
      edu.maxPlaybackSeconds || "",
      c.userAgent || "",
      c.deviceType || "",
      c.device || "",
      c.os || "",
    ];
    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Survey endpoint is running" }),
  ).setMimeType(ContentService.MimeType.JSON);
}

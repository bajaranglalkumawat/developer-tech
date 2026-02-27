/**
 * Deploy this in Google Apps Script as a Web App.
 * 1) Open your Google Sheet.
 * 2) Extensions -> Apps Script.
 * 3) Paste this code and save.
 * 4) Deploy -> New deployment -> Web app.
 * 5) Execute as: Me, Access: Anyone with the link.
 * 6) Copy the web app URL and set GOOGLE_SHEETS_WEBHOOK_URL in server env.
 *
 * Required:
 * - Replace SHEET_ID with your target Google Sheet id.
 *   Example sheet URL:
 *   https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
 */

const SHEET_ID = "ojdL7hRx92HUGB35ktCtvaEDcWC46ndGJOWrRq6";
const SHEET_NAME = "developertech1";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, message: "Missing request body" });
    }

    const payload = JSON.parse(e.postData.contents);
    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName(developertech1) || ss.insertSheet(developertech1);

    // Initialize header row once.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "createdAt",
        "name",
        "email",
        "phone",
        "subject",
        "message",
      ]);
    }

    sheet.appendRow([
      payload.createdAt || new Date().toISOString(),
      payload.name || "",
      payload.email || "",
      payload.phone || "",
      payload.subject || "",
      payload.message || "",
    ]);

    return jsonResponse({ success: true, message: "Saved to Google Sheet" });
  } catch (err) {
    return jsonResponse(
      { success: false, message: "Script error", error: String(err) },
    );
  }
}

function doGet() {
  try {
    const ss = getSpreadsheet();
    return jsonResponse({
      success: true,
      message: "Webhook is live",
      spreadsheetName: ss.getName(),
      sheetName: developertech1,
    });
  } catch (err) {
    return jsonResponse({
      success: false,
      message: "Webhook setup error",
      error: String(err),
    });
  }
}

function getSpreadsheet() {
  if (!SHEET_ID || SHEET_ID === "PASTE_YOUR_SHEET_ID_HERE") {
    throw new Error("Set SHEET_ID before deploying the web app.");
  }

  return SpreadsheetApp.openById(SHEET_ID);
}

function jsonResponse(data) {
  const out = ContentService.createTextOutput(JSON.stringify(data));
  out.setMimeType(ContentService.MimeType.JSON);
  // Apps Script Web App doesn't reliably honor custom status codes for ContentService,
  // but keeping it in payload helps debugging from client/server logs.
  return out;
}

/**
 * Google Apps Script webhook for both:
 * - Query form rows
 * - Review/Testimonial rows
 *
 * Deploy:
 * 1) Open sheet -> Extensions -> Apps Script
 * 2) Paste this file
 * 3) Update SHEET_ID
 * 4) Deploy as Web App (Execute as: Me, Access: Anyone with link)
 * 5) Put URL into env:
 *    - GOOGLE_SHEETS_WEBHOOK_URL (for query)
 *    - REVIEW_GOOGLE_SHEETS_WEBHOOK_URL (for reviews, optional)
 */

const SHEET_ID = "AKfycbx8FO2c7J5cYWS4ViXPboJKMo3fX0jOQk_Gor4p_ZfBGTES_AJVKVfCxeVofYlxQFpN";
const QUERY_SHEET_NAME = "queries";
const REVIEW_SHEET_NAME = "developer reviews";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, message: "Missing request body" });
    }

    const payload = JSON.parse(e.postData.contents);
    const type = String(payload.type || "query").toLowerCase();

    if (type === "review") {
      saveReview(payload);
      return jsonResponse({ success: true, message: "Review saved to sheet." });
    }

    saveQuery(payload);
    return jsonResponse({ success: true, message: "Query saved to sheet." });
  } catch (err) {
    return jsonResponse({
      success: false,
      message: "Script error",
      error: String(err),
    });
  }
}

function doGet(e) {
  try {
    const ss = getSpreadsheet();
    const params = e && e.parameter ? e.parameter : {};
    const type = String(params.type || "").toLowerCase();
    const approvedOnly = String(params.approved || "").toLowerCase() === "true";

    if (type === "review") {
      const reviews = readReviews(ss, approvedOnly);
      return jsonResponse({
        success: true,
        type: "review",
        approvedOnly: approvedOnly,
        reviews: reviews,
      });
    }

    return jsonResponse({
      success: true,
      message: "Webhook is live",
      spreadsheetName: ss.getName(),
      sheets: [QUERY_SHEET_NAME, REVIEW_SHEET_NAME],
    });
  } catch (err) {
    return jsonResponse({
      success: false,
      message: "Webhook setup error",
      error: String(err),
    });
  }
}

function saveQuery(payload) {
  const ss = getSpreadsheet();
  const sheet = getOrCreateSheet(ss, QUERY_SHEET_NAME);
  ensureHeader(sheet, [
    "createdAt",
    "name",
    "email",
    "phone",
    "subject",
    "message",
  ]);

  sheet.appendRow([
    payload.createdAt || new Date().toISOString(),
    payload.name || "",
    payload.email || "",
    payload.phone || "",
    payload.subject || "",
    payload.message || "",
  ]);
}

function saveReview(payload) {
  const ss = getSpreadsheet();
  const sheet = getOrCreateSheet(ss, REVIEW_SHEET_NAME);
  ensureHeader(sheet, [
    "createdAt",
    "clientName",
    "companyName",
    "rating",
    "reviewMessage",
    "clientImage",
    "isApproved",
  ]);

  sheet.appendRow([
    payload.createdAt || new Date().toISOString(),
    payload.clientName || "",
    payload.companyName || "",
    Number(payload.rating || 0),
    payload.reviewMessage || "",
    payload.clientImage || "",
    payload.isApproved === true ? "TRUE" : "FALSE",
  ]);
}

function readReviews(ss, approvedOnly) {
  const sheet = getOrCreateSheet(ss, REVIEW_SHEET_NAME);
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return [];
  }

  const lastCol = sheet.getLastColumn();
  const rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  const reviews = rows.map(function(row, index) {
    const createdAtCell = row[0];
    return {
      _id: "sheet-row-" + (index + 2),
      createdAt: createdAtCell instanceof Date ? createdAtCell.toISOString() : String(createdAtCell || ""),
      clientName: String(row[1] || ""),
      companyName: String(row[2] || ""),
      rating: Number(row[3] || 0),
      reviewMessage: String(row[4] || ""),
      clientImage: String(row[5] || ""),
      isApproved: String(row[6] || "").toLowerCase() === "true",
    };
  });

  if (!approvedOnly) {
    return reviews;
  }

  return reviews.filter(function(item) {
    return item.isApproved === true;
  });
}

function getOrCreateSheet(ss, sheetName) {
  return ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
}

function ensureHeader(sheet, expectedHeader) {
  if (sheet.getLastRow() !== 0) {
    return;
  }
  sheet.appendRow(expectedHeader);
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
  return out;
}

import { RequestHandler } from "express";
import { z } from "zod";
import { QuerySubmitRequest, QuerySubmitResponse } from "@shared/api";

const querySchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(3, "Subject is required"),
  message: z.string().trim().min(10, "Message is required"),
});

type ServiceResult = {
  ok: boolean;
  source: "email" | "google-sheet";
  error?: string;
};

async function sendAutoReply(payload: QuerySubmitRequest): Promise<ServiceResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? "Support Team";

  if (!apiKey || !senderEmail) {
    return {
      ok: false,
      source: "email",
      error:
        "BREVO_API_KEY and BREVO_SENDER_EMAIL must be configured on the server.",
    };
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        email: senderEmail,
        name: senderName,
      },
      to: [{ email: payload.email, name: payload.name }],
      replyTo: { email: senderEmail, name: senderName },
      subject: `We received your query: ${payload.subject}`,
      textContent: `Hi ${payload.name},\n\nThanks for contacting us. We received your query and will get back to you shortly.\n\nSubject: ${payload.subject}\nMessage: ${payload.message}\n\nRegards,\n${senderName}`,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    return {
      ok: false,
      source: "email",
      error: `Brevo API failed (${response.status}): ${errorBody}`,
    };
  }

  return { ok: true, source: "email" };
}

async function appendToGoogleSheet(
  payload: QuerySubmitRequest,
): Promise<ServiceResult> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      ok: false,
      source: "google-sheet",
      error: "GOOGLE_SHEETS_WEBHOOK_URL must be configured on the server.",
    };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      createdAt: new Date().toISOString(),
      ...payload,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    return {
      ok: false,
      source: "google-sheet",
      error: `Google Sheets webhook failed (${response.status}): ${errorBody}`,
    };
  }

  const responseText = await response.text();
  if (responseText) {
    try {
      const parsed = JSON.parse(responseText) as { success?: boolean; message?: string };
      if (parsed.success === false) {
        return {
          ok: false,
          source: "google-sheet",
          error: `Google Sheets script rejected request: ${parsed.message ?? "unknown error"}`,
        };
      }
    } catch {
      // Some Apps Script deployments can return plain text; treat as success if HTTP status is ok.
    }
  }

  return { ok: true, source: "google-sheet" };
}

export const handleQuerySubmit: RequestHandler = async (req, res) => {
  const parsedBody = querySchema.safeParse(req.body);

  if (!parsedBody.success) {
    const validationMessage = parsedBody.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");

    const response: QuerySubmitResponse = {
      success: false,
      message:
        validationMessage || "Please fill all required fields with valid values.",
    };
    res.status(400).json(response);
    return;
  }

  try {
    const payload = parsedBody.data as QuerySubmitRequest;
    const results = await Promise.all([
      sendAutoReply(payload),
      appendToGoogleSheet(payload),
    ]);

    const failed = results.filter((result) => !result.ok);
    if (failed.length > 0) {
      const failureMessage = failed
        .map((result) => `${result.source}: ${result.error ?? "unknown error"}`)
        .join(" | ");

      const response: QuerySubmitResponse = {
        success: false,
        message: `Query submit failed. ${failureMessage}`,
      };
      res.status(502).json(response);
      return;
    }

    const response: QuerySubmitResponse = {
      success: true,
      message: "Query submitted successfully. Confirmation email sent.",
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Query submit error:", error);
    const response: QuerySubmitResponse = {
      success: false,
      message: "Unexpected server error while submitting query.",
    };
    res.status(500).json(response);
  }
};

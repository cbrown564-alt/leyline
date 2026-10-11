// Recipient list for inquiry notifications — edit here to change who gets notified.
export const INQUIRY_RECIPIENTS = [
  "hello@leylinedigital.co.uk",
  "killiand101@gmail.com",
];

// Sent from the verified leylinedigital.co.uk domain so both notification
// inboxes can receive. The mailbox itself doesn't need to exist for sending;
// being on the verified domain is what unlocks delivery to any recipient.
const FROM = "Leyline Website <website@leylinedigital.co.uk>";

// NOTE: the Replit Resend connection kept serving an old API key that was not
// authorized for this domain, so we use the dedicated RESEND_API_KEY secret
// (scoped to leylinedigital.co.uk) and call the Resend API directly.
// Credentials live only in Replit Secrets, never in code.
const apiKey = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY secret is not set");
  return key;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendInquiryNotification(inquiry: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const html = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #1a1918;">
      <h2 style="margin: 0 0 12px;">New inquiry from ${escapeHtml(inquiry.name)}</h2>
      <p style="margin: 0 0 4px;"><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
      <p style="margin: 0 0 16px;"><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
      <p style="margin: 0 0 4px;"><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; margin: 0; padding: 12px; background: #F5F3EC; border-left: 3px solid #8B1A2C;">${escapeHtml(inquiry.message)}</p>
      <p style="margin: 16px 0 0; color: #7a7367; font-size: 13px;">Reply to this email to answer ${escapeHtml(inquiry.name)} directly.</p>
    </div>`;

  // Send to each recipient individually so that if Resend ever refuses one
  // address (e.g. a stale/bounced inbox), the others still receive the
  // notification.
  const results = await Promise.allSettled(
    INQUIRY_RECIPIENTS.map(async (to) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey()}`,
        },
        body: JSON.stringify({
          from: FROM,
          to: [to],
          reply_to: inquiry.email,
          subject: `New inquiry from ${inquiry.name} — Leyline website`,
          html,
          text: `New inquiry from ${inquiry.name}\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\n\nMessage:\n${inquiry.message}`,
        }),
      });
      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(`Resend responded ${response.status} for ${to}: ${body}`);
      }
    }),
  );

  const failures = results.filter(
    (r): r is PromiseRejectedResult => r.status === "rejected",
  );
  if (failures.length === results.length) {
    throw new Error(
      `All notification emails failed: ${failures.map((f) => String(f.reason)).join("; ")}`,
    );
  }
  if (failures.length > 0) {
    // Partial delivery — surface which recipient(s) failed without failing the request.
    console.error(
      "inquiry notification partially delivered:",
      failures.map((f) => String(f.reason)).join("; "),
    );
  }
}


import { Router, type IRouter } from "express";
import { db, inquiriesTable, insertInquirySchema } from "@workspace/db";
import { sendInquiryNotification } from "../lib/notifyEmail";

const router: IRouter = Router();

router.post("/inquiries", async (req, res) => {
  const parsed = insertInquirySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Please provide your name, a valid email address, and a message.",
    });
    return;
  }
  try {
    const [row] = await db
      .insert(inquiriesTable)
      .values(parsed.data)
      .returning({ id: inquiriesTable.id });
    res.status(201).json({ id: row.id });
    // Notify by email after the inquiry is safely stored. A send failure is
    // logged but never affects the visitor's success response.
    try {
      await sendInquiryNotification(parsed.data);
    } catch (err) {
      req.log.error({ err }, "failed to send inquiry notification email");
    }
  } catch (err) {
    req.log.error({ err }, "failed to store inquiry");
    res.status(500).json({
      error:
        "Something went wrong sending your message. Please email hello@leylinedigital.co.uk instead.",
    });
  }
});

export default router;


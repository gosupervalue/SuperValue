import sendMail from "../utils/sendMailRoute.js";

export const contactPostController = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, sector, message } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: "Required fields missing", success: false });
    }

    try {
      await sendMail({
        from: process.env.ZOHO_INFO_EMAIL, // Authenticated sender (Info)
        to: process.env.ZOHO_SALES_EMAIL,  // Lead destination (Sales)
        replyTo: email,
        subject: `New SuperValue Query | ${firstName} ${lastName}`,
        html: `
        <!doctype html>
        <html>
          <body style="margin:0;padding:0;background:#f8fafc;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f8fafc;">
              <tr>
                <td>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#0B1E3A;">
                    <tr>
                      <td align="center" style="padding:32px 16px;">
                        <div style="font-family:Segoe UI,Arial,sans-serif;font-size:28px;color:#ffffff;font-weight:700;">SuperValue</div>
                        <div style="font-family:Segoe UI,Arial,sans-serif;font-size:16px;color:#f3790a;margin-top:8px;">New Inquiry Received</div>
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f8fafc;">
                    <tr>
                      <td style="padding:32px 16px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                          <tr>
                            <td style="padding:32px;">
                              <div style="font-family:Segoe UI,Arial,sans-serif;font-size:20px;color:#0B1E3A;font-weight:700;margin:0 0 24px 0;border-bottom:2px solid #f3790a;padding-bottom:12px;">Customer Information</div>
                              <div style="margin-bottom:20px;">
                                <div style="font-family:Segoe UI,Arial,sans-serif;font-size:14px;color:#0B1E3A;font-weight:600;margin-bottom:6px;">Customer Name</div>
                                <div style="font-family:Segoe UI,Arial,sans-serif;font-size:16px;color:#1f2937;font-weight:600;padding:12px;background:#f3f4f6;border-radius:6px;border-left:4px solid #f3790a;">${firstName} ${lastName}</div>
                              </div>
                              <div style="margin-bottom:20px;">
                                <div style="font-family:Segoe UI,Arial,sans-serif;font-size:14px;color:#0B1E3A;font-weight:600;margin-bottom:6px;">Email Address</div>
                                <div style="font-family:Segoe UI,Arial,sans-serif;font-size:16px;color:#1f2937;font-weight:600;padding:12px;background:#f3f4f6;border-radius:6px;border-left:4px solid #f3790a;">${email}</div>
                              </div>
                              <div style="margin-bottom:20px;">
                                <div style="font-family:Segoe UI,Arial,sans-serif;font-size:14px;color:#0B1E3A;font-weight:600;margin-bottom:6px;">Phone Number</div>
                                <div style="font-family:Segoe UI,Arial,sans-serif;font-size:16px;color:#1f2937;font-weight:600;padding:12px;background:#f3f4f6;border-radius:6px;border-left:4px solid #f3790a;">${phone}</div>
                              </div>
                              <div style="margin-bottom:20px;">
                                <div style="font-family:Segoe UI,Arial,sans-serif;font-size:14px;color:#0B1E3A;font-weight:600;margin-bottom:6px;">Sector of Interest</div>
                                <div style="font-family:Segoe UI,Arial,sans-serif;font-size:16px;color:#1f2937;font-weight:600;padding:12px;background:#f3f4f6;border-radius:6px;border-left:4px solid #f3790a;">${sector}</div>
                              </div>
                              <div>
                                <div style="font-family:Segoe UI,Arial,sans-serif;font-size:14px;color:#0B1E3A;font-weight:600;margin-bottom:8px;">Message</div>
                                <div style="background:#fff7ed;border:2px solid #fdba74;border-radius:8px;padding:16px;font-family:Segoe UI,Arial,sans-serif;font-size:15px;color:#1f2937;line-height:1.6;">
                                  ${message || "No specific requirements mentioned."}
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `,
      });
      res.status(201).json({ message: "Inquiry received and notification sent successfully", success: true });
    } catch (emailError) {
      res.status(500).json({ message: "Failed to send email. Please try again.", success: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to process inquiry.", success: false });
  }
};
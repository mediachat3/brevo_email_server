import SibApiV3Sdk from "sib-api-v3-sdk"; // ✅ THIS MUST BE AT THE TOP

export async function sendVerificationEmail(req, res) {
  console.log("📨 Incoming request to /api/send-verification-email");
  console.log("🧾 Request body:", req.body);

  if (req.method === 'POST') {
    const { email, verificationLink } = req.body;

    console.log("🔑 Brevo API Key:", process.env.BREVO_API_KEY);

    // ✅ The import above makes this available here
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKeyAuth = defaultClient.authentications['api-key'];
    apiKeyAuth.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
      to: [{ email }],
      templateId: 2,
      params: { verification_link: verificationLink },
    };

    try {
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log("✅ Email sent via Brevo");
      res.status(200).send("Verification email sent successfully");
    } catch (error) {
      console.error("❌ Error sending email:", error);
      res.status(500).send("Failed to send email");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}


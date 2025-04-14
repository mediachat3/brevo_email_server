import SibApiV3Sdk from "sib-api-v3-sdk";

export async function sendVerificationEmail(req, res) {
  if (req.method === 'POST') {
    const { email, verificationLink } = req.body;

    // 🔍 Log the input values
    console.log("📨 Incoming request to send email to:", email);
    console.log("🔗 Verification Link:", verificationLink);

    // ✅ Read the API key from environment variables
    const apiKey = process.env.BREVO_API_KEY;
    console.log("🔑 Brevo API Key:", apiKey ? "✅ Loaded" : "❌ MISSING");

    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKeyAuth = defaultClient.authentications['api-key'];
    apiKeyAuth.apiKey = apiKey;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
      to: [{ email }],
      templateId: 2,
      params: { verification_link: verificationLink },
    };

    // 🔍 Log the payload being sent
    console.log("📦 Payload to Brevo:", sendSmtpEmail);

    try {
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log("✅ Email sent successfully via Brevo");
      res.status(200).send("Verification email sent successfully");
    } catch (error) {
      console.error("❌ Error sending email:", error.response?.body || error);
      res.status(500).send("Failed to send email");
    }
  } else {
    console.warn("⚠️ Received non-POST request");
    res.status(405).send("Method Not Allowed");
  }
}


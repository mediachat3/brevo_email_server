import SibApiV3Sdk from "sib-api-v3-sdk";

export async function sendVerificationEmail(req, res) {
  if (req.method === 'POST') {
    const { email, verificationLink } = req.body;

    // ✅ Read the API key from environment variables
    const apiKey = process.env.BREVO_API_KEY;
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKeyAuth = defaultClient.authentications['api-key'];
    apiKeyAuth.apiKey = apiKey;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
      to: [{ email }],
      templateId: 2, // Replace with your actual Brevo template ID
      params: { verification_link: verificationLink },
    };

    try {
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      res.status(200).send("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}

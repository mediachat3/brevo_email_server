import SibApiV3Sdk from "sib-api-v3-sdk";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, verificationLink } = req.body;

    // Initialize the Brevo API client with your API key
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
      to: [{ email }],
      templateId: 2, // Replace with your Brevo template ID
      params: { verification_link: verificationLink },  // Set the verification link as a parameter
    };

    try {
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      res.status(200).send("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email");
    }
  } else {
    res.status(405).send('Method Not Allowed'); // Handle other HTTP methods
  }
}

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sendVerificationEmail } from "./api/send-verification-email.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-verification-email", sendVerificationEmail);

// ✅ Add this ping route for uptime monitoring
app.get("/ping", (req, res) => {
  res.send("🟢 Server is up and running!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

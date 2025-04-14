import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import sendVerificationEmail from "./api/send-verification-email.js";
import { verifyEmail } from "./api/verify-email.js"; // Ensure this is the correct handler
import jwt from 'jsonwebtoken';
import { db } from './firebase.js'; // Make sure firebase.js is set up correctly

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route to send verification email
app.post("/api/send-verification-email", sendVerificationEmail);

// Route to handle email verification when user clicks the link
app.get("/verify", verifyEmail); // 👈 This is handled by `verifyEmail` function

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

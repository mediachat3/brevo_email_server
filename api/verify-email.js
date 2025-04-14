import jwt from 'jsonwebtoken';
import { db } from '../firebase.js'; // Make sure to import Firestore

export const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(400).send('Verification token missing.');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Find user in Firestore and mark as verified
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(404).send('User not found.');
    }

    const userDoc = snapshot.docs[0];
    await userDoc.ref.update({ emailVerified: true });

    return res.send('<h2>Email verified successfully! You can now log in to ValMate 🎉</h2>');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Invalid or expired token.');
  }
};

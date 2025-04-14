import admin from 'firebase-admin'; // Correct way to import Firebase Admin SDK

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();

export { db };


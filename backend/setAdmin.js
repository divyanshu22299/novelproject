// setAdmin.js

const admin = require("firebase-admin");
const readline = require("readline");

// Import your service account
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Create readline interface to get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask for the user's UID
rl.question("Enter the UID of the user to make admin: ", async (uid) => {
  try {
    // Set custom claims for the user
    await admin.auth().setCustomUserClaims(uid, { isAdmin: true });
    console.log(`✅ User with UID ${uid} is now an admin.`);
  } catch (error) {
    console.error("❌ Error setting admin claim:", error);
  } finally {
    rl.close();
  }
});
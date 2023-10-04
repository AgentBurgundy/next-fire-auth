import { initializeApp, getApps, FirebaseApp } from "firebase/app";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let firebase_app: FirebaseApp;

// Check if firebase app is already initialized to avoid creating new app on hot-reloads
if (!getApps().length) {
  firebase_app = initializeApp(clientCredentials);
} else {
  firebase_app = getApps()[0];
}

export default firebase_app;

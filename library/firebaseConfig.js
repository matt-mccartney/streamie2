import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDTqkPbb1rn0tIrHeCDcd26CyhiLQ9OrkY",
    authDomain: "streamie-c145e.firebaseapp.com",
    projectId: "streamie-c145e",
    storageBucket: "streamie-c145e.appspot.com",
    messagingSenderId: "397166263859",
    appId: "1:397166263859:web:da6fd833aa76d77bcd2d46",
    measurementId: "G-MDT8W55E9E"
  };
  
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
// export const analytics = getAnalytics(app);
export const database = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(app).addScope('email');
export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "travel-app-1set24.firebaseapp.com",
  projectId: "travel-app-1set24",
  storageBucket: "travel-app-1set24.appspot.com",
  messagingSenderId: "687633030692",
  appId: "1:687633030692:web:62d36019c065949f4bc2b1",
  measurementId: "G-2XXYVGKY83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, collection, getDocs, storage, analytics };

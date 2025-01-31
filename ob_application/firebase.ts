// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "IzaSyBgZYbxQAL7vlonCoHgmONJti7W5mCLm88",
  authDomain: "faite-1234d.firebaseapp.com",
  projectId: "faite-1234d",
  storageBucket: "faite-1234d.appspot.com",
  messagingSenderId: "603146930628",
  appId: "1:603146930628:web:f0994f4d231366ed607c91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
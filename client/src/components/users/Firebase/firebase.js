// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDZR6GeFjgw1MMZfeaDiUPBSpbmrp7VTZk",
  authDomain: "prodelevatepf-f3ba4.firebaseapp.com",
  projectId: "prodelevatepf-f3ba4",
  storageBucket: "prodelevatepf-f3ba4.appspot.com",
  messagingSenderId: "376698330755",
  appId: "1:376698330755:web:3419ef25cf790f3610c5b6",
  measurementId: "G-985F6Q4J9Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

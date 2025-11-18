// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCj8GFjSduZCXmqZIIeu_J1ZbYn1X1OXo",
  authDomain: "zip-shift-e182c.firebaseapp.com",
  projectId: "zip-shift-e182c",
  storageBucket: "zip-shift-e182c.firebasestorage.app",
  messagingSenderId: "662820872686",
  appId: "1:662820872686:web:35785d7d1f0bbd21066eff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

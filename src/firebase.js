// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtdNgio1DuyBXeWRWI5bFz03uT2TOlwlA",
  authDomain: "quiz-app-124dc.firebaseapp.com",
  projectId: "quiz-app-124dc",
  storageBucket: "quiz-app-124dc.firebasestorage.app",
  messagingSenderId: "772758665823",
  appId: "1:772758665823:web:73ecb159e81e5259c339ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const database = getDatabase(app);
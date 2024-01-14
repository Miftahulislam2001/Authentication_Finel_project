// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk29njyr2mBrzkl38rUQOPOy6uasHE3p4",
  authDomain: "authentication-finel-project.firebaseapp.com",
  projectId: "authentication-finel-project",
  storageBucket: "authentication-finel-project.appspot.com",
  messagingSenderId: "1025857075393",
  appId: "1:1025857075393:web:fb8f03a83d6af67fe0bc40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
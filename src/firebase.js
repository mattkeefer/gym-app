// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvHA9Nl28px4sVgNMJtdS8hMNyIZOETJI",
  authDomain: "gymcapacities.firebaseapp.com",
  projectId: "gymcapacities",
  storageBucket: "gymcapacities.appspot.com",
  messagingSenderId: "731778834586",
  appId: "1:731778834586:web:59a04685e5463fb3c57f23",
  measurementId: "G-8CMF5EMEYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
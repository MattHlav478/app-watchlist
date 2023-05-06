// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0frpoXOiYJ_6hxBsBaO-nw6vPWbop6SM",
  authDomain: "watchlist-app-c4e74.firebaseapp.com",
  projectId: "watchlist-app-c4e74",
  storageBucket: "watchlist-app-c4e74.appspot.com",
  messagingSenderId: "1048625180484",
  appId: "1:1048625180484:web:a52161e2c6dd9d9d4e7111",
  measurementId: "G-YH0M216687",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and export Firestore and get a reference to the service
export const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8080);

// Initialize and export Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
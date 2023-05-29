// Import the functions you need from the SDKs you need
import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDnZopNa-UvLWX7oLKynXUkFoVVskYK6HM',
  authDomain: 'ocean-quality.firebaseapp.com',
  projectId: 'ocean-quality',
  storageBucket: 'ocean-quality.appspot.com',
  messagingSenderId: '380664517429',
  appId: '1:380664517429:web:5c3cf4cac813d6a3cb727c',
  measurementId: 'G-L4Y0SWE3HP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
export { database, auth };

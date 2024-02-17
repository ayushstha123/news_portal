import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "newsportal123-80e3b.firebaseapp.com",
  projectId: "newsportal123-80e3b",
  storageBucket: "newsportal123-80e3b.appspot.com",
  messagingSenderId: "690209001939",
  appId: "1:690209001939:web:410e3f8954c03367fa5f26",
  measurementId: "G-J5RJJHBMK0"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
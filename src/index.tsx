import { createRoot } from 'react-dom/client'
import './app/styles/index.css'
import App from './app/App.tsx'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANTv-eAkPYlODJFHjLt8LkbdZMkUhQkno",
  authDomain: "todo-list-yydz.firebaseapp.com",
  projectId: "todo-list-yydz",
  storageBucket: "todo-list-yydz.firebasestorage.app",
  messagingSenderId: "341978379466",
  appId: "1:341978379466:web:60d17998adb2e88869f033"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getFirestore(app);

createRoot(document.getElementById('root')!).render(
    <App />
)

import {initializeApp, getApps} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANTv-eAkPYlODJFHjLt8LkbdZMkUhQkno",
  authDomain: "todo-list-yydz.firebaseapp.com",
  projectId: "todo-list-yydz",
  storageBucket: "todo-list-yydz.firebasestorage.app",
  messagingSenderId: "341978379466",
  appId: "1:341978379466:web:60d17998adb2e88869f033"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
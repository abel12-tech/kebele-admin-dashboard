import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_vJzD9A0NFgt84TTKvYTBKVQfbXY0llc",
  authDomain: "sign-languages-files.firebaseapp.com",
  projectId: "sign-languages-files",
  storageBucket: "sign-languages-files.appspot.com",
  messagingSenderId: "177850284349",
  appId: "1:177850284349:web:e43d1f1c44bca232a16d54",
  measurementId: "G-LSSL2SZFFQ",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

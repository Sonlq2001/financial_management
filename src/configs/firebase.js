import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsyfNmEtIGAOC-B4_rFOAqHDK60iUGTaQ",
  authDomain: "financial-management-58d4a.firebaseapp.com",
  projectId: "financial-management-58d4a",
  storageBucket: "financial-management-58d4a.appspot.com",
  messagingSenderId: "567469339108",
  appId: "1:567469339108:web:83362a19fa9c314eb297f1",
  measurementId: "G-N1MN1MRJG9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

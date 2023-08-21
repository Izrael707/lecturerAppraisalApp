// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyCtt7u3Yfmbbh1BPNuWxVNNiM99zGJ5rDo",
   authDomain: "appraisal-cb381.firebaseapp.com",
   projectId: "appraisal-cb381",
   storageBucket: "appraisal-cb381.appspot.com",
   messagingSenderId: "120883464421",
   appId: "1:120883464421:web:765d46dcbaccb6a4516c0c",
   measurementId: "G-PDCPPZ4LQC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const store = getStorage(app);

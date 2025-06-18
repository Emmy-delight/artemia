// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore}  from "firebase/firestore";
import {getStorage}  from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "artemia-459cf.firebaseapp.com",
  projectId: "artemia-459cf",
  storageBucket: "artemia-459cf.firebasestorage.app",
  messagingSenderId: "812623112841",
  appId: "1:812623112841:web:427de65c2bacda1624b458"
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig):getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export {db,storage}
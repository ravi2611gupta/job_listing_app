// Import the functions you need from the SDKs you need
import app from 'firebase/app' //new added by me 🎯
import { initializeApp } from "firebase/app";
import 'firebase/firestore'; //new added by me 🎯
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm_sH9PTSumQGDJNZQT1B3J6opObwpwVk",
  authDomain: "job-listing-cbf3c.firebaseapp.com",
  projectId: "job-listing-cbf3c",
  storageBucket: "job-listing-cbf3c.appspot.com",
  messagingSenderId: "193986420848",
  appId: "1:193986420848:web:83d29fea7526386c9314b5"
};

// Initialize Firebase
const firebaseInit = app.initializeApp(firebaseConfig); //new added by me (only given variable name "firebase" and added app.) 🎯
const myFirestore = firebaseInit.firestore(); //new added by me 🎯

export {firebaseInit, myFirestore, app}; //new added by me 🎯
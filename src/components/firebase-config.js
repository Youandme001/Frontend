import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDwN-ZvPN9L6pQ3uKlwt7sSbomUxYe5fhs",
  authDomain: "youanme-c0fe9.firebaseapp.com",
  projectId: "youanme-c0fe9",
  storageBucket: "youanme-c0fe9.appspot.com",
  messagingSenderId: "188028416229",
  appId: "1:188028416229:web:52ed0fcdf7217639fd240c",
  measurementId: "G-HHYXNS71Q8"
};

const app = initializeApp(firebaseConfig)


const storage = getStorage(app)
const db = getFirestore(app)

export {  db, storage}
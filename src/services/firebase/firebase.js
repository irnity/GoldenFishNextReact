import { initializeApp } from "firebase/app"

import { getAuth, GoogleAuthProvider } from "firebase/auth"

import { getFirestore } from "firebase/firestore"

import { getFunctions } from "firebase/functions"

import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW0n2tv3h6z7UTNRDOXdFKrGwXbgJWT6o",
  authDomain: "goldenfishreact.firebaseapp.com",
  databaseURL:
    "https://goldenfishreact-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "goldenfishreact",
  storageBucket: "goldenfishreact.appspot.com",
  messagingSenderId: "592146383685",
  appId: "1:592146383685:web:25c509cfc878396789f42c",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const functions = getFunctions(app)

// auth
export const auth = getAuth(app)

// auth google
export const googleProvider = new GoogleAuthProvider()

// data
export const db = getFirestore(app)

// storage
export const storage = getStorage(app)

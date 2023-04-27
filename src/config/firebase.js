import { initializeApp } from "firebase/app"

import { getAuth, GoogleAuthProvider } from "firebase/auth"

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore"

import { getFunctions } from "firebase/functions"

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

async function name() {
  const collectionRef = await collection(db, "store")
  const collectionSnap = await getDocs(collectionRef)

  const documentsData = collectionSnap.docs.map((doc) => doc.id)
  const dataslents = documentsData.map((data) => data.id)

  const path = []

  documentsData.forEach(async (doc) => {
    const itemsRef = await collection(db, "store", `${doc}`, "items")
    const itemsSnap = await getDocs(itemsRef)
    const itemsData = itemsSnap.docs.map((data) => data.id)

    // console.log(itemsData)

    itemsData.forEach((item) => {
      path.push({
        params: {
          categoryId: doc,
          itemId: item,
        },
      })
    })
  })
  console.log(path)
}

name()

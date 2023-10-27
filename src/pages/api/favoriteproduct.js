import { db } from "../../services/firebase/firebase"
import { nanoid } from "@reduxjs/toolkit"
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore"

async function handler(req, res) {
  const data = JSON.parse(req.body)
  if (req.method === "POST") {
    console.log(data.email, data.id)
    try {
      // add product to user favorite products
      const responce = await setDoc(
        doc(db, "users", data.email, "favoriteProducts", data.id),
        {
          id: data.id,
          createdAt: Timestamp.now(),
        }
      )

      console.log(responce)
      res.send({ status: 200, message: "product added" })
    } catch (error) {
      res.send({ status: 500, message: "product not added" })
    }
  }
}
export default handler

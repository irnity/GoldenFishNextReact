//
// post /api/

import { db } from "../../config/firebase"
import { nanoid } from "@reduxjs/toolkit"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"

async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body)
    // edit
    const productData = {
      // new update code creator
      code: nanoid(),
      category: data.category,
      title: data.title,
      description: data.description,
      image: data.image,
      price: data.price,
      inStock: data.inStock,
      userId: data.userId,
    }

    const productsCollectionRef = doc(
      db,
      "store",
      productData.category,
      "items",
      productData.code
    )

    try {
      // addDoc createNew elemets with auto id

      // await setDoc(doc(db, "store", `hooks`, "items", `5`), productData)
      const responce = await setDoc(productsCollectionRef, productData)
      res.status(201).json({ message: "Meetup inserted" })
    } catch (err) {
      // console.error(err)
      // res.json(err, data)
      res.json(err)
    }
  }
}

export default handler

//
// post /api/

import { db } from "../../services/firebase/firebase"
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
      params: data.params,
    }

    try {
      // addDoc createNew elemets with auto id

      const responce = await setDoc(
        doc(db, "store", productData.category, "items", productData.code),
        productData
      )
      res.status(201).json({ message: "Meetup inserted" })
    } catch (err) {
      // console.error(err)
      // res.json(err, data)
      res.json(err)
    }
  }
}

export default handler

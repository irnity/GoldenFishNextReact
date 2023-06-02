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
      name: data.name,
      email: data.email,
      rate: data.rate,
      positive: data.positive,
      negative: data.negative,
      comment: data.comment,
    }

    try {
      // addDoc createNew elemets with auto id

      const responce = await addDoc(
        collection(
          db,
          "store",
          data.categoryId,
          "items",
          data.itemId,
          "comments"
        ),
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

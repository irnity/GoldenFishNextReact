import { db } from "../../services/firebase/firebase"
import { nanoid } from "@reduxjs/toolkit"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"

async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body)
    // edit
    const productData = {
      code: nanoid(),
      category: data.category,
      title: data.title,
      description: data.description,
      image: data.image,
      price: data.price,
      inStock: data.inStock,
      params: data.params,
    }

    // firebase add new product
    try {
      const responce = await setDoc(
        doc(db, "store", productData.category, "items", productData.code),
        productData
      )
      res.json({ message: "success", data: productData })
    } catch (err) {
      res.json(err)
    }
  }
}

export default handler

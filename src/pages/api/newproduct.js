import { db } from "../../services/firebase/firebase"
import { nanoid } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore"

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
      totalComments: 0,
      totalRate: 0,
      // firebase time
      createdAt: new Date().toISOString(),
    }

    // firebase add new product
    try {
      const responce = await setDoc(
        doc(db, "products", productData.code),
        productData
      )
      res.json({ message: "success", data: productData })
    } catch (err) {
      res.json(err)
    }
  }

  if (req.method === "PUT") {
    const data = JSON.parse(req.body)
    console.log(data, req.method)
    try {
      await deleteDoc(doc(db, "products", data.itemId))
      res.send({ status: 200, message: "Comment Deleted" })
    } catch (error) {
      res.send({ status: 500, message: "Comment not Deleted" })
    }
  }
}

export default handler

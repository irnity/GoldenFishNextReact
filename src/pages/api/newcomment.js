//
// post /api/

import { db } from "../../services/firebase/firebase"
import { nanoid } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore"

async function handler(req, res) {
  const data = JSON.parse(req.body)
  if (req.method === "POST") {
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
      res.json(err)
    }
  }
  if (req.method === "PUT") {
    try {
      await deleteDoc(
        doc(
          db,
          "store",
          data.categoryId,
          "items",
          data.itemId,
          "comments",
          data.id
        )
      )
      res.send({ status: 200, message: "Comment Deleted" })
    } catch (error) {
      res.send({ status: 500, message: "Comment not Deleted" })
    }
  }
}

///  test for handler function
// let test = async () => {
//   let req = {
//     body: JSON.stringify({
//       name: "test",
//       email: "",
//       rate: 5,
//       positive: "",
//       negative: "",
//       comment: "",
//       categoryId: "test",
//       itemId: "test",
//     }),
//     method: "POST",
//   }
//   let res = {
//     status: (code) => {
//       console.log(code)
//       return res
//     },
//   }
//   await handler(req, res)
//   console.log("test")
// }

// test()

export default handler

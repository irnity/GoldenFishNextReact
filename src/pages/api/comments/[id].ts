//
// post /api/

import { db } from '@/Services/Firebase/firebase'
import {
  deleteDoc,
  doc,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { type NextApiRequest, type NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body)

  const productData = {
    code: data.productCode,
    category: data.productCategory,
    name: data.name,
    email: data.email,
    rate: data.rate,
    positive: data.positive,
    negative: data.negative,
    comment: data.comment,
    date: new Date().toISOString(),
  }

  if (req.method === 'POST') {
    // edit

    try {
      // add comment to user
      await setDoc(
        doc(db, 'users', productData.email, 'comments', productData.code),
        productData
      )

      // add comment to product
      await setDoc(
        doc(db, 'products', productData.code, 'comments', productData.email),
        productData
      )

      // update product
      await updateDoc(doc(db, 'products', productData.code), {
        totalComments: increment(1),
        totalRate: increment(productData.rate),
      })
      res.status(201).json({ message: 'Meetup inserted' })
    } catch (err) {
      res.json(err)
    }
  }
  if (req.method === 'PUT') {
    try {
      // delete comment from user
      await deleteDoc(
        doc(db, 'users', productData.email, 'comments', productData.code)
      )

      // delete comment from product
      await deleteDoc(
        doc(db, 'products', productData.code, 'comments', productData.email)
      )

      // update product
      await updateDoc(doc(db, 'products', productData.code), {
        totalComments: increment(-1),
        totalRate: increment(-data.rate),
      })

      res.send({ status: 200, message: 'Comment Deleted' })
    } catch (error) {
      res.send({ status: 500, message: 'Comment not Deleted' })
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

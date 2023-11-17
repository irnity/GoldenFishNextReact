//
// post /api/

import { db } from '../../services/firebase/firebase'

import {
  deleteDoc,
  doc,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

async function handler(req: any, res: any) {
  const data = JSON.parse(req.body)
  if (req.method === 'POST') {
    // edit
    const productData = {
      // new update code creator
      name: data.name,
      email: data.email,
      rate: data.rate,
      positive: data.positive,
      negative: data.negative,
      comment: data.comment,
      date: new Date().toISOString(),
    }

    try {
      // addDoc createNew elemets with auto id

      await setDoc(
        doc(db, 'products', data.itemId, 'comments', data.email),
        productData
      )
      await updateDoc(doc(db, 'products', data.itemId), {
        totalComments: increment(1),
        totalRate: increment(data.rate),
      })
      res.status(201).json({ message: 'Meetup inserted' })
    } catch (err) {
      res.json(err)
    }
  }
  if (req.method === 'PUT') {
    try {
      await deleteDoc(doc(db, 'products', data.itemId, 'comments', data.email))
      await updateDoc(doc(db, 'products', data.itemId), {
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

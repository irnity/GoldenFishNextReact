import { db } from '@/Services/Firebase/firebase'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'

async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body)

    // edit
    const productData = {
      code: data.code,
      category: data.category,
      title: data.title,
      description: data.description,
      price: data.price,
      inStock: data.inStock,
      weCanSell: true,
      params: data.params,
      totalComments: 0,
      totalRate: 0,
      uid: data.uid,

      // firebase time
      createdAt: new Date().toISOString(),
    }

    // firebase add new product
    try {
      await setDoc(doc(db, 'products', productData.code), productData)
      res.json({ message: 'success', data: productData })
    } catch (err) {
      res.json(err)
    }
  }

  if (req.method === 'PUT') {
    const data = JSON.parse(req.body)
    console.log(data, req.method)
    try {
      await deleteDoc(doc(db, 'products', data.itemId))
      res.send({ status: 200, message: 'Comment Deleted' })
    } catch (error) {
      res.send({ status: 500, message: 'Comment not Deleted' })
    }
  }
}

export default handler

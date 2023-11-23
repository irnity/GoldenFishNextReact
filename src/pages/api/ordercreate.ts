import { db } from '@/Services/Firebase/firebase'
import { nanoid } from '@reduxjs/toolkit'
import { Timestamp, doc, setDoc } from 'firebase/firestore'

async function handler(req: any, res: any) {
  const data = JSON.parse(req.body)
  console.log(data)
  if (req.method === 'POST') {
    const id = nanoid(8)
    try {
      await setDoc(doc(db, 'users', data.email, 'createdOrder', id), {
        id,
        ...data,
        status: 'В обробці',
        createdAt: Timestamp.now(),
      })

      await setDoc(doc(db, 'orders', id), {
        id,
        ...data,
        status: 'В обробці',
        createdAt: Timestamp.now(),
      })

      res.send({
        status: 200,
        message: `Товар замовлено`,
        exist: true,
      })
    } catch (error) {
      console.log(error)
      res.send({
        status: 500,
        message: 'Помилка спробуйте знову або зачекайте',
      })
    }
  }
}
export default handler

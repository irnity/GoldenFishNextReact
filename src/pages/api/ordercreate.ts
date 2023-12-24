import { db } from '@/Services/Firebase/firebase'
import { nanoid } from '@reduxjs/toolkit'
import { doc, setDoc } from 'firebase/firestore'

async function handler(req: any, res: any) {
  const data = JSON.parse(req.body)
  console.log(data)
  console.log('user:', data.userCredentials)
  console.log('basket:', data.basket)
  if (req.method === 'POST') {
    const id = nanoid(12)
    try {
      const order = {
        products: data.basket,
        userCredentials: data.userCredentials,
        createdAt: new Date().toISOString(),
        status: 'В обробці',
        id,
      }
      await setDoc(
        doc(db, 'users', order.userCredentials.email, 'createdOrder', id),
        order
      )

      await setDoc(doc(db, 'orders', id), order)

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

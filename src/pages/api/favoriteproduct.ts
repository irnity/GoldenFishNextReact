import { db } from '@/Services/Firebase/firebase'
import { Timestamp, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'

async function handler(req: any, res: any) {
  const data = JSON.parse(req.body)

  // need for check if product in favorite
  if (req.method === 'POST' && data.action === 'Check') {
    try {
      const docRef = doc(db, 'users', data.email, 'favoriteProducts', data.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        res.send({
          status: 200,
          message: 'Товар знайдено',
          exist: true,
        })
      } else {
        res.send({
          status: 404,
          message: 'Товар не знайдено',
          exist: false,
        })
      }
    } catch (error) {
      res.send({
        status: 500,
        message: 'Помилка спробуйте знову або зачекайте',
      })
    }
  }

  if (req.method === 'POST' && data.action === 'Add') {
    try {
      await setDoc(doc(db, 'users', data.email, 'favoriteProducts', data.id), {
        id: data.id,
        createdAt: Timestamp.now(),
      })

      res.send({
        status: 200,
        message: `Товар доданий до обраного`,
        exist: true,
      })
    } catch (error) {
      res.send({
        status: 500,
        message: 'Помилка спробуйте знову або зачекайте',
      })
    }
  }

  if (req.method === 'POST' && data.action === 'Remove') {
    try {
      await deleteDoc(doc(db, 'users', data.email, 'favoriteProducts', data.id))
      res.send({
        status: 200,
        message: `Товар видалений з обраного`,
        exist: false,
      })
    } catch (error) {
      res.send({
        status: 500,
        message: 'Помилка спробуйте знову або зачекайте',
      })
    }
  }
}

export default handler

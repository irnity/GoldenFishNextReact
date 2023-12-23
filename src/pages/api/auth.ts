import { db } from '@/Services/Firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

async function handler(req: any, res: any) {
  const data = JSON.parse(req.body)
  console.log(data)
  if (req.method === 'POST') {
    try {
      const docRef = doc(db, 'users', data)

      const docSnap = await getDoc(docRef)

      const userInfo = docSnap.data()

      console.log('user credentials:', userInfo)

      if (docSnap.exists()) {
        res.send({
          code: 200,
          data: userInfo,
        })
      } else {
        res.send({
          code: 500,
          data: {
            firstName: '',
            lastName: '',
            surname: '',
            phoneNumber: '',
            email: '',
          },
        })
      }
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

import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebase/firebase"

async function handler(req, res) {
  const data = JSON.parse(req.body)
  console.log(data, req.method)
  if (req.method === "PUT") {
    try {
      await deleteDoc(doc(db, "products", data.itemId))
      res.send({ status: 200, message: "Comment Deleted" })
    } catch (error) {
      res.send({ status: 500, message: "Comment not Deleted" })
    }
  }
}

export default handler

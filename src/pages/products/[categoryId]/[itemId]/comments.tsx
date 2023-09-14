import { FunctionComponent } from "react"
import Cart from "@/components/screens/product/about/cart/Cart"
import Comments from "@/components/screens/product/about/tabs/comments/Comments"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "@/services/firebase/firebase"

interface CommentsPageProps {
  data: any
}

const CommentsPage: FunctionComponent<CommentsPageProps> = ({ data }) => {
  return (
    <Cart>
      <Comments data={data} />
    </Cart>
  )
}

export async function getServerSideProps(context: any) {
  // get url
  const { categoryId, itemId } = context.params

  // fetch API
  const productsCollectionRef = collection(
    db,
    "store",
    `${categoryId}`,
    "items",
    `${itemId}`,
    "comments"
  )

  // get document
  const data = await getDocs(productsCollectionRef)

  // document to data
  const filteredData = data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  return {
    props: {
      data: filteredData,
    },
  }
}

export default CommentsPage

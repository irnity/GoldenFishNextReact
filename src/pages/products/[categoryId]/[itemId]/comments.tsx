import { FunctionComponent } from "react"
import Cart from "@/components/screens/product/components/cart/Cart"
import Comments from "@/components/screens/product/pages/comments/Comments"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db, storage } from "@/services/firebase/firebase"
import { IProduct } from "@/redux/model"
import { getDownloadURL, ref } from "firebase/storage"

interface CommentsPageProps {
  data: any
  product: IProduct
}

const CommentsPage: FunctionComponent<CommentsPageProps> = ({
  data,
  product,
}) => {
  return (
    <Cart product={product}>
      <Comments data={data} />
    </Cart>
  )
}

export async function getServerSideProps(context: any) {
  // get url
  const { categoryId, itemId } = context.params

  // fetch API
  const productsCollectionRef = doc(db, "products", `${itemId}`)

  const data = await getDoc(productsCollectionRef)

  const filteredData = data.data()

  // fetch API
  const commentsCollectionRef = collection(
    db,
    "products",
    `${itemId}`,
    "comments"
  )

  // get document
  const commentsData = await getDocs(commentsCollectionRef)

  // document to data
  const filteredcommentsData = commentsData.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  const imageRef = ref(storage, `productImages/${filteredData!.code}`) // Assuming each product has its own image ID.
  const url = await getDownloadURL(imageRef)
  filteredData!.image = url

  return {
    props: {
      data: filteredcommentsData,
      product: filteredData,
    },
  }
}

export default CommentsPage

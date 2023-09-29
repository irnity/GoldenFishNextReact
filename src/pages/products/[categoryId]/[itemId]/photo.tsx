import { FunctionComponent } from "react"
import Cart from "@/components/screens/product/components/cart/Cart"
import Photo from "@/components/screens/product/pages/photo/Photo"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/services/firebase/firebase"
import { IProduct } from "@/redux/model"

interface PhotoPageProps {
  data: IProduct
}

const PhotoPage: FunctionComponent<PhotoPageProps> = ({ data }) => {
  return (
    <Cart product={data}>
      <Photo />
    </Cart>
  )
}

export async function getServerSideProps(context: any) {
  const { categoryId, itemId } = context.params

  // fetch API
  const productsCollectionRef = doc(
    db,
    "store",
    `${categoryId}`,
    "items",
    `${itemId}`
  )

  const data = await getDoc(productsCollectionRef)

  const filteredData = data.data()

  return {
    props: {
      data: filteredData,
    },
  }
}

export default PhotoPage

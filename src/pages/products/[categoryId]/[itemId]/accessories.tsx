import { FunctionComponent } from "react"
import Cart from "@/components/screens/product/components/cart/Cart"
import Accessories from "@/components/screens/product/pages/accessories/Accessories"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/services/firebase/firebase"
import { IProduct } from "@/redux/model"

interface AccessoriesPageProps {
  data: IProduct
}

const AccessoriesPage: FunctionComponent<AccessoriesPageProps> = ({ data }) => {
  return (
    <Cart product={data}>
      <Accessories />
    </Cart>
  )
}

export async function getServerSideProps(context: any) {
  const { categoryId, itemId } = context.params

  const productsCollectionRef = doc(db, "products", `${itemId}`)

  const data = await getDoc(productsCollectionRef)

  const filteredData = data.data()

  return {
    props: {
      data: filteredData,
    },
  }
}

export default AccessoriesPage

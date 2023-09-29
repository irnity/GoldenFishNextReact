import { FunctionComponent } from "react"
import Characteristics from "@/components/screens/product/pages/characteristics/Characteristics"
import Cart from "@/components/screens/product/components/cart/Cart"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from "firebase/firestore"
import { db } from "@/services/firebase/firebase"

interface CharacteristicsPageProps {
  data: any
}

const CharacteristicsPage: FunctionComponent<CharacteristicsPageProps> = ({
  data,
}) => {
  return (
    <Cart product={data}>
      <Characteristics characteristics={data} />
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

export default CharacteristicsPage

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
import { db, storage } from "@/services/firebase/firebase"
import { IProduct } from "@/redux/model"
import { getDownloadURL, ref } from "firebase/storage"

interface CharacteristicsPageProps {
  data: IProduct
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

  const productsCollectionRef = doc(db, "products", `${itemId}`)

  const data = await getDoc(productsCollectionRef)

  const filteredData = data.data()

  const imageRef = ref(storage, `productImages/${filteredData!.code}`) // Assuming each product has its own image ID.
  const url = await getDownloadURL(imageRef)
  filteredData!.image = url

  return {
    props: {
      data: filteredData,
    },
  }
}

export default CharacteristicsPage

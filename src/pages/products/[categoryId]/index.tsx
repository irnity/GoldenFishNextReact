// react
import { FunctionComponent } from "react"

// firebase
import { db } from "../../../services/firebase/firebase"
import {
  getDocs,
  query,
  limit,
  collection,
  startAfter,
  getCountFromServer,
} from "firebase/firestore"

import { IProduct } from "@/redux/model"
import ListProducts from "@/components/screens/listProducts/page/ListProducts"

interface ProductsListProps {
  data: IProduct[]
  totalPages: number
}

const ProductsList: FunctionComponent<ProductsListProps> = ({
  data,
  totalPages,
}) => {
  return <ListProducts products={data} totalPages={totalPages} />
}

// props
export async function getServerSideProps(context: any) {
  // запит до API або бази даних для отримання списку постів
  const id = context.params.categoryId

  const page = parseInt(context.query.page)

  let data

  let totalPages

  try {
    const coll = collection(db, `store`, `${id}`, "items")
    const snapshot = await getCountFromServer(coll)

    totalPages = snapshot.data().count
  } catch (error) {
    console.log(error)
  }

  try {
    // get collection
    // first page
    if (page <= 1 || Number.isNaN(page)) {
      const productsCollectionRef = query(
        collection(db, `store`, `${id}`, "items"),
        limit(9)
      )

      data = await getDocs(productsCollectionRef)
    } else {
      // second page

      // get previes collection
      const previesProductsCollectionRef = query(
        collection(db, `store`, `${id}`, "items"),
        limit(9 * (page - 1))
      )

      const previesData = await getDocs(previesProductsCollectionRef)

      const lastVisible = previesData.docs[previesData.docs.length - 1]

      // get new collection
      const productsCollectionRef = query(
        collection(db, `store`, `${id}`, "items"),
        startAfter(lastVisible),
        limit(9)
      )

      data = await getDocs(productsCollectionRef)
    }

    // docs to data
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))

    return {
      props: {
        data: filteredData,
        totalPages: totalPages,
      },
      // revalidate: 30,
    }
  } catch (err) {
    console.error(err)
  }
}

export default ProductsList

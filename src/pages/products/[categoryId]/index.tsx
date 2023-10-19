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
  doc,
  where,
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
  const id = context.params.categoryId
  const page = parseInt(context.query.page)

  let data
  let totalPages

  // get total pages
  try {
    const coll = query(
      collection(db, `products`),
      where("category", "==", `${id}`)
    )
    const snapshot = await getCountFromServer(coll)

    totalPages = snapshot.data().count
  } catch (error) {
    console.log(error)
  }

  // get first page
  try {
    if (page <= 1 || Number.isNaN(page)) {
      const products = query(
        collection(db, `products`),
        where("category", "==", `${id}`),
        limit(9)
      )
      data = await getDocs(products)
    } else {
      // get second page
      const productsCollectionRef = query(
        collection(db, `products`),
        where("category", "==", `${id}`),
        startAfter(page * 9 - 9),
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
    }
  } catch (err) {
    console.error(err)
  }
}

export default ProductsList

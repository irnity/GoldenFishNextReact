// react
import { FunctionComponent } from "react"
import { OrderByDirection } from "firebase/firestore"

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
  orderBy,
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

function createProductQuery(
  id: string,
  page: number,
  sort: string | undefined
) {
  let baseQuery = query(
    collection(db, "products"),
    where("category", "==", id),
    limit(9)
  )

  if (page > 1) {
    baseQuery = query(baseQuery, startAfter(page * 9 - 9))
  }

  if (sort) {
    baseQuery = query(baseQuery, orderBy("price", sort as OrderByDirection))
  }

  return baseQuery
}

// props
export async function getServerSideProps(context: any) {
  const id = context.params.categoryId
  const page = parseInt(context.query.page)
  const sortQuary = context.query.sort

  let sort = undefined

  if (sortQuary === "cheap") {
    sort = "asc"
  }
  if (sortQuary === "expensive") {
    sort = "desc"
  }

  // console.log(id, page, sort)
  let data
  let totalPages

  // get total pages
  try {
    const coll = query(collection(db, `products`), where("category", "==", id))
    const snapshot = await getCountFromServer(coll)

    totalPages = snapshot.data().count
  } catch (error) {
    console.log(error)
  }

  const productsCollectionRef = createProductQuery(id, page, sort)

  try {
    const querySnapshot = await getDocs(productsCollectionRef)
    data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      data: data,
      totalPages: totalPages,
    },
  }
}

export default ProductsList

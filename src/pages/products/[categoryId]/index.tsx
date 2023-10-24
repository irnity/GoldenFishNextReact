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

export async function getServerSideProps(context: any) {
  const categoryId = context.params.categoryId
  const page = parseInt(context.query.page)
  const sortQuery = context.query.sort

  const inStock = context.query.inStock
  const inStockQuaryArray = inStock ? inStock.split(",") : []

  const price = context.query.price
  const priceQuaryArray = price ? price.split("-") : []

  let baseQuery = query(
    collection(db, `products`),
    where("category", "==", categoryId)
  )

  if (inStockQuaryArray.includes("available")) {
    baseQuery = query(baseQuery, where("weCanSell", "==", true))
  }
  if (inStockQuaryArray.includes("out_of_stock")) {
    baseQuery = query(baseQuery, where("weCanSell", "==", false))
  }

  if (priceQuaryArray.length === 2) {
    baseQuery = query(
      baseQuery,
      where("price", ">=", parseInt(priceQuaryArray[0])),
      where("price", "<=", parseInt(priceQuaryArray[1]))
    )
  }

  switch (sortQuery) {
    // case "rating":
    //   baseQuery = query(baseQuery, orderBy("totalComments", "desc"))
    //   break
    case "asc":
      console.log("asc")
      baseQuery = query(baseQuery, orderBy("price", "asc"))
      break
    case "desc":
      baseQuery = query(baseQuery, orderBy("price", "desc"))
      break
    default:
      baseQuery = query(baseQuery)
      break
  }

  try {
    const snapshot = await getCountFromServer(baseQuery)
    const totalPages = snapshot.data().count

    if (page && page > 1) {
      baseQuery = query(baseQuery, limit(9 * (page - 1)))
      const previesData = await getDocs(baseQuery)
      const lastVisible = previesData.docs[previesData.docs.length - 1]

      baseQuery = query(baseQuery, startAfter(lastVisible), limit(9))
    } else {
      baseQuery = query(baseQuery, limit(9))
    }

    const unfilteredData = await getDocs(baseQuery)
    const filteredData = unfilteredData.docs.map((doc) => ({
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

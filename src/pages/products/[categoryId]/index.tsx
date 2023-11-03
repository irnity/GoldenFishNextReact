// react
import { FunctionComponent } from "react"
import { OrderByDirection } from "firebase/firestore"

// firebase
import { db, storage } from "../../../services/firebase/firebase"
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
import { getDownloadURL, ref } from "firebase/storage"

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
  const { page, sort, inStock, price } = context.query

  const inStockQuaryArray = inStock ? inStock.split(",") : []

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

  switch (sort) {
    // case "rating":
    //   baseQuery = query(baseQuery, orderBy("totalComments", "desc"))
    //   break
    case "asc":
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

    if (page && +page > 1) {
      baseQuery = query(baseQuery, limit(12 * (page - 1)))
      const previesData = await getDocs(baseQuery)
      const lastVisible = previesData.docs[previesData.docs.length - 1]

      baseQuery = query(baseQuery, startAfter(lastVisible), limit(12))
    } else {
      baseQuery = query(baseQuery, limit(12))
    }

    const unfilteredData = await getDocs(baseQuery)
    const filteredData: IProduct[] = unfilteredData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    })) as IProduct[]

    const filteredDataWithImages = await Promise.all(
      filteredData.map(async (product) => {
        const imageRef = ref(storage, `productImages/${product.id}`) // Assuming each product has its own image ID.
        try {
          const url = await getDownloadURL(imageRef)
          product.image = url
        } catch (error) {
          console.error("Error loading image:", error)
        }
        return product
      })
    )

    return {
      props: {
        data: filteredDataWithImages,
        totalPages: totalPages,
      },
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        ok: false,
        reason:
          "some error description for your own consumption, not for client side",
      },
    }
  }
}

export default ProductsList

// components
import Product from "@/components/screens/product/pages/main/Product"

// react
import { FunctionComponent, useEffect } from "react"

// redux
import { IProduct } from "@/redux/model"

// firebase
import { db } from "@/services/firebase/firebase"
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore"
import { useDispatch } from "react-redux"
import { productsActions } from "@/redux/productsSlice"
import Products from "@/components/screens/listProducts/components/products/Products"

interface ItemProps {
  data: IProduct
  commentsCount: number
  commentsData: any
  advertising: IProduct[]
}

const Item: FunctionComponent<ItemProps> = ({
  data,
  commentsData,
  commentsCount,
  advertising,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productsActions.replaceProduct(data))
  }, [data, dispatch])

  return (
    <>
      <Product
        data={data}
        commentsCount={commentsCount}
        commentsData={commentsData.slice(0, 3) || []}
      />
      <Products products={advertising} />
    </>
  )
}

export async function getServerSideProps(context: any) {
  // get url
  const { categoryId, itemId } = context.params

  let productFiltered: IProduct | [] = []
  let commentsFiltered: any = []

  try {
    // product
    const productQuery = doc(db, "products", itemId)
    const productUnfiltered = await getDoc(productQuery)
    productFiltered = productUnfiltered.data() as IProduct

    // comments
    const commentsQuery = query(collection(db, "products", itemId, "comments"))
    const commentsUnfiltered = await getDocs(commentsQuery)
    commentsFiltered = commentsUnfiltered.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.log(error)
  }

  let advertisingFiltered: any = []

  try {
    const advertisingQuery = query(
      collection(db, `products`),
      where("category", "==", categoryId),
      limit(12)
    )
    const advertisingUnfiltered = await getDocs(advertisingQuery)
    advertisingFiltered = advertisingUnfiltered.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))
    advertisingFiltered = advertisingFiltered.filter(
      (item: any) => item.id !== itemId
    )
    advertisingFiltered = advertisingFiltered.sort(() => Math.random() - 0.5)
    advertisingFiltered = advertisingFiltered.slice(0, 3)
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      // product
      data: productFiltered,
      // comments
      commentsData: commentsFiltered,
      commentsCount: commentsFiltered.length,
      // advertising
      advertising: advertisingFiltered,
    },
  }
}

export default Item

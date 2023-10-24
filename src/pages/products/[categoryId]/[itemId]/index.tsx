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
  where,
} from "firebase/firestore"
import { useDispatch } from "react-redux"
import { productsActions } from "@/redux/productsSlice"
import ProductsList from ".."
import ListProducts from "@/components/screens/listProducts/page/ListProducts"
import Products from "@/components/screens/listProducts/components/products/Products"

interface ItemProps {
  data: IProduct
  commentsCount: number
  commentsData: any
  canBuy: IProduct[]
}

const Item: FunctionComponent<ItemProps> = ({
  data,
  commentsCount,
  commentsData,
  canBuy,
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
      <Products products={canBuy} />
    </>
  )
}

export async function getServerSideProps(context: any) {
  // get url
  const { categoryId, itemId } = context.params

  const productsCollectionRef = doc(db, "products", itemId)

  const data = await getDoc(productsCollectionRef)

  const filteredData = data.data()

  // comments

  // fetch API
  const commentsCollectionRef = collection(db, "products", itemId, "comments")

  // get document
  const commentsData = await getDocs(commentsCollectionRef)

  // document to data
  const filteredcommentsData = commentsData.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  let canBuy: any = []

  try {
    const canbuyquary = query(
      collection(db, `products`),
      where("category", "==", "fishingrod"),
      limit(3)
    )
    const canBuyAnfiltered = await getDocs(canbuyquary)
    canBuy = canBuyAnfiltered.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      data: filteredData,
      commentsCount: filteredcommentsData.length,
      commentsData: filteredcommentsData,
      canBuy: canBuy,
    },
  }
}

export default Item

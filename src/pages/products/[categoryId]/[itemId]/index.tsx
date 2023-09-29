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
} from "firebase/firestore"
import { useDispatch } from "react-redux"
import { productsActions } from "@/redux/productsSlice"

interface ItemProps {
  data: IProduct
  commentsCount: number
  commentsData: any
}

const Item: FunctionComponent<ItemProps> = ({
  data,
  commentsCount,
  commentsData,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productsActions.replaceProduct(data))
  }, [data, dispatch])

  return (
    <Product
      data={data}
      commentsCount={commentsCount}
      commentsData={commentsData}
    />
  )
}

export async function getServerSideProps(context: any) {
  // get url
  const { categoryId, itemId } = context.params

  const productsCollectionRef = doc(
    db,
    "store",
    `${categoryId}`,
    "items",
    `${itemId}`
  )

  const data = await getDoc(productsCollectionRef)

  const filteredData = data.data()

  const commentsCountRef = collection(
    db,
    "store",
    `${categoryId}`,
    "items",
    `${itemId}`,
    "comments"
  )

  const commentsCountSnapshot = await getCountFromServer(commentsCountRef)

  const commentsCount = commentsCountSnapshot.data().count

  // fetch API
  const commentsCollectionRef = query(
    collection(db, "store", `${categoryId}`, "items", `${itemId}`, "comments"),
    limit(3)
  )

  // get document
  const comments = await getDocs(commentsCollectionRef)

  // document to data
  const commentsData = comments.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return {
    props: {
      data: filteredData,
      commentsCount,
      commentsData: commentsData,
    },
  }
}

export default Item

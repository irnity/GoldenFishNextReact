import Main from "../../../components/main/mainBox/Main"

import { productsActions } from "../../../store/productsSlice"
import { useDispatch } from "react-redux"
import { useEffect, FunctionComponent } from "react"

import { db } from "../../../config/firebase"
import { getDocs, doc, collection, getDoc } from "firebase/firestore"

interface ProductsListProps {}

const ProductsList: FunctionComponent<ProductsListProps> = (props: any) => {
  console.log(props)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productsActions.replaceProducts(props.data))
  }, [dispatch, props.data])

  return <Main />
}
export async function getStaticPaths() {
  const collectionRef = collection(db, "store")
  const collectionSnap = await getDocs(collectionRef)

  // docs to data
  const filteredData = collectionSnap.docs.map((doc) => ({
    id: doc.id,
  }))

  // make path id
  const paths = filteredData.map((data: any) => ({
    params: { categoryId: data.id },
  }))

  return { paths, fallback: false }
}

// props
export async function getStaticProps(context: any) {
  // запит до API або бази даних для отримання списку постів
  const id = context.params.categoryId
  try {
    // get collection
    const productsCollectionRef = collection(db, `store`, `${id}`, "items")

    // get docs
    const data = await getDocs(productsCollectionRef)

    // docs to data
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))

    return {
      props: {
        data: filteredData,
      },
    }
  } catch (err) {
    console.error(err)
  }
}

export default ProductsList

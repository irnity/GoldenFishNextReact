import Main from "../../../components/main/mainBox/Main"

import { productsActions } from "../../../store/productsSlice"
import { useDispatch } from "react-redux"
import { useEffect, FunctionComponent } from "react"

import { db } from "../../../config/firebase"
import { getDocs, doc, collection, getDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"

import { ProductList } from "@/store/model"

interface ProductsListProps {
  data: ProductList[]
}

const ProductsList: FunctionComponent<ProductsListProps> = (props) => {
  return <Main data={props.data} />
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
    const productsCollectionRef = await collection(
      db,
      `store`,
      `${id}`,
      "items"
    )

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
      revalidate: 30,
    }
  } catch (err) {
    console.error(err)
  }
}

export default ProductsList

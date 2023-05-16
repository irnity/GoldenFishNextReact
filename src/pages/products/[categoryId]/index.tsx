import { useEffect, FunctionComponent } from "react"

import { db } from "../../../config/firebase"
import {
  getDocs,
  query,
  limit,
  collection,
  startAfter,
} from "firebase/firestore"

import { ProductList } from "@/store/model"
import ListProducts from "@/components/main/listProducts/ListProducts"

interface ProductsListProps {
  data: ProductList[]
}

const ProductsList: FunctionComponent<ProductsListProps> = (props) => {
  return <ListProducts data={props.data} />
}

// export async function getStaticPaths() {
//   const collectionRef = collection(db, "store")
//   const collectionSnap = await getDocs(collectionRef)

//   // docs to data
//   const filteredData = collectionSnap.docs.map((doc) => ({
//     id: doc.id,
//   }))

//   // make path id
//   const paths = filteredData.map((data: any) => ({
//     params: { categoryId: data.id },
//   }))

//   return { paths, fallback: false }
// }

// props
export async function getServerSideProps(context: any) {
  // запит до API або бази даних для отримання списку постів
  const id = context.params.categoryId

  const page = parseInt(context.query.page)

  let data

  try {
    // get collection
    // first page
    if (page <= 1) {
      const productsCollectionRef = await query(
        collection(db, `store`, `${id}`, "items"),
        limit(9)
      )

      data = await getDocs(productsCollectionRef)
    } else {
      // second page

      // get previes collection
      const previesProductsCollectionRef = await query(
        collection(db, `store`, `${id}`, "items"),
        limit(9 * (page - 1))
      )

      const previesData = await getDocs(previesProductsCollectionRef)

      const lastVisible = await previesData.docs[previesData.docs.length - 1]

      // get new collection
      const productsCollectionRef = await query(
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
      },
      // revalidate: 30,
    }
  } catch (err) {
    console.error(err)
  }
}

export default ProductsList

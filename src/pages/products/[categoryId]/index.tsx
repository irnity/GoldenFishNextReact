import { FunctionComponent } from "react"

import { db } from "../../../config/firebase"
import {
  getDocs,
  query,
  limit,
  collection,
  startAfter,
  getCountFromServer,
} from "firebase/firestore"

import { IProduct } from "@/store/model"
import ListProducts from "@/components/main/listProducts/ListProducts"

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

  let totalPages

  try {
    const coll = collection(db, `store`, `${id}`, "items")
    const snapshot = await getCountFromServer(coll)

    totalPages = snapshot.data().count
  } catch (error) {
    console.log(error)
  }

  try {
    // get collection
    // first page
    if (page <= 1 || Number.isNaN(page)) {
      const productsCollectionRef = query(
        collection(db, `store`, `${id}`, "items"),
        limit(9)
      )

      data = await getDocs(productsCollectionRef)
    } else {
      // second page

      // get previes collection
      const previesProductsCollectionRef = query(
        collection(db, `store`, `${id}`, "items"),
        limit(9 * (page - 1))
      )

      const previesData = await getDocs(previesProductsCollectionRef)

      const lastVisible = previesData.docs[previesData.docs.length - 1]

      // get new collection
      const productsCollectionRef = query(
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
        totalPages: totalPages,
      },
      // revalidate: 30,
    }
  } catch (err) {
    console.error(err)
  }
}

export default ProductsList

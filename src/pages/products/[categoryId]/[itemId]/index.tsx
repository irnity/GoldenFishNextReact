// components
import Product from "@/features/product/Product"

// react
import { FunctionComponent, useEffect } from "react"

// redux
import { IProduct } from "@/redux/model"

// firebase
import { db } from "@/services/firebase/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useDispatch } from "react-redux"
import { productsActions } from "@/redux/productsSlice"

interface ItemProps {
  data: IProduct
}

const Item: FunctionComponent<ItemProps> = ({ data }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productsActions.replaceProduct(data))
  }, [data, dispatch])

  return (
    <>
      <Product />
    </>
  )
}

// url paths
// export async function getStaticPaths() {
//   const paths: any = []

//   // get all category names
//   const collectionRef = await collection(db, "store")
//   const collectionSnap = await getDocs(collectionRef)
//   const documentsData = collectionSnap.docs.map((doc) => doc.id)

//   // by every category name fetch items
//   documentsData.forEach(async (doc) => {
//     // get all items in category
//     const itemsRef = await collection(db, "store", `${doc}`, "items")
//     const itemsSnap = await getDocs(itemsRef)
//     const itemsData = itemsSnap.docs.map((data) => data.id)

//     // by every item create path
//     itemsData.forEach((item) => {
//       paths.push({
//         params: {
//           categoryId: doc,
//           itemId: item,
//         },
//       })
//     })
//   })

//   return {
//     fallback: false,
//     paths,
//   }
// }

// get Data from server
export async function getServerSideProps(context: any) {
  // get url
  const { categoryId, itemId } = context.params

  // fetch API
  const productsCollectionRef = doc(
    db,
    "store",
    `${categoryId}`,
    "items",
    `${itemId}`
  )

  // get document
  const data = await getDoc(productsCollectionRef)

  // document to data
  const filteredData = data.data()

  return {
    props: {
      data: filteredData,
    },
  }
}

export default Item

import Product from "@/components/main/product/Product"
import { db } from "@/config/firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useRouter } from "next/router"
import { FunctionComponent } from "react"

interface ItemProps {}

const Item: FunctionComponent<ItemProps> = (props: any) => {
  const router = useRouter()

  const data: {
    description: string
    title: string
    image: string
    price: number
    code: string
    inStock: string
  } = props.data

  const { categoryId, itemId } = router.query
  console.log(props.data)
  return (
    <>
      <Product product={data} />
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

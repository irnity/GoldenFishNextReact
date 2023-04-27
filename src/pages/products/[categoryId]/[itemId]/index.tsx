import { db } from "@/config/firebase"
import { collection, doc, getDocs } from "firebase/firestore"
import { useRouter } from "next/router"
import { FunctionComponent } from "react"

interface ItemProps {}

const Item: FunctionComponent<ItemProps> = (props: any) => {
  const router = useRouter()

  const { categoryId, itemId } = router.query
  console.log(props.data)
  return (
    <div>
      <h1>Category:{categoryId}</h1>

      <h1>name:{itemId}</h1>
    </div>
  )
}

// url paths
export async function getStaticPaths() {
  const paths: any = []

  // get all category names
  const collectionRef = await collection(db, "store")
  const collectionSnap = await getDocs(collectionRef)
  const documentsData = collectionSnap.docs.map((doc) => doc.id)

  // by every category name fetch items
  documentsData.forEach(async (doc) => {
    // get all items in category
    const itemsRef = await collection(db, "store", `${doc}`, "items")
    const itemsSnap = await getDocs(itemsRef)
    const itemsData = itemsSnap.docs.map((data) => data.id)

    // by every item create path
    itemsData.forEach((item) => {
      paths.push({
        params: {
          categoryId: doc,
          itemId: item,
        },
      })
    })
  })

  return {
    fallback: false,
    paths,
  }
}

// get Data from server
export async function getStaticProps(context: any) {
  // get url
  const { categoryId, itemId } = context.params

  // fetch API
  return {
    props: {
      data: {
        categoryId,
        itemId,
      },
    },
  }
}

export default Item

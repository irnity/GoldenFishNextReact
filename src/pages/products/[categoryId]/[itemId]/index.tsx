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
      <h1>Category</h1>

      <h1>name:{itemId}</h1>
    </div>
  )
}

export async function getStaticPaths() {
  const collectionRef = collection(db, "store")
  const collectionSnap = await getDocs(collectionRef)

  // docs to data
  const dynamic1Values = collectionSnap.docs.map((doc) => ({
    id: doc.id,
  }))

  const path= []


  dynamic1Values.forEach((dynamic1)=>{

  })

  // dynamic1Values.forEach((dynamic1) => {
  // dynamic2Values.forEach((dynamic2) => {
  // paths.push({
  // params: {
  // dynamic1,
  // dynamic2,
  // },
  // });
  // });
  // });




  return {
    fallback: false,
    paths: [
      {
        params: {
          categoryId: "fishingrod",
          itemId: "m1",
        },
      },
    ],
  }
}

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

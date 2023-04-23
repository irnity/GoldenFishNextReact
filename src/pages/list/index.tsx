import { useLoaderData } from "react-router-dom"
import Main from "../../components/main/mainBox/Main"

import { productsActions } from "../../store/productsSlice"
import { useDispatch } from "react-redux"
import { useEffect, FunctionComponent } from "react"

import { db } from "../../config/firebase"
import { getDocs, doc, collection, getDoc } from "firebase/firestore"

interface ProductsListProps {}

const ProductsList: FunctionComponent<ProductsListProps> = () => {
  const data = useLoaderData()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productsActions.replaceProducts(data))
  }, [data, dispatch])

  return <Main />
}

export default ProductsList

interface request {
  request: {
    url: string
  }
}

// need fix types
export async function loader({ request }: request) {
  const url = new URL(request.url)
  const path = url.pathname

  try {
    // get collection
    const productsCollectionRef = collection(db, `store`, `${path}`, "items")

    // get docs
    const data = await getDocs(productsCollectionRef)

    // docs to data
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    // const hooks = collection(db, `store`, `fishingrod`, "items")
    // const gg = await getDocs(hooks)
    // console.log(gg.docs.map((doc) => doc.data()))

    return filteredData
  } catch (err) {
    console.error(err)
  }
}

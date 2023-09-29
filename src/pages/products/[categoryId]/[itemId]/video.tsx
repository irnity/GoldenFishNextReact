import { FunctionComponent } from "react"

import Cart from "@/components/screens/product/components/cart/Cart"
import Video from "@/components/screens/product/pages/video/Video"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/services/firebase/firebase"
import { IProduct } from "@/redux/model"
interface VideoPageProps {
  data: IProduct
}

const VideoPage: FunctionComponent<VideoPageProps> = ({ data }) => {
  return (
    <Cart product={data}>
      <Video />
    </Cart>
  )
}

export async function getServerSideProps(context: any) {
  const { categoryId, itemId } = context.params

  // fetch API
  const productsCollectionRef = doc(
    db,
    "store",
    `${categoryId}`,
    "items",
    `${itemId}`
  )

  const data = await getDoc(productsCollectionRef)

  const filteredData = data.data()

  return {
    props: {
      data: filteredData,
    },
  }
}

export default VideoPage

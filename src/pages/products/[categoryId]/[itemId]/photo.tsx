import { FunctionComponent } from "react"
import Cart from "@/components/screens/product/components/cart/Cart"
import Photo from "@/components/screens/product/pages/photo/Photo"

interface PhotoPageProps {}

const PhotoPage: FunctionComponent<PhotoPageProps> = () => {
  return (
    <Cart>
      <Photo />
    </Cart>
  )
}

export default PhotoPage

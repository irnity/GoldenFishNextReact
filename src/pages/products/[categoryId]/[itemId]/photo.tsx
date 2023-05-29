import { FunctionComponent } from "react"
import Cart from "@/features/product/about/cart/Cart"
import Photo from "@/features/product/about/tabs/photo/Photo"

interface PhotoPageProps {}

const PhotoPage: FunctionComponent<PhotoPageProps> = () => {
  return (
    <Cart>
      <Photo />
    </Cart>
  )
}

export default PhotoPage

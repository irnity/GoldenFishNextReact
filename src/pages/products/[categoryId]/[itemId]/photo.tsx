import { FunctionComponent } from "react"
import Cart from "@/components/main/product/about/cart/Cart"
import Photo from "@/components/main/product/about/tabs/photo/Photo"

interface PhotoPageProps {}

const PhotoPage: FunctionComponent<PhotoPageProps> = () => {
  return (
    <Cart>
      <Photo />
    </Cart>
  )
}

export default PhotoPage

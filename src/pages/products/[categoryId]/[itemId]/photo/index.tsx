import { FunctionComponent } from "react"
import Characteristics from "@/components/main/product/about/info/Characteristics"
import Cart from "@/components/main/product/about/cart/Cart"

interface PhotoPageProps {}

const PhotoPage: FunctionComponent<PhotoPageProps> = () => {
  return (
    <Cart>
      <Characteristics />
    </Cart>
  )
}

export default PhotoPage

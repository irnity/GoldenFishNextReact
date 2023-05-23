import { FunctionComponent } from "react"
import Cart from "@/components/main/product/about/cart/Cart"
import Characteristics from "@/components/main/product/about/info/Characteristics"

interface AccessoriesPageProps {}

const AccessoriesPage: FunctionComponent<AccessoriesPageProps> = () => {
  return (
    <Cart>
      <Characteristics />
    </Cart>
  )
}

export default AccessoriesPage

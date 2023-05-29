import { FunctionComponent } from "react"
import Cart from "@/features/product/about/cart/Cart"
import Accessories from "@/features/product/about/tabs/accessories/Accessories"

interface AccessoriesPageProps {}

const AccessoriesPage: FunctionComponent<AccessoriesPageProps> = () => {
  return (
    <Cart>
      <Accessories />
    </Cart>
  )
}

export default AccessoriesPage

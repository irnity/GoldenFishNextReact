import { FunctionComponent } from "react"
import Cart from "@/components/screens/product/about/cart/Cart"
import Accessories from "@/components/screens/product/about/tabs/accessories/Accessories"

interface AccessoriesPageProps {}

const AccessoriesPage: FunctionComponent<AccessoriesPageProps> = () => {
  return (
    <Cart>
      <Accessories />
    </Cart>
  )
}

export default AccessoriesPage

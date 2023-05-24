import { FunctionComponent } from "react"
import Cart from "@/components/main/product/about/cart/Cart"
import Accessories from "@/components/main/product/about/tabs/accessories/accessories"

interface AccessoriesPageProps {}

const AccessoriesPage: FunctionComponent<AccessoriesPageProps> = () => {
  return (
    <Cart>
      <Accessories />
    </Cart>
  )
}

export default AccessoriesPage

import { FunctionComponent } from "react"
import Cart from "@/components/main/product/about/cart/Cart"
import Characteristics from "@/components/main/product/about/info/Characteristics"

interface CommentsPageProps {}

const CommentsPage: FunctionComponent<CommentsPageProps> = () => {
  return (
    <Cart>
      <Characteristics />
    </Cart>
  )
}

export default CommentsPage

import { FunctionComponent } from "react"
import Cart from "@/components/main/product/about/cart/Cart"
import Comments from "@/components/main/product/about/tabs/comments/Comments"

interface CommentsPageProps {}

const CommentsPage: FunctionComponent<CommentsPageProps> = () => {
  return (
    <Cart>
      <Comments />
    </Cart>
  )
}

export default CommentsPage

import { FunctionComponent } from "react"
import Cart from "@/features/product/about/cart/Cart"
import Comments from "@/features/product/about/tabs/comments/Comments"

interface CommentsPageProps {}

const CommentsPage: FunctionComponent<CommentsPageProps> = () => {
  return (
    <Cart>
      <Comments />
    </Cart>
  )
}

export default CommentsPage

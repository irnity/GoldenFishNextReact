import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"
import { FunctionComponent } from "react"

interface ArticleReviewsProps {}

const ArticleReviewsPage: FunctionComponent<ArticleReviewsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default ArticleReviewsPage

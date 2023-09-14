import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"
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

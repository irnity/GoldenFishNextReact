import { FunctionComponent } from "react"
import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"

interface NewsProps {}

const NewsPage: FunctionComponent<NewsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default NewsPage

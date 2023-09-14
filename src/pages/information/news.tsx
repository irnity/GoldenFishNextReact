import { FunctionComponent } from "react"
import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"

interface NewsProps {}

const NewsPage: FunctionComponent<NewsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default NewsPage

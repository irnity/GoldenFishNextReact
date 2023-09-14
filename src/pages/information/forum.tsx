import { FunctionComponent } from "react"
import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"

interface ForumProps {}

const ForumPage: FunctionComponent<ForumProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default ForumPage

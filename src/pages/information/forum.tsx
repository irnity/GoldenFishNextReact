import { FunctionComponent } from "react"
import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"

interface ForumProps {}

const ForumPage: FunctionComponent<ForumProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default ForumPage

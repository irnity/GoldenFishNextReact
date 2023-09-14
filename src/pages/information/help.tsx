import { FunctionComponent } from "react"
import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"

interface HelpProps {}

const HelpPage: FunctionComponent<HelpProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default HelpPage

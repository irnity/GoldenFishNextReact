import { FunctionComponent } from "react"
import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"

interface HelpProps {}

const HelpPage: FunctionComponent<HelpProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default HelpPage

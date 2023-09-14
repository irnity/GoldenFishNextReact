import { FunctionComponent } from "react"
import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"

interface DiscountsProps {}

const DiscountsPage: FunctionComponent<DiscountsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default DiscountsPage

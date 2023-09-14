import { FunctionComponent } from "react"
import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"

interface ShopsProps {}

const ShopsPage: FunctionComponent<ShopsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default ShopsPage

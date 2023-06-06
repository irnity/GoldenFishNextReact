import { FunctionComponent } from "react"
import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"

interface ShopsProps {}

const ShopsPage: FunctionComponent<ShopsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default ShopsPage

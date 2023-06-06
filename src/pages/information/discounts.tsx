import { FunctionComponent } from "react"
import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"

interface DiscountsProps {}

const DiscountsPage: FunctionComponent<DiscountsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default DiscountsPage

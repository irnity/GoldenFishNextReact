import { FunctionComponent } from "react"
import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"

interface GuaranteeProps {}

const GuaranteePage: FunctionComponent<GuaranteeProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default GuaranteePage

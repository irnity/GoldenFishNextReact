import { FunctionComponent } from "react"
import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"

interface GuaranteeProps {}

const GuaranteePage: FunctionComponent<GuaranteeProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default GuaranteePage

import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"
import { FunctionComponent } from "react"

interface ActionsProps {}

const ActionsPage: FunctionComponent<ActionsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default ActionsPage

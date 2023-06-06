import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"
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

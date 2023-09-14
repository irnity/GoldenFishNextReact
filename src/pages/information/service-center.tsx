import { FunctionComponent } from "react"
import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"

interface ServiceCenterProps {}

const ServiceCenterPage: FunctionComponent<ServiceCenterProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default ServiceCenterPage

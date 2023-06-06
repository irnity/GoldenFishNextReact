import { FunctionComponent } from "react"
import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"

interface ServiceCenterProps {}

const ServiceCenterPage: FunctionComponent<ServiceCenterProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default ServiceCenterPage

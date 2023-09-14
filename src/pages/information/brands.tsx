import { FunctionComponent } from "react"
import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"

interface BrandsProps {}

const BrandsPage: FunctionComponent<BrandsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default BrandsPage

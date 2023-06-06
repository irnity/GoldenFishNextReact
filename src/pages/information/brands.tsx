import { FunctionComponent } from "react"
import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"

interface BrandsProps {}

const BrandsPage: FunctionComponent<BrandsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default BrandsPage

import { FunctionComponent } from "react"
import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"

interface PaymentDeliveryProps {}

const PaymentDeliveryPage: FunctionComponent<PaymentDeliveryProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default PaymentDeliveryPage

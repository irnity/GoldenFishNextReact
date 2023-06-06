import { FunctionComponent } from "react"
import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"

interface PaymentDeliveryProps {}

const PaymentDeliveryPage: FunctionComponent<PaymentDeliveryProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default PaymentDeliveryPage

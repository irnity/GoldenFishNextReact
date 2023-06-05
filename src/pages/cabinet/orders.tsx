// react

import Cabinet from "@/features/profile/Cabinet"
import Tab from "@/features/profile/components/userInfo/Tab"
import useAuth from "@/hooks/auth-hook"
import { auth } from "@/services/firebase/firebase"
import { FunctionComponent } from "react"

// css

// redux
import { useSelector } from "react-redux"

interface OrdersPageProps {}

const OrdersPage: FunctionComponent<OrdersPageProps> = () => {
  return (
    <Cabinet>
      <Tab />
    </Cabinet>
  )
}

export default OrdersPage

// react
import Cart from "@/components/screens/profile/components/cart/Cart"
import UserInfo from "@/components/screens/profile/pages/UserInfo"
import { FunctionComponent } from "react"

// css

// redux
import { useSelector } from "react-redux"

interface PersonalInformationPageProps {}

const PersonalInformationPage: FunctionComponent<
  PersonalInformationPageProps
> = () => {
  return (
    <Cart>
      <UserInfo />
    </Cart>
  )
}

export default PersonalInformationPage

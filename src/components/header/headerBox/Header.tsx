import Catalog from "../catalog/Catalog"
import Basket from "../basket/Basket"
import CartHeader from "../card/CartHeader"
import SearchHeader from "../search/SearchHeader"
import ShopName from "../title/ShopName"
import Signup from "../signup/Signup"
import { FunctionComponent } from "react"

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <>
      <CartHeader
        leftSide={
          <>
            <ShopName />
            <SearchHeader />
          </>
        }
        rightSide={
          <>
            <Signup />
            <Basket />
          </>
        }
      />
      <Catalog />
    </>
  )
}

export default Header

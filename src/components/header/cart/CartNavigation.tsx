import { FunctionComponent } from "react"
import NavigationHeader from "../navigation/Navigation"
import classes from "./CartNavigation.module.css"
import ShopName from "../title/ShopName"
import SearchHeader from "../search/SearchHeader"
import Sighup from "../signup/Signup"
import Basket from "../basket/Basket"

interface CartHeaderProps {}

const CartHeader: FunctionComponent<CartHeaderProps> = () => {
  return (
    <>
      <NavigationHeader />

      <div className={classes.cart}>
        {/* left:  */}
        <div className={classes.left}>
          <ShopName />
          <SearchHeader />
        </div>
        {/* right */}
        <div className={classes.right}>
          <Sighup />
          <Basket />
        </div>
      </div>
    </>
  )
}

export default CartHeader

import { FunctionComponent, ReactNode } from "react"
import classes from "./Cart.module.css"
import Information from "@/components/main/information/Information"
import AboutProduct from "../AboutProduct"
import Buy from "../../buy/Buy"
interface CartProps {
  children: ReactNode
}

const Cart: FunctionComponent<CartProps> = (props) => {
  return (
    <div className={classes.cart}>
      <div className={classes.nav}>
        <Information />
        <AboutProduct />
      </div>
      <div className={classes.info}>
        {props.children}
        <Buy />
      </div>
    </div>
  )
}

export default Cart

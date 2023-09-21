import { FunctionComponent, ReactNode } from "react"
import classes from "./Cart.module.css"
import Information from "@/components/elements/information/Information"
import AboutProduct from "../navigation/AboutProduct"
import Buy from "../buy/Buy"
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
        <div
          style={{
            width: "60%",
          }}
        >
          {props.children}
        </div>
        <div
          style={{
            width: "40%",
          }}
        >
          <Buy />
        </div>
      </div>
    </div>
  )
}

export default Cart

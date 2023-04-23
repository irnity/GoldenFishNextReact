import { FunctionComponent } from "react"
import NavigationHeader from "../navigation/NavigationHeader"
import classes from "./CartHeader.module.css"

interface CartHeaderProps {
  leftSide: React.ReactNode
  rightSide: React.ReactNode
}

const CartHeader: FunctionComponent<CartHeaderProps> = ({
  leftSide,
  rightSide,
}) => {
  return (
    <header className={classes.card}>
      <NavigationHeader />

      <div className={classes.card_bottom}>
        <div className={classes.card_bottom_left}>{leftSide}</div>

        <div className={classes.card_bottom_right}>{rightSide}</div>
      </div>
    </header>
  )
}

export default CartHeader

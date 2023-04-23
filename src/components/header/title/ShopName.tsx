import { FunctionComponent } from "react"
import classes from "./ShopName.module.css"

interface ShopNameProps {}

const ShopName: FunctionComponent<ShopNameProps> = () => {
  return (
    <div className={classes.shop}>
      <span className={classes.shop_text}>Golden Fish</span>
    </div>
  )
}

export default ShopName

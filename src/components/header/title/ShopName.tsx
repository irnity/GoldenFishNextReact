import { FunctionComponent } from "react"
import classes from "./ShopName.module.css"

interface ShopNameProps {}

const ShopName: FunctionComponent<ShopNameProps> = () => {
  return (
    <div className={classes.shop}>
      <span>Golden Fish</span>
    </div>
  )
}

export default ShopName

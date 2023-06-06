import { FunctionComponent } from "react"
import classes from "./ShopName.module.css"
import Link from "next/link"

interface ShopNameProps {}

const ShopName: FunctionComponent<ShopNameProps> = () => {
  return (
    <Link href="/" className={classes.shop}>
      <span className={classes.text}>Golden Fish</span>
    </Link>
  )
}

export default ShopName

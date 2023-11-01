import { FunctionComponent } from "react"
import classes from "./ShopName.module.css"
import Link from "next/link"

interface ShopNameProps {}

const ShopName: FunctionComponent<ShopNameProps> = () => {
  return (
    <Link href="/" className={classes.shop}>
      <h1 className={classes.text}>Golden Fish</h1>
    </Link>
  )
}

export default ShopName

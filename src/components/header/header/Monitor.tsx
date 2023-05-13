import { FunctionComponent, useEffect, useState } from "react"

import Catalog from "../catalog/Catalog"
import CartNavigation from "../cart/CartNavigation"
import classes from "./Header.module.css"

interface MonitorProps {}

const Monitor: FunctionComponent<MonitorProps> = () => {
  return (
    <>
      <header className={classes.cart}>
        <CartNavigation />
        <Catalog />
      </header>
    </>
  )
}

export default Monitor

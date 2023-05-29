import { FunctionComponent, useEffect, useState } from "react"

import Catalog from "./catalog/Catalog"
import CartNavigation from "./cartNavigation/CartNavigation"
import classes from "./Monitor.module.css"

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

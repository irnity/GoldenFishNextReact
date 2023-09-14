import { FunctionComponent, useEffect, useState } from "react"

import Catalog from "./catalog/Catalog"
import classes from "./Monitor.module.css"
import NavigationHeader from "../../navigation/Navigation"
import ShopName from "../../shopName/ShopName"
import SearchHeader from "../../search/SearchHeader"
import Sighup from "../../signup/Signup"
import Basket from "../../basket/Basket"

interface MonitorProps {}

const Monitor: FunctionComponent<MonitorProps> = () => {
  return (
    <div className={classes.cart}>
      {/*  */}
      <section className={classes.container}>
        <NavigationHeader />

        <div className={classes.box}>
          <div className={classes.left}>
            <ShopName />
            <SearchHeader />
          </div>

          <div className={classes.right}>
            <Sighup />
            <Basket />
          </div>
        </div>
      </section>

      {/*  */}
      <Catalog />
    </div>
  )
}

export default Monitor

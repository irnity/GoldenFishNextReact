import { type FunctionComponent, useEffect, useState } from 'react'

import Catalog from './catalog/Catalog'
import classes from './Monitor.module.css'
import ShopName from '../../shopName/ShopName'
import SearchHeader from '../../search/SearchHeader'
import Sighup from '../../signup/Signup'
import Basket from '../../basket/Basket'

interface MonitorProps {}

const Monitor: FunctionComponent<MonitorProps> = () => {
  return (
    <div className={classes.cart}>
      <section className={classes.container}>
        <div className={classes.box}>
          <ShopName />
          <SearchHeader />
          <Sighup />
          <Basket />
        </div>
      </section>

      <Catalog />
    </div>
  )
}

export default Monitor
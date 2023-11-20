import React from 'react'

import classes from './Monitor.module.css'
import ShopName from '../../Components/ShopName/ShopName'
import SearchHeader from '../../Components/Search/SearchHeader'
import Sighup from '../../Components/Signup/Signup'
import Basket from '../../Components/Basket/Basket'
import Catalog from '../../Components/Catalog/Catalog'

const Monitor = () => {
  return (
    <div className={classes.cart}>
      <div className={classes.box}>
        <div className={classes.logo}>
          <ShopName />
          <Catalog />
          <SearchHeader />
        </div>
        <div className={classes.nav}>
          <Sighup />
          <Basket />
        </div>
      </div>
    </div>
  )
}

export default Monitor

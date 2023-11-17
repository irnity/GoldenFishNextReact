import React from 'react'

import Catalog from './Catalog/Catalog'
import classes from './Monitor.module.css'
import ShopName from '../../ShopName/ShopName'
import SearchHeader from '../../Search/SearchHeader'
import Sighup from '../../Signup/Signup'
import Basket from '../../Basket/Basket'

const Monitor = () => {
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

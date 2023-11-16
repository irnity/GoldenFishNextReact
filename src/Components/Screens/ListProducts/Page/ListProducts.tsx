// react
import React from 'react'

// route

import classes from './ListProducts.module.css'

import { type IProduct } from '@/redux/model'
import Status from '../components/Filters/Status'
import Information from '@/components/elements/information/Information'
import Products from '../components/Products/Products'
import Sort from '../components/Sorting/Sort'
import PagesNumber from '../components/PagesNumber/PagesNumber'
import Price from '../components/Filters/Price'

interface ListProductsProps {
  products: IProduct[]
  totalProducts?: number | undefined
}

const ListProducts = ({ products, totalProducts }: ListProductsProps) => {
  return (
    <div className={classes.container}>
      <Information />

      <div className={classes.products_container}>
        <section className={classes.filters}>
          <Status />
          <Price />
        </section>

        <section className={classes.products}>
          <Sort />
          <Products products={products} />
          <PagesNumber totalProducts={totalProducts} />
        </section>
      </div>
    </div>
  )
}

export default ListProducts

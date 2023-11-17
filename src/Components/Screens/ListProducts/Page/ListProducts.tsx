// react
import React from 'react'

// route

import classes from './ListProducts.module.css'

import { type IProduct } from '@/Redux/model'
import Status from '../Components/Filters/Status'
import Information from '@/Components/Elements/Information/Information'
import Products from '../Components/Products/Products'
import Sort from '../Components/Sorting/Sort'
import PagesNumber from '../Components/PagesNumber/PagesNumber'
import Price from '../Components/Filters/Price'

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

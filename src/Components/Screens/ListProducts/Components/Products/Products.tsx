import classes from './Products.module.css'
import React from 'react'
import { type IProduct } from '@/redux/model'
import Item from './Item/Item'

interface ProductsProps {
  products: IProduct[]
}

const Products = ({ products }: ProductsProps) => {
  if (products === undefined)
    return (
      <div className={classes.not_found}>
        <h1>Товарів не знайдено</h1>
      </div>
    )

  return (
    <div className={classes.container}>
      {products.map((product) => (
        <Item product={product} key={product.code} />
      ))}
    </div>
  )
}

export default Products

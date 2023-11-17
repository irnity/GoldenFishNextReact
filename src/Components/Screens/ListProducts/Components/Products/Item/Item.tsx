import { type IProduct } from '@/Redux/model'
import Link from 'next/link'
import React, { useState } from 'react'

import classes from './Item.module.css'
import { Rating } from '@mui/material'
import ImageList from '../ImageItem/ImageList'
import colors from '@/Assets/Styles/colors'
import ToggleList from '../ToggleItem/ToggleItem'

interface Props {
  product: IProduct
}

const Item = ({ product }: Props) => {
  const [toggle, setToggle] = useState(false)

  const averageRate = (product.totalRate ?? 0) / (product.totalComments ?? 0)

  const inStock =
    parseInt(product.inStock) > 0 ? 'В наявності' : 'Немає в наявності'

  return (
    <div
      className={classes.container}
      key={product.id}
      onMouseEnter={() => {
        setToggle(true)
      }}
      onMouseLeave={() => {
        setToggle(false)
      }}
    >
      <ImageList product={product} />

      <div className={classes.info_box}>
        <Link
          href={`/products/${product.category}/${product.id}`}
          className={classes.title}
        >
          <h1>{product.title}</h1>
        </Link>

        <Link
          href={`/products/${product.category}/${product.id}/comments`}
          className={classes.comments}
        >
          <Rating readOnly precision={0.5} value={averageRate} size="medium" />

          <span>{product.totalComments} відгуків</span>
        </Link>

        <div className={classes.price}>
          <h1>{product.price} &#8372; </h1>
        </div>
        <div
          className={classes.price}
          style={
            inStock === 'В наявності'
              ? {
                  color: colors.Main_Green_Color,
                }
              : {
                  color: colors.Main_Grey_Color,
                }
          }
        >
          <span>{inStock}</span>
        </div>
      </div>
      {toggle && <ToggleList product={product} />}
    </div>
  )
}

export default Item

import { type IProduct } from '@/Redux/model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import classes from './ImageList.module.css'

interface Props {
  product: IProduct
}

const ImageList = ({ product }: Props) => {
  return (
    <div className={classes.image_box}>
      <Link
        href={`/products/${product.category}/${product.code}`}
        className={classes.link_image}
      >
        <Image
          src={product.image}
          alt={
            'https://cdn.shopify.com/s/files/1/0060/3770/0678/articles/how_to_cast_rod_1200x1200.png?v=1621296605'
          }
          className={classes.image}
          width={1200}
          height={1200}
          priority
        />
      </Link>
    </div>
  )
}

export default ImageList

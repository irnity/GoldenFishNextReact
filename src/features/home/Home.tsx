import Image from "next/image"
import classes from "./Home.module.css"
import { FunctionComponent, useState } from "react"
import { IProduct } from "@/redux/model"
import Link from "next/link"

interface HomeProps {
  products: IProduct[]
  categoryId?: string | string[] | undefined
}

const Home: FunctionComponent<HomeProps> = ({ products, categoryId }) => {
  return (
    <>
      <div className={classes.cart}>
        {products.map((product) => {
          return (
            <div className={classes.product_box} key={product.id}>
              <div className={classes.overflow}>
                <div className={classes.image_box}>
                  <Link
                    href={`${categoryId}/${product.id}`}
                    className={classes.link}
                  >
                    <Image
                      src={product.image}
                      alt={`${product.id}`}
                      className={classes.image}
                      width={185}
                      height={185}
                      priority
                    />
                  </Link>
                </div>

                <div className={classes.info_box}>
                  <div className={classes.code}>Code: {product.code}</div>
                  <div className={classes.title}>
                    <Link
                      href={`${categoryId}/${product.id}`}
                      className={classes.link}
                    >
                      <span>{product.title}</span>
                    </Link>
                  </div>
                  <div className={classes.price}>
                    <span>{product.price} &#8372; </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home

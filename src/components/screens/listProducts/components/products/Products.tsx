import Image from "next/image"
import classes from "./Products.module.css"
import { FunctionComponent } from "react"
import { IProduct } from "@/redux/model"
import Link from "next/link"

interface ProductsProps {
  products: IProduct[]
}

const Products: FunctionComponent<ProductsProps> = ({ products }) => {
  return (
    <div className={classes.cart}>
      {products.map((product) => {
        return (
          <div className={classes.product_box} key={product.id}>
            <div className={classes.overflow}>
              <div className={classes.image_box}>
                <Link
                  // /product/fishingrod/1usplQtRf062sApo5ba2
                  // /products/fishingrod/1usplQtRf062sApo5ba2
                  href={`/products/${product.category}/${product.id}`}
                  className={classes.link_image}
                >
                  <Image
                    src={product.image}
                    alt={
                      "https://cdn.shopify.com/s/files/1/0060/3770/0678/articles/how_to_cast_rod_1200x1200.png?v=1621296605"
                    }
                    className={classes.image}
                    width={200}
                    height={200}
                    priority
                  />
                </Link>
              </div>

              <div className={classes.info_box}>
                <div className={classes.code}>Code: {product.code}</div>
                <div className={classes.title}>
                  <Link
                    href={`/products/${product.category}/${product.id}`}
                    className={classes.link_text}
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
  )
}

export default Products

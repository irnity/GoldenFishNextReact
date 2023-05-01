// react
import { FunctionComponent } from "react"

// redux
import { useSelector } from "react-redux"

// route
import Link from "next/link"
import AddProductButton from "../addProductButton/AddProductButton"

import classes from "./ListProducts.module.css"

import { ProductSliceProps } from "../../../store/model"
import { useRouter } from "next/router"
import Image from "next/image"

import { ProductList } from "../../../store/model"

interface ListProductsProps {
  data: ProductList[]
}

const ListProducts: FunctionComponent<ListProductsProps> = (props) => {
  const products = props.data

  const { isAdmin } = useSelector(
    (state: { auth: { isLogedIn: boolean; isAdmin: boolean } }) => state.auth
  )

  const router = useRouter()

  const { categoryId } = router.query

  return (
    <div className={classes.products_list}>
      <div className={classes.product_list_top}>
        <div className={classes.products_list_name}>
          <p className={classes.products_list_name_text}>Назва Товару</p>
        </div>

        {isAdmin && <AddProductButton />}
      </div>

      <div className={classes.products_list_products}>
        {products.map((product) => {
          return (
            <div className={classes.product} key={product.id}>
              <div className={classes.product_image}>
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
                    // fill
                    priority
                  />
                </Link>
              </div>

              <div className={classes.product_text}>
                <div className={classes.product_text_code}>
                  Code: {product.code}
                </div>
                <div className={classes.product_text_title}>
                  <Link
                    href={`${categoryId}/${product.id}`}
                    className={classes.link}
                  >
                    {product.title}
                  </Link>
                </div>
                <div className={classes.product_text_price}>
                  {product.price} грн.
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListProducts

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
          <p className={classes.products_list_name_text}>{categoryId}</p>
        </div>
        <div className={classes.products_list_button}>
          {isAdmin && <AddProductButton />}
        </div>
      </div>

      <div className={classes.products_list_products}>
        <div className={classes.find}>
          <div className={classes.find_box}>
            <div className={classes.find_box_text}>
              <span>Відбір за ярликами</span>
            </div>
            <div className={classes.find_box_option}>
              <div>
                <input type="checkbox" />
                <span>Новинка</span>
              </div>
              <div>
                <input type="checkbox" />
                <span>Нове надходження</span>
              </div>
              <div>
                <input type="checkbox" />
                <span>Суперціна</span>
              </div>
              <div>
                <input type="checkbox" />
                <span>Хіт</span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.list}>
          <div className={classes.sort_box}>
            <div className={classes.sort}>
              <div className={classes.sort_left}>
                <div>Сортувати</div>
                <div>Список</div>
              </div>
              <div className={classes.sort_right}>
                <div>Вигляд</div>
                <div>Список</div>
              </div>
            </div>
          </div>
          <div className={classes.products}>
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
      </div>
    </div>
  )
}

export default ListProducts

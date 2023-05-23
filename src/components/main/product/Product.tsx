// css
import classes from "./Product.module.css"

// Redux

import { productsActions } from "../../../store/productsSlice"
import { basketActions } from "../../../store/basketSlice"

// Components
import AboutProduct from "./about/AboutProduct"

// TS
import { FunctionComponent } from "react"
import { useDispatch } from "react-redux"
import { IProduct } from "@/store/model"
import Information from "../information/Information"
import { useRouter } from "next/router"

interface ProductProps {
  product: IProduct
}

const Product: FunctionComponent<ProductProps> = ({ product }) => {
  console.log(product)
  const dispatch = useDispatch()

  function startDeleteHandler() {
    const procced = window.confirm("Are you sure?")

    // submit delete
    // dispath update
    if (procced) {
      dispatch(productsActions.removeProduct())
    }
  }

  const addProductToBasket = () => {
    dispatch(basketActions.addToBasket(product))
  }

  return (
    <div className={classes.product_box}>
      <Information />
      <AboutProduct />

      <div className={classes.product_top}>
        <div className={classes.product_image}>
          <img src={product.image} alt="" className={classes.image} />
        </div>

        <div className={classes.product_text}>
          <div className={classes.product_text_top}>
            <div>
              {/* product name */}
              <p>{product.title}</p>
            </div>
            <div className={classes.product_text_top_code}>
              {/* id */}
              <p>Код товару: {product.code || "code"}</p>
            </div>
          </div>
          <div className={classes.product_text_mid}>
            <div className={classes.product_text_mid_top}>
              {/* check if in stock */}
              {product.inStock >= "1" ? (
                <span>В наявності</span>
              ) : (
                <span>Немає в наявності</span>
              )}
            </div>
            <div className={classes.product_text_mid_top}>
              <span>Ціна: {product.price}₴</span>
            </div>
            <div className={classes.product_text_mid_top}>
              <button onClick={addProductToBasket}>Додати В кошик</button>
              <button onClick={startDeleteHandler}>Видалити</button>
            </div>
          </div>
          <div className={classes.product_text_bottom}>
            <div>Опис: {product.description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product

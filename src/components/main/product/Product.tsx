// css
import classes from "./Product.module.css"

// Redux
import { useDispatch } from "react-redux/es/exports"
import { productsActions } from "../../../store/productsSlice"
import { basketActions } from "../../../store/basketSlice"

// Components
import AboutProduct from "../about/AboutProduct"

// TS
import { FunctionComponent } from "react"

interface ProductProps {}

const Product: FunctionComponent<ProductProps> = () => {
  const dispatch = useDispatch()

  function startDeleteHandler() {
    const procced = window.confirm("Are you sure?")

    // submit delete
    // dispath update
    if (procced) {
      dispatch(productsActions.removeProduct())
    }
  }

  const addProductToBasket = () => {}

  return (
    <div className={classes.product_box}>
      <div className={classes.product_top}>
        <div className={classes.product_image}></div>

        <div className={classes.product_text}>
          <div className={classes.product_text_top}>
            <div>{/* product name */}</div>
            <div className={classes.product_text_top_code}>{/* id */}</div>
          </div>
          <div className={classes.product_text_mid}>
            <div className={classes.product_text_mid_top}>
              {/* check if in stock */}
            </div>
            <div className={classes.product_text_mid_top}></div>
            <div className={classes.product_text_mid_top}>
              <button onClick={addProductToBasket}>Додати В кошик</button>
              <button onClick={startDeleteHandler}>Видалити</button>
            </div>
          </div>
          <div className={classes.product_text_bottom}></div>
        </div>
      </div>
      <AboutProduct />
    </div>
  )
}

export default Product

// css
import classes from "./Product.module.css"

// react
import { FunctionComponent } from "react"

// Redux
import { productsActions } from "@/redux/productsSlice"
import { basketActions } from "@/redux/basketSlice"
import { IProduct } from "@/redux/model"
import { useDispatch, useSelector } from "react-redux"

// Components
import AboutProduct from "./about/AboutProduct"
import Information from "@/components/information/Information"
import useBasket from "@/hooks/basket-hook"
import Image from "next/image"
import LinkProductButton from "@/components/linkProductButton/LinkProductButton"

interface ProductProps {}
const Product: FunctionComponent<ProductProps> = () => {
  const dispatch = useDispatch()

  const product = useSelector(
    (state: { product: { product: IProduct } }) => state.product.product
  )

  const { addProductToBasket } = useBasket()

  function startDeleteHandler() {
    const procced = window.confirm("Are you sure?")
    if (procced) {
      dispatch(productsActions.removeProduct())
    }
  }

  return (
    <div className={classes.cart}>
      <Information />
      <AboutProduct />

      <div className={classes.block}>
        <div className={classes.cart_image}>
          <Image
            src={product.image}
            width={400}
            height={400}
            alt="fishing product image"
            className={classes.image}
          />
        </div>

        <div className={classes.cart_text}>
          <div className={classes.text_block}>
            <div className={classes.text}>
              <p>{product.title}</p>
            </div>
            <div className={classes.text}>
              <span>Код товару: {product.code || "code"}</span>
            </div>
          </div>
          <div className={classes.text_block}>
            <div className={classes.text}>
              {product.inStock >= "1" ? (
                <span>В наявності</span>
              ) : (
                <span>Немає в наявності</span>
              )}
            </div>
            <div className={classes.text}>
              <span>Ціна: {product.price}₴</span>
            </div>
            <div className={classes.buttons}>
              <LinkProductButton
                button={() => addProductToBasket(product)}
                text="Додати В кошик"
              />
              <LinkProductButton button={startDeleteHandler} text="Видалити" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product

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
import AboutProduct from "../../components/navigation/AboutProduct"
import Information from "@/components/elements/information/Information"
import useBasket from "@/hooks/basket-hook"
import Image from "next/image"
import { useRouter } from "next/router"
import useProduct from "../../hooks/useProduct"
import Link from "next/link"
import CustomButton from "@/components/elements/customButton/CustomButton"
import Comments from "../comments/Comments"
import Characteristics from "../characteristics/Characteristics"

interface ProductProps {
  data: any
  commentsCount: number
  commentsData: any
}
const Product: FunctionComponent<ProductProps> = ({
  data,
  commentsCount,
  commentsData,
}) => {
  const dispatch = useDispatch()

  const router = useRouter()
  const { categoryId, itemId } = router.query

  const product = useSelector(
    (state: { product: { product: IProduct } }) => state.product.product
  )

  const { deleteProductHandler } = useProduct({
    itemId: itemId as string,
    categoryId: categoryId as string,
  })

  const { addProductToBasket } = useBasket()

  const { isLogedIn, isAdmin, userInfo } = useSelector(
    (state: {
      auth: { isLogedIn: boolean; isAdmin: boolean; userInfo: string }
    }) => state.auth
  )

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
              <Link href={`/products/${categoryId}/${itemId}/comments`}>
                <p>Відгуки: {commentsCount}</p>
              </Link>
            </div>
            <div className={classes.text}>
              <span>Код товару: {product.code || "code"}</span>
            </div>
          </div>
          <div className={classes.text_block}>
            <div className={classes.text}>
              <span>{product.price}₴</span>
            </div>
            <div className={classes.text}>
              {product.inStock >= "1" ? (
                <span>В наявності</span>
              ) : (
                <span>Немає в наявності</span>
              )}
            </div>
            <div className={classes.buttons}>
              <CustomButton
                type="button"
                handler={() => addProductToBasket(product)}
                text="Додати В кошик"
                color="#4285f4"
              />
              {isAdmin && (
                <CustomButton
                  type="button"
                  handler={deleteProductHandler}
                  text="Видалити"
                  color="red"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.detailsContainer}>
          <Characteristics characteristics={data} />
        </div>
        <div className={classes.commentsContainer}>
          <Comments data={commentsData} />
        </div>
      </div>
    </div>
  )
}

export default Product

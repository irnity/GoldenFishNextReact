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
import ProductsList from "@/pages/products/[categoryId]"

interface ProductProps {
  data: IProduct
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

        <div className={classes.information_container}>
          {/* title */}
          <div className={classes.product_title_container}>
            <span>{product.title}</span>
          </div>

          {/* rate & code */}
          <div className={classes.rate_and_code_container}>
            <Link
              href={`/products/${categoryId}/${itemId}/comments`}
              className={classes.rate}
            >
              <span>Відгуки: {commentsCount}</span>
            </Link>
            <div className={classes.code}>
              <span>Код товару: {product.code || "code"}</span>
            </div>
          </div>

          {/* price & buy button */}
          <div className={classes.price_buy_container}>
            <div className={classes.price}>
              <h2>{product.price}₴</h2>
              {Number(product.inStock) >= 1 ? (
                <span className={classes.isStock}>В наявності</span>
              ) : (
                <span className={classes.outStock}>Немає в наявності</span>
              )}
            </div>
            <div className={classes.buy}>
              <CustomButton
                type="button"
                handler={() => addProductToBasket(product)}
                text="Додати В кошик"
                color="#4285f4"
              />
            </div>
          </div>
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
      <div className={classes.container}>
        <div className={classes.detailsContainer}>
          <div>
            <h2>Опис</h2>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              consectetur eos labore laudantium. Magni maiores praesentium
              molestias, ea quo, unde blanditiis, vitae possimus quisquam culpa
              dignissimos labore aspernatur distinctio et?
            </span>
          </div>
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

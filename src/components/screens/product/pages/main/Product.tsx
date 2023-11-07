// css
import classes from "./Product.module.css"

// react
import { FunctionComponent, useEffect, useState } from "react"
import useApi from "@/hooks/api-hook"
import useProduct from "../../hooks/useProduct"
import useBasket from "@/hooks/basket-hook"

// Redux
import { IProduct } from "@/redux/model"
import { useDispatch, useSelector } from "react-redux"

// NEXT
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

// Components
import AboutProduct from "../../components/navigation/AboutProduct"
import Information from "@/components/elements/information/Information"
import CustomButton from "@/components/elements/customButton/CustomButton"
import Comments from "../comments/Comments"
import Characteristics from "../characteristics/Characteristics"
import { Rating } from "@mui/material"
import { FiHeart } from "react-icons/fi"

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
  const { isLogedIn, isAdmin, userInfo } = useSelector(
    (state: {
      auth: {
        isLogedIn: boolean
        isAdmin: boolean
        userInfo: { email: string }
      }
    }) => state.auth
  )
  const { deleteProductHandler } = useProduct({
    itemId: itemId as string,
    categoryId: categoryId as string,
  })

  const { addProductToBasket } = useBasket()
  const { productInFavorite, productHandler } = useApi(data.code)

  const [averageRate, setAverageRate] = useState(0)
  const [inStock, setInStock] = useState("Немає в наявності")

  useEffect(() => {
    setAverageRate(data.totalRate / data.totalComments || 0)
    setInStock(data.inStock ? "В наявності" : "Немає в наявності")
  }, [data.inStock, data.totalComments, data.totalRate])

  return (
    <div className={classes.cart}>
      <Information />
      <AboutProduct />

      <div className={classes.block}>
        <div className={classes.cart_image}>
          <Image
            src={data.image}
            width={400}
            height={400}
            alt="fishing product image"
            className={classes.image}
          />
        </div>

        <div className={classes.information_container}>
          {/* title */}
          <div className={classes.title_container}>
            <h1 className={classes.title}>{data.title}</h1>
          </div>

          {/* rate & code */}
          <div className={classes.rate_and_code_container}>
            <Link
              href={`/products/${categoryId}/${itemId}/comments`}
              className={classes.rate}
            >
              <Rating
                readOnly
                precision={0.5}
                value={averageRate}
                size="small"
              />

              <p>Відгуки: {commentsCount}</p>
            </Link>
            <div className={classes.code_container}>
              <span>Код товару: {data.code || "code"}</span>
            </div>
          </div>

          {/* price & buy button */}
          <div className={classes.price_buy_container}>
            <div className={classes.price}>
              <div>
                <h2>{data.price}₴</h2>
                <div className={classes.favorite}>
                  <FiHeart
                    fill={productInFavorite ? "rgba(33, 150, 243, 1)" : "white"}
                    color="rgba(33, 150, 243, 1)"
                    onClick={productHandler}
                    size={25}
                  />
                </div>
              </div>
              {inStock ? (
                <span className={classes.isStock}>В наявності</span>
              ) : (
                <span className={classes.outStock}>Немає в наявності</span>
              )}
            </div>
            <div className={classes.buy}>
              <CustomButton
                type="button"
                handler={() => addProductToBasket(data)}
                text="Додати В кошик"
                color="rgba(33, 150, 243, 1)"
                backGroundColor="white"
              />
            </div>
          </div>
          {isAdmin && (
            <CustomButton
              type="button"
              handler={deleteProductHandler}
              text="Видалити"
              color="red"
              backGroundColor="white"
            />
          )}
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.detailsContainer}>
          <div className={classes.description_container}>
            <h1>Опис</h1>
            <span>{data.description}</span>
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

// css
import classes from './Product.module.css'

// react
import React, { useEffect, useState } from 'react'
import useApi from '@/Hooks/api-hook'
import useProduct from '../../Hook/useProduct'
import useBasket from '@/Hooks/basket-hook'

// Redux
import { type IAuth, type IProduct } from '@/Redux/model'
import { useSelector } from 'react-redux'

// NEXT
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

// Components
import AboutProduct from '../../Components/Navigation/AboutProduct'
import Information from '@/Components/Elements/Information/Information'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import Comments from '../Comments/Comments'
import Characteristics from '../Characteristics/Characteristics'
import { Rating } from '@mui/material'
import { FiHeart } from 'react-icons/fi'

interface ProductProps {
  data: IProduct
  commentsCount: number
  commentsData: any
}
const Product = ({ data, commentsCount, commentsData }: ProductProps) => {
  const router = useRouter()

  const { categoryId, itemId } = router.query as {
    categoryId: string
    itemId: string
  }
  const { isAdmin } = useSelector((state: { auth: IAuth }) => state.auth)
  const { deleteProductHandler } = useProduct({
    itemId,
    categoryId,
  })

  const { addProductToBasket } = useBasket()
  const { productInFavorite, productHandler } = useApi(data.code)

  const [averageRate, setAverageRate] = useState(0)
  const [inStock, setInStock] = useState('Немає в наявності')

  useEffect(() => {
    setAverageRate(data.totalRate ?? 0 / data.totalComments ?? 0)
    setInStock(parseInt(data.inStock) > 0 ? 'В наявності' : 'Немає в наявності')
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
              <span>Код товару: {data.code ?? 'code'}</span>
            </div>
          </div>

          {/* price & buy button */}
          <div className={classes.price_buy_container}>
            <div className={classes.price}>
              <div>
                <h2>{data.price}₴</h2>
                <div className={classes.favorite}>
                  <FiHeart
                    fill={productInFavorite ? 'rgba(33, 150, 243, 1)' : 'white'}
                    color="rgba(33, 150, 243, 1)"
                    onClick={productHandler}
                    size={25}
                  />
                </div>
              </div>
              {inStock === 'В наявності' ? (
                <span className={classes.isStock}>В наявності</span>
              ) : (
                <span className={classes.outStock}>Немає в наявності</span>
              )}
            </div>
            <div className={classes.buy}>
              <CustomButton
                type="button"
                handler={() => {
                  addProductToBasket(data)
                }}
                text="Додати В кошик"
                color="rgba(33, 150, 243, 1)"
                backGroundColor="white"
              />
            </div>
          </div>
          {isAdmin && (
            <CustomButton
              type="button"
              handler={() => {
                void deleteProductHandler()
              }}
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

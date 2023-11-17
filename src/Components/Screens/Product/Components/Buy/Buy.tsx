import React from 'react'
import classes from './Buy.module.css'
import { type IProduct } from '@/Redux/model'
import useBasket from '@/Hooks/basket-hook'
import Image from 'next/image'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import { FiHeart } from 'react-icons/fi'
import useApi from '@/Hooks/api-hook'

interface BuyProps {
  product: IProduct
}

const Buy = ({ product }: BuyProps) => {
  const { addProductToBasket } = useBasket()
  const { productInFavorite, productHandler } = useApi(product.code)
  return (
    <div className={classes.buy}>
      <div className={classes.image}>
        <div>
          <Image src={product.image} alt="none" width={96} height={96} />
        </div>
        <div className={classes.image_text}>
          <span>{product.title}</span>
        </div>
      </div>
      <div className={classes.buttons}>
        <div className={classes.top_buttons}>
          <div>
            <h1>{product.price}₴</h1>
            <p>
              {product.inStock === 'В наявності'
                ? 'В наявності'
                : 'Немає в наявності'}
            </p>
          </div>
          <div className={classes.favorite}>
            <FiHeart
              fill={productInFavorite ? 'rgba(33, 150, 243, 1)' : 'white'}
              color="rgba(33, 150, 243, 1)"
              onClick={productHandler}
              size={25}
            />
          </div>
        </div>

        <div className={classes.bottom_buttons}>
          <CustomButton
            type="button"
            handler={() => {
              addProductToBasket(product)
            }}
            text="Купити"
            color="white"
            backGroundColor="#2196F3"
          />
        </div>
      </div>
    </div>
  )
}

export default Buy

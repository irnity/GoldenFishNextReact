import { type FunctionComponent } from 'react'
import classes from './Buy.module.css'
import { useSelector } from 'react-redux'
import { type IProduct } from '@/redux/model'
import useBasket from '@/hooks/basket-hook'
import Image from 'next/image'
import CustomButton from '@/components/elements/customButton/CustomButton'
import { FiHeart } from 'react-icons/fi'
import useApi from '@/hooks/api-hook'

interface BuyProps {
  product: IProduct
}

const Buy: FunctionComponent<BuyProps> = ({ product }) => {
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
            <p>{product.inStock ? 'В наявності' : 'Немає в наявності'}</p>
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

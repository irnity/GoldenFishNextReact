import React from 'react'
import classes from './BasketOverlay.module.css'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import { type IBasketSliceProps } from '@/Redux/model'
import { basketActions } from '@/Redux/basketSlice'

interface Props {
  onConfirm: () => void
}

const BasketOverlay = ({ onConfirm }: Props) => {
  const dispatch = useDispatch()

  const router = useRouter()

  const basketReduxState = useSelector(
    (state: { basket: IBasketSliceProps }) => state.basket
  )

  const clearBasketHandler = () => {
    dispatch(basketActions.clearBasket())
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>Кошик</h1>
        <button className={classes.cancel_button}>
          <FiX size={30} onClick={onConfirm} />
        </button>
      </div>

      <div className={classes.main}>
        <div className={classes.items}>
          {basketReduxState.basket.map((product) => (
            <div key={product.code} className={classes.item}>
              <div className={classes.top}>
                <div className={classes.image}>
                  <Image
                    src={product.image}
                    alt="product"
                    width={100}
                    height={100}
                  />
                </div>
                <div className={classes.title}>
                  <h1>{product.title}</h1>
                </div>
              </div>
              <div className={classes.bottom}>
                <div className={classes.amount}>
                  <button>-</button>
                  <h1>{product.amountToBuy}</h1>
                  <button>+</button>
                </div>
                <div className={classes.price}>
                  <h1>{product.totalPrice}&#8372;</h1>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={classes.totalPrice}>
          <div className={classes.continue}>
            <CustomButton
              type="button"
              handler={() => {}}
              text="Продовжити покупки"
            />
          </div>

          <div className={classes.totalPrice_right}>
            <h1>{basketReduxState.totalPrice}&#8372; </h1>
            <CustomButton
              type="button"
              handler={() => {
                void router.push('/order')
              }}
              text="Оформити замовлення"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasketOverlay

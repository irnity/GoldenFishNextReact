import classes from './ModalOverlay.module.css'
import React, { type FunctionComponent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import { basketActions } from '@/Redux/basketSlice'
import { type IBasketSliceProps } from '@/Redux/model'
import Order from '@/Components/Screens/Order/Order'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'

interface ModalOverlayProps {
  onConfirm: () => void
}

const ModalOverlay: FunctionComponent<ModalOverlayProps> = ({ onConfirm }) => {
  const dispatch = useDispatch()

  const router = useRouter()

  const basket = useSelector(
    (state: { basket: IBasketSliceProps }) => state.basket.basket
  )
  const totalPrice = useSelector(
    (state: { basket: { totalPrice: number } }) => state.basket.totalPrice
  )
  const clearBasketHandler = () => {
    dispatch(basketActions.clearBasket())
  }
  return (
    <div className={classes.modal}>
      <div className={classes.box}>
        <div className={classes.header}>ВИ ДОДАЛИ ТОВАР У КОШИК</div>

        <div className={classes.main}>
          <Order basket={basket} />
        </div>

        <div className={classes.footer}>
          <div className={classes.footer_continue}>
            <span>Всього: {totalPrice}</span>
          </div>
          <div className={classes.footer_continue}>
            <CustomButton
              type="button"
              handler={onConfirm}
              text="Продовжити покупки"
            />
            <CustomButton
              type="button"
              handler={clearBasketHandler}
              text="Очистити корзину"
            />
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

export default ModalOverlay

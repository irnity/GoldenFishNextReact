import classes from "./ModalOverlay.module.css"
import React, { FunctionComponent } from "react"
import { useSelector, useDispatch } from "react-redux"
import { IBasketSliceProps } from "../../../../redux/model"
import { basketActions } from "../../../../redux/basketSlice"
import Link from "next/link"
import Order from "@/features/order/Order"
import LinkProductButton from "@/components/linkProductButton/LinkProductButton"

interface ModalOverlayProps {
  onConfirm: () => void
}

const ModalOverlay: FunctionComponent<ModalOverlayProps> = ({ onConfirm }) => {
  const dispatch = useDispatch()

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
            <LinkProductButton button={onConfirm} text="Продовжити покупки" />
            <LinkProductButton
              button={clearBasketHandler}
              text="Очистити корзину"
            />
            <LinkProductButton
              href="/order"
              button={onConfirm}
              text="Оформити замовлення"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalOverlay

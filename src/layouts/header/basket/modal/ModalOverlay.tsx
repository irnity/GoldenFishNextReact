import classes from "./ModalOverlay.module.css"
import React, { FunctionComponent } from "react"
import { useSelector, useDispatch } from "react-redux"
import { IBasketSliceProps } from "../../../../redux/model"
import { basketActions } from "../../../../redux/basketSlice"
import Link from "next/link"
import Order from "@/components/screens/order/Order"
import CustomButton from "@/components/elements/customButton/CustomButton"
import { useRouter } from "next/router"

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
              handler={() => router.push("/order")}
              text="Оформити замовлення"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalOverlay

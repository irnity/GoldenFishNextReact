import React from 'react'
import classes from './OrderSubmit.module.css'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import { useSelector } from 'react-redux'
import { type IBasketSliceProps } from '@/Redux/model'

const OrderSubmit = () => {
  const basketReduxState = useSelector(
    (state: { basket: IBasketSliceProps }) => state.basket
  )
  return (
    <div className={classes.order_information}>
      <div>
        <h1>Разом</h1>
      </div>
      <div>
        <span>{basketReduxState.totalNumber} товар на суму</span>
        <span>{basketReduxState.totalPrice}₴</span>
      </div>
      <div>
        <span>Вартість доставки</span>
        <span>за тарифами перевізника</span>
      </div>
      <div>
        <span>До сплати</span>
        <span>{basketReduxState.totalPrice}₴</span>
      </div>
      <div>
        <CustomButton type="submit" text="Замовлення підтверджую" />
      </div>
    </div>
  )
}

export default OrderSubmit

import React from 'react'
import classes from './OrderItems.module.css'
import { useSelector } from 'react-redux'
import { type IBasketSliceProps } from '@/Redux/model'
import Image from 'next/image'

const OrderItems = () => {
  const basketReduxState = useSelector(
    (state: { basket: IBasketSliceProps }) => state.basket
  )
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Замовлення</h1>
        <span>на суму: {basketReduxState.totalPrice} ₴</span>
      </div>
      <div className={classes.list}>
        {basketReduxState.basket.length !== 0 &&
          basketReduxState.basket.map((item) => (
            <div className={classes.item} key={item.code}>
              <div className={classes.image}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                />
              </div>
              <div className={classes.name}>
                <span>{item.title}</span>
              </div>
              <div className={classes.price}>
                <span>
                  {item.price}₴ x {item.amountToBuy}
                </span>
              </div>
              <div className={classes.totalPrice}>
                <span>{item.totalPrice}₴</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default OrderItems

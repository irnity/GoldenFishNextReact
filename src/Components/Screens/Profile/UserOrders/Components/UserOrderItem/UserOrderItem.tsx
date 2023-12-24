import React, { useState } from 'react'
import classes from './UserOrderItem.module.css'
import { FiArrowRightCircle } from 'react-icons/fi'
import { type IAuth, type IBasketSliceProps } from '@/Redux/model'
import Products from '@/Components/Screens/ListProducts/Components/Products/Products'

interface Props {
  data: {
    id: string
    status: string
    createdAt: string
    products: IBasketSliceProps
    user: IAuth
  }
}

const OrderItem = ({ data }: Props) => {
  const [toggle, setToggle] = useState(false)

  const toggleHandler = () => {
    setToggle((prev) => !prev)
  }

  const inputDate = new Date(data.createdAt)

  const day = inputDate.getUTCDate()
  const month = inputDate.toLocaleString('default', { month: 'long' })
  const year = inputDate.getUTCFullYear()

  const formattedDate = `${day} ${month} ${year}`

  console.log(data.products.basket)

  return (
    <>
      <div className={classes.container} onClick={toggleHandler}>
        <div className={classes.id}>
          <div>#{data.id}</div>
          <div>{data.status}</div>
        </div>
        <div className={classes.date}>
          <div>{formattedDate}</div>
        </div>
        <div className={classes.price}>
          <div>
            {data.products.totalPrice}
            <span>₴</span>
          </div>
          <div>
            <FiArrowRightCircle size={25} />
          </div>
        </div>
      </div>
      {toggle && <Products products={data.products.basket} />}
    </>
  )
}

export default OrderItem

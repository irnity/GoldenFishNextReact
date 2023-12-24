import React, { useState } from 'react'
import classes from './UserOrderItem.module.css'
import { FiArrowDownCircle, FiArrowRightCircle } from 'react-icons/fi'
import { type IAuth, type IBasketSliceProps } from '@/Redux/model'
import Products from '@/Components/Screens/ListProducts/Components/Products/Products'
import { useDispatch, useSelector } from 'react-redux'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/Services/Firebase/firebase'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import { warningActions } from '@/Redux/warningSlice'

interface Props {
  data: {
    id: string
    status: string
    createdAt: string
    products: IBasketSliceProps
    userCredentials: any
  }
}

const OrderItem = ({ data }: Props) => {
  const authReduxState = useSelector((state: { auth: IAuth }) => state.auth)
  const [toggle, setToggle] = useState(false)
  const dispatch = useDispatch()

  const toggleHandler = () => {
    setToggle((prev) => !prev)
  }

  const inputDate = new Date(data.createdAt)

  const day = inputDate.getUTCDate()
  const month = inputDate.toLocaleString('default', { month: 'long' })
  const year = inputDate.getUTCFullYear()

  const formattedDate = `${day} ${month} ${year}`

  console.log(data)

  const changeStatusHandler = async () => {
    try {
      const orderRef = doc(db, 'orders', data.id)

      await updateDoc(orderRef, {
        status: 'Виконано',
      })

      const userRef = doc(
        db,
        'users',
        data.userCredentials.email,
        'createdOrder',
        data.id
      )

      await updateDoc(userRef, {
        status: 'Виконано',
      })
      dispatch(
        warningActions.setWarning({ code: 200, message: 'Замовлення виконано' })
      )
    } catch (error) {
      console.log(error)
      dispatch(
        warningActions.setWarning({ code: 500, message: 'Помилка сервера' })
      )
    }
  }

  return (
    <div className={classes.box}>
      <div className={classes.container} onClick={toggleHandler}>
        <div
          className={
            data.status === 'В обробці' ? classes.yellow : classes.green
          }
        ></div>
        <div className={classes.id}>
          <div>Номер замовлення: {data.id}</div>
          <div>Стан замовлення: {data.status}</div>
        </div>
        <div className={classes.date}>
          <div>Дата оформлення: {formattedDate}</div>
        </div>
        <div className={classes.price}>
          <div>
            Ціна: {data.products.totalPrice}
            <span>₴</span>
          </div>
          <div>
            {toggle ? (
              <FiArrowDownCircle size={25} />
            ) : (
              <FiArrowRightCircle size={25} />
            )}
          </div>
        </div>
      </div>
      {toggle && (
        <>
          <div className={classes.products}>
            <h1>Товари</h1>
            <Products products={data.products.basket} />
          </div>
          <div className={classes.info}>
            <div>
              <h1>
                {data.userCredentials.firstName} {data.userCredentials.lastName}
              </h1>
            </div>
            <div>
              <span>Телефон: {data.userCredentials.phoneNumber}</span>
            </div>
            <div>
              <span>Електронна пошта: {data.userCredentials.email}</span>
            </div>
            <div>
              <span>Адреса: {data.userCredentials.address}</span>
            </div>
            <div>
              <span>Спосіб оплати: {data.userCredentials.paymentType}</span>
            </div>
            {authReduxState.isAdmin && (
              <div>
                <CustomButton
                  type="button"
                  handler={() => {
                    void changeStatusHandler
                  }}
                  text="Виконано"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default OrderItem

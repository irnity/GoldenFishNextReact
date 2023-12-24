import React, { useEffect, useState } from 'react'
import classes from './UserOrders.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { type IAuth } from '@/Redux/model'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/Services/Firebase/firebase'
import { warningActions } from '@/Redux/warningSlice'
import OrderItem from '../Components/UserOrderItem/UserOrderItem'

const UserOrders = () => {
  const [data, setData] = useState([])

  const dispatch = useDispatch()

  const authReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  useEffect(() => {
    if (
      authReduxState.email === undefined ||
      authReduxState.email === '' ||
      authReduxState.email === null
    ) {
      return
    }
    const ordersCollectionRef = collection(
      db,
      'users',
      authReduxState.email,
      'createdOrder'
    )

    const fetch = async () => {
      try {
        const ordersCollection = await getDocs(ordersCollectionRef)

        const orders = ordersCollection.docs.map((doc) => doc.data()) as any

        console.log('Orders:', orders)
        setData(orders)
      } catch (error) {
        dispatch(
          warningActions.setWarning({
            code: 500,
            message: 'Помилка завантаження',
          })
        )
      }
    }

    void fetch()
  }, [authReduxState])

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Замовлення</h1>
      </div>
      <div className={classes.orders}>
        {data.map((item, index) => (
          <OrderItem key={index} data={item} />
        ))}
      </div>
    </div>
  )
}

export default UserOrders

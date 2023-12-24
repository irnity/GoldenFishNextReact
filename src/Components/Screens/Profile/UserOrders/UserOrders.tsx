import React, { useState, useEffect } from 'react'
import classes from './UserOrders.module.css'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/Services/Firebase/firebase'
import { type IAuth } from '@/Redux/model'
import { useSelector } from 'react-redux'
import OrderItem from './Components/UserOrderItem/UserOrderItem'

const UserOrders = () => {
  const authReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  const [orders, setOrders] = useState<any>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (
      authReduxState.email === undefined ||
      authReduxState.email === '' ||
      authReduxState.email === null
    ) {
      return
    }
    setLoading(true)

    let ordersRef = collection(
      db,
      'users',
      authReduxState.email,
      'createdOrder'
    )

    if (authReduxState.isAdmin) {
      ordersRef = collection(db, 'orders')
    }
    const fetchOrders = async () => {
      try {
        const orderCollection = await getDocs(ordersRef)

        const data = orderCollection.docs.map((doc) => doc.data()) as any[]

        setOrders(data)
        console.log(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    void fetchOrders()
  }, [authReduxState.email])

  return (
    <div className={classes.container}>
      <h1>Замовлення</h1>
      {loading ? (
        <div>Завантаження</div>
      ) : (
        orders.map((order: any) => {
          return <OrderItem data={order} key={order.id} />
        })
      )}
    </div>
  )
}

export default UserOrders

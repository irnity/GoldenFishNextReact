import React, { useState, useEffect } from 'react'
import classes from './UserOrders.module.css'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/Services/Firebase/firebase'
import { IAuth } from '@/Redux/model'
import { useSelector } from 'react-redux'
import Products from '../../ListProducts/Components/Products/Products'

type Props = {}

const UserOrders = (props: Props) => {
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

        const data = orderCollection.docs.map((doc) => doc.data()) as Array<any>

        setOrders(data)
        console.log(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchOrders()
  }, [authReduxState.email])

  return (
    <div>
      <h1>Замовлення</h1>
      {loading ? (
        <div>Завантаження</div>
      ) : (
        orders.map((order: any) => {
          return (
            <div className={classes.order}>
              <div className={classes.order__header}>
                <div className={classes.order__header__id}>
                  <span className={classes.order__header__id__text}>
                    Замовлення №
                  </span>
                  <span className={classes.order__header__id__number}>
                    {order.id}
                  </span>
                </div>
                <div className={classes.order__header__date}>
                  <span className={classes.order__header__date__text}>
                    Дата замовлення:
                  </span>
                  <span className={classes.order__header__date__number}>
                    {/* {order.createdAt} */}
                  </span>
                </div>
              </div>
              <div className={classes.order__body}>
                <div>Товари:</div>
                <div className={classes.order__body__products}>
                  <Products products={order.products.basket} />
                </div>
                <div className={classes.order__body__total}>
                  <div className={classes.order__body__total__text}>
                    Загальна сума: {order.products.totalPrice} грн
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default UserOrders

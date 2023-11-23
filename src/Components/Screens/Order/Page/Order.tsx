import React from 'react'
import classes from './Order.module.css'
import OrderUserCredentials from '../Components/OrderUserCredentials/OrderUserCredentials'
import OrderItems from '../Components/OrderItems/OrderItems'
import OrderLocation from '../Components/OrderLocation/OrderLocation'
import OrderPayment from '../Components/OrderPayment/OrderPayment'
import OrderSubmit from '../Components/OrderSubmit/OrderSubmit'
import useOrderHook from '../Hook/useOrderHook'

const Order = () => {
  const {
    userCredentials,

    firstNameHandler,
    lastNameHandler,
    phoneNumberHandler,
    addressHandler,
    emailHandler,
    paymentTypeHandler,

    formOrder,
  } = useOrderHook()

  return (
    <div className={classes.container}>
      <div className={classes.container_title}>
        <h1 className={classes.title}>Оформлення замовлення</h1>
      </div>
      <form
        className={classes.box}
        onSubmit={(event) => {
          void formOrder(event)
        }}
      >
        <div className={classes.form}>
          <OrderUserCredentials
            userCredentials={userCredentials}
            firstNameHandler={firstNameHandler}
            lastNameHandler={lastNameHandler}
            phoneNumberHandler={phoneNumberHandler}
            emailHandler={emailHandler}
          />
          <OrderItems />
          <OrderLocation
            userCredentials={userCredentials}
            addressHandler={addressHandler}
          />
          <OrderPayment paymentTypeHandler={paymentTypeHandler} />
        </div>
        <OrderSubmit />
      </form>
    </div>
  )
}

export default Order

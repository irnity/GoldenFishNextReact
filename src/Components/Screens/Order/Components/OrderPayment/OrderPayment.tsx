import React from 'react'
import classes from './OrderPayment.module.css'

interface Props {
  paymentTypeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const OrderPayment = (props: Props) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Оплата</h1>
      </div>
      <select
        className={classes.payment}
        name="payment"
        id="payment"
        onChange={props.paymentTypeHandler}
      >
        <option value="cash">Оплата при отриманні</option>
        <option value="card">Карткою</option>
      </select>
    </div>
  )
}

export default OrderPayment

import React, { type ReactNode } from 'react'
import classes from './Cart.module.css'
import Information from '@/Components/Elements/Information/Information'
import AboutProduct from '../Navigation/AboutProduct'
import Buy from '../Buy/Buy'
import { type IProduct } from '@/Redux/model'
interface CartProps {
  children: ReactNode
  product: IProduct
}

const Cart = (props: CartProps) => {
  return (
    <div className={classes.cart}>
      <div className={classes.nav}>
        <Information />
        <AboutProduct />
      </div>
      <div className={classes.info}>
        <div
          style={{
            width: '60%',
          }}
        >
          {props.children}
        </div>
        <div
          style={{
            width: '40%',
            position: 'sticky',
            top: '0px',
          }}
        >
          <Buy product={props.product} />
        </div>
      </div>
    </div>
  )
}

export default Cart

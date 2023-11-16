import { type FunctionComponent, type ReactNode } from 'react'
import classes from './Cart.module.css'
import Information from '@/components/elements/information/Information'
import AboutProduct from '../navigation/AboutProduct'
import Buy from '../buy/Buy'
import { type IProduct } from '@/redux/model'
interface CartProps {
  children: ReactNode
  product: IProduct
}

const Cart: FunctionComponent<CartProps> = (props) => {
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

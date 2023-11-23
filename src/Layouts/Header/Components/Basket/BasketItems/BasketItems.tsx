import React from 'react'
import classes from './BasketItems.module.css'
import { basketActions } from '@/Redux/basketSlice'
import { useDispatch, useSelector } from 'react-redux'
import { type IBasketSliceProps } from '@/Redux/model'
import Image from 'next/image'
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi'
import Link from 'next/link'

interface Props {
  handler: () => void
}

const BasketItems = (props: Props) => {
  const dispatch = useDispatch()
  const basketReduxState = useSelector(
    (state: { basket: IBasketSliceProps }) => state.basket
  )

  const lowerAmount = (string: string) => {
    dispatch(basketActions.lowerAmount(string))
  }

  const increaseAmount = (string: string) => {
    dispatch(basketActions.increaseAmount(string))
  }
  console.log(basketReduxState.basket)
  return (
    <div className={classes.items}>
      {basketReduxState.basket.length > 0 ? (
        basketReduxState.basket.map((product) => (
          <div key={product.code} className={classes.item}>
            <div className={classes.top}>
              <Link
                className={classes.image}
                href={`/products/${product.category}/${product.code}`}
                onClick={props.handler}
              >
                <Image
                  src={product.image}
                  alt="product"
                  width={100}
                  height={100}
                />
              </Link>
              <Link
                className={classes.title}
                href={`/products/${product.category}/${product.code}`}
                onClick={props.handler}
              >
                <span>{product.title}</span>
              </Link>
            </div>
            <div className={classes.bottom}>
              <div className={classes.amount}>
                <button
                  onClick={() => {
                    lowerAmount(product.code)
                  }}
                >
                  <FiMinus size={25} />
                </button>
                <h1>{product.amountToBuy}</h1>
                <button
                  onClick={() => {
                    increaseAmount(product.code)
                  }}
                >
                  <FiPlus size={25} />
                </button>
              </div>
              <div className={classes.price}>
                <h1>{product.totalPrice}&#8372;</h1>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={classes.empty}>
          <h1>Кошик порожній</h1>
          <FiShoppingCart size={40} />
        </div>
      )}
    </div>
  )
}

export default BasketItems

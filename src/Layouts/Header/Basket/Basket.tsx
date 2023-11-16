import { type FunctionComponent, useState } from 'react'
import BasketOverlay from './Overlay'
import classes from './Basket.module.css'
import BasketSVG from '@/assets/svg/BasketSVG'
import { useSelector } from 'react-redux'
import { type IBasketSliceProps } from '@/redux/model'
import { FiShoppingCart } from 'react-icons/fi'

interface BasketProps {}

const Basket: FunctionComponent<BasketProps> = () => {
  const [toggleOverlay, setToggleOverlay] = useState(true)

  const toggleHandler = () => {
    setToggleOverlay((prevState) => !prevState)
  }

  const productCount = useSelector(
    (state: { basket: IBasketSliceProps }) => state.basket.totalNumber
  )

  return (
    <>
      <div className={classes.mainbox}>
        <button onClick={toggleHandler}>
          <FiShoppingCart size={30} />
          <div className={classes.number}>{productCount}</div>
        </button>
      </div>
      {!toggleOverlay && <BasketOverlay onConfirm={toggleHandler} />}
    </>
  )
}

export default Basket

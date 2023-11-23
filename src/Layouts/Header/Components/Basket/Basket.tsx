import React, { useState } from 'react'
import classes from './Basket.module.css'
import { useSelector } from 'react-redux'
import { type IBasketSliceProps } from '@/Redux/model'
import { FiShoppingCart } from 'react-icons/fi'
import CustomBackground from '@/Components/Elements/CustomBackground/CustomBackground'
import { CSSTransition } from 'react-transition-group'
import BasketOverlay from './BasketOverlay/BasketOverlay'

const animationTiming = {
  enter: 300,
  exit: 100,
}

const Basket = () => {
  const [toggle, setToggle] = useState(false)

  const toggleHandler = () => {
    setToggle((prevState) => !prevState)
  }

  const productCount = useSelector(
    (state: { basket: IBasketSliceProps }) => state.basket.totalNumber
  )

  return (
    <>
      <div className={classes.container}>
        <button onClick={toggleHandler} className={classes.button}>
          <FiShoppingCart size={35} />
          <div className={classes.number}>{productCount}</div>
        </button>
      </div>

      {toggle && (
        <CustomBackground handler={toggleHandler} zIndex={10} top={0} />
      )}

      <CSSTransition
        in={toggle}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: classes.fade_slide_enter_active,
          exitActive: classes.fade_slide_exit_active,
        }}
      >
        <div className={classes.catalog}>
          <BasketOverlay onConfirm={toggleHandler} />
        </div>
      </CSSTransition>
    </>
  )
}

export default Basket

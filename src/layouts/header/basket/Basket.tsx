import { FunctionComponent, useState } from "react"
import BasketOverlay from "./Overlay"
import classes from "./Basket.module.css"
import BasketSVG from "@/assets/svg/BasketSVG"
import { useSelector } from "react-redux"
import { IBasketSliceProps } from "@/store/model"

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
          <BasketSVG />
          <div className={classes.number}>{productCount}</div>
        </button>
      </div>
      {!toggleOverlay && <BasketOverlay onConfirm={toggleHandler} />}
    </>
  )
}

export default Basket

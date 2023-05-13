import { FunctionComponent, useState } from "react"
import BasketOverlay from "./BacketOverlay"
import classes from "./Basket.module.css"
import BasketSVG from "@/svg/BasketSVG"

interface BasketProps {}

const Basket: FunctionComponent<BasketProps> = () => {
  const [toggleOverlay, setToggleOverlay] = useState(true)

  const toggleHandler = () => {
    setToggleOverlay((prevState) => !prevState)
  }

  return (
    <>
      <div className={classes.mainbox}>
        <button onClick={toggleHandler}>
          <BasketSVG />
        </button>
      </div>
      {!toggleOverlay && <BasketOverlay onConfirm={toggleHandler} />}
    </>
  )
}

export default Basket

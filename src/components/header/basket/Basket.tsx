import { FunctionComponent, useState } from "react"
import BasketOverlay from "./BacketOverlay"
import classes from "./Basket.module.css"

interface BasketProps {}

const Basket: FunctionComponent<BasketProps> = () => {
  const [toggleOverlay, setToggleOverlay] = useState(true)

  const toggleHandler = () => {
    setToggleOverlay((prevState) => !prevState)
  }

  return (
    <>
      <div className={classes.backet}>
        <button onClick={toggleHandler}>Backet</button>
      </div>
      {!toggleOverlay && <BasketOverlay onConfirm={toggleHandler} />}
    </>
  )
}

export default Basket

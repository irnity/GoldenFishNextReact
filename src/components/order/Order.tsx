import { FunctionComponent } from "react"
import { BasketSliceProps } from "../../store/model"
import classes from "./Order.module.css"

interface OrderProps {
  basket: BasketSliceProps["basket"]
}

const Order: FunctionComponent<OrderProps> = (props) => {
  return (
    <ul>
      {props.basket.length === 0 && (
        <div className={classes.null}>
          <h1>Додайте товар в кошик</h1>
        </div>
      )}

      {props.basket.map((product) => (
        <li className={classes.list_item} key={product.code}>
          <div className={classes.item}>
            <div>
              <img
                src={product.image}
                className={classes.image}
                alt="ваш товар"
              />
            </div>
            <div className={classes.info}>
              <div className={classes.title}>
                <span>{product.title}</span>
              </div>
              <div className={classes.info_value}>
                <button>-</button>
                <span className={classes.span}>{product.amountToBuy}</span>
                <button>+</button>
                <span className={classes.span}>Ціна: {product.totalPrice}</span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Order

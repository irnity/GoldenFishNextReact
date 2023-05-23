import { FunctionComponent } from "react"
import classes from "./Buy.module.css"

interface BuyProps {}

const Buy: FunctionComponent<BuyProps> = () => {
  return (
    <div className={classes.buy}>
      <div className={classes.image}>
        <div>
          <img
            src="https://content1.rozetka.com.ua/goods/images/big_tile/33220071.jpg"
            width={100}
            height={100}
          />
        </div>
        <div className={classes.image_text}>
          <span>Дриль-шурупокрут акумуляторний RZTK RD 1213Li</span>
        </div>
      </div>
      <div className={classes.but_bot}>
        <div className={classes.top}>
          <div>
            <span>4343₴</span>
          </div>
          <div>
            <button>like</button>
          </div>
        </div>
        <div className={classes.bottom}>
          <button>buy</button>
          <button>buy</button>
        </div>
      </div>
    </div>
  )
}

export default Buy

import { FunctionComponent } from "react"
import classes from "./Buy.module.css"
import { useSelector } from "react-redux"
import { IProduct } from "@/redux/model"
import useBasket from "@/hooks/basket-hook"
import LinkProductButton from "@/components/linkProductButton/LinkProductButton"
import Image from "next/image"

interface BuyProps {}

const Buy: FunctionComponent<BuyProps> = () => {
  const product = useSelector(
    (state: { product: { product: IProduct } }) => state.product.product
  )

  const { addProductToBasket } = useBasket()
  return (
    <div className={classes.buy}>
      <div className={classes.image}>
        <div>
          <Image src={product.image} alt="none" width={100} height={100} />
        </div>
        <div className={classes.image_text}>
          <span>{product.title}</span>
        </div>
      </div>
      <div className={classes.but_bot}>
        <div className={classes.top}>
          <div>
            <h3>{product.price}₴</h3>
          </div>
          <div>
            <button>like</button>
          </div>
        </div>
        <LinkProductButton
          button={() => addProductToBasket(product)}
          text="Купити"
        />
      </div>
    </div>
  )
}

export default Buy

import { FunctionComponent } from "react"
import classes from "./Buy.module.css"
import { useSelector } from "react-redux"
import { IProduct } from "@/redux/model"
import useBasket from "@/hooks/basket-hook"
import LinkProductButton from "@/components/elements/linkProductButton/LinkProductButton"
import Image from "next/image"
import CustomButton from "@/components/elements/customButton/CustomButton"
import { FiHeart } from "react-icons/fi"

interface BuyProps {
  product: IProduct
}

const Buy: FunctionComponent<BuyProps> = ({ product }) => {
  const { addProductToBasket } = useBasket()
  return (
    <div className={classes.buy}>
      <div className={classes.image}>
        <div>
          <Image src={product.image} alt="none" width={96} height={96} />
        </div>
        <div className={classes.image_text}>
          <span>{product.title}</span>
        </div>
      </div>
      <div className={classes.buttons}>
        <div className={classes.top_buttons}>
          <div>
            <p>{product.price}₴</p>
          </div>
          <div>
            <FiHeart color="#2196F3" size={16} />
          </div>
        </div>

        <div className={classes.bottom_buttons}>
          <CustomButton
            type="button"
            handler={() => addProductToBasket(product)}
            text="Купити"
            color="white"
            backGroundColor="#2196F3"
          />
        </div>
      </div>
    </div>
  )
}

export default Buy

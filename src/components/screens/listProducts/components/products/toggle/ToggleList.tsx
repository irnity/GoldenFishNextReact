import React from "react"
import classes from "./ToggleList.module.css"
import { IProduct } from "@/redux/model"
import CustomButton from "@/components/elements/customButton/CustomButton"
import { FiHeart, FiShoppingCart } from "react-icons/fi"
import useBasket from "@/hooks/basket-hook"

type Props = {
  product: IProduct
}

const ToggleList = ({ product }: Props) => {
  const { addProductToBasket } = useBasket()
  return (
    <div className={classes.container}>
      <div className={classes.params}>
        {product.params.slice(0, 3).map((param) => (
          <div key={param.name}>
            <span>{param.name}: </span>
            <span>{param.value}</span>
          </div>
        ))}
      </div>
      <div className={classes.buttons}>
        <div className={classes.button}>
          <CustomButton
            type="button"
            handler={() => {}}
            color="blue"
            svg={<FiHeart />}
          />
        </div>
        <div className={classes.button}>
          <CustomButton
            type="button"
            handler={() => {
              addProductToBasket(product)
            }}
            color="blue"
            svg={<FiShoppingCart />}
          />
        </div>
      </div>
    </div>
  )
}

export default ToggleList

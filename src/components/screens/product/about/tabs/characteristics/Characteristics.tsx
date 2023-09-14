import React, { FunctionComponent } from "react"
import classes from "./Characteristics.module.css"
import { IProduct } from "@/redux/model"
import { useSelector } from "react-redux"

interface CharacteristicsProps {}

const Characteristics: FunctionComponent<CharacteristicsProps> = () => {
  const product = useSelector(
    (state: { product: { product: IProduct } }) => state.product.product
  )
  return (
    <div className={classes.characteristics}>
      <div className={classes.name}>
        <h2>Основні характеристики</h2>
      </div>
      <div className={classes.info}>
        <div className={classes.row}>
          <p>Опис: </p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Characteristics

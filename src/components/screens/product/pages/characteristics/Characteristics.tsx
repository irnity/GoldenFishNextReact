import React, { FunctionComponent } from "react"
import classes from "./Characteristics.module.css"
import { IProduct } from "@/redux/model"
import { useSelector } from "react-redux"

interface CharacteristicsProps {
  characteristics?: any
}

const Characteristics: FunctionComponent<CharacteristicsProps> = ({
  characteristics,
}) => {
  let comments = characteristics.params
  if (comments === undefined) comments = []

  const product = useSelector(
    (state: { product: { product: IProduct } }) => state.product.product
  )
  return (
    <div className={classes.characteristics}>
      <div className={classes.name}>
        <h2>Основні характеристики</h2>
      </div>
      {comments.map((item: any) => (
        <div className={classes.info} key={item.name}>
          <div className={classes.row}>
            <p>{item.name}</p>
            <p>{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Characteristics

import React, { FunctionComponent } from "react"
import classes from "./Characteristics.module.css"

interface CharacteristicsProps {}

const Characteristics: FunctionComponent<CharacteristicsProps> = () => {
  return (
    <div className={classes.characteristics}>
      <div className={classes.name}>
        <h2>Основні характеристики</h2>
      </div>
      <div className={classes.info}>
        <div className={classes.row}>
          <span>Довжина:</span>
          <span>3м</span>
        </div>
        <div className={classes.row}>
          <span>Кількість секцій:</span>
          <span>2</span>
        </div>
        <div className={classes.row}>
          <span>Матеріал бланка:</span>
          <span>Графит (карбон)</span>
        </div>
      </div>
    </div>
  )
}

export default Characteristics

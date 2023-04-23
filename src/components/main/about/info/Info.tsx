import { FunctionComponent } from "react"
import classes from "./Info.module.css"

interface InfoProps {
  description: string
}

const Info: FunctionComponent<InfoProps> = ({ description }) => {
  return (
    <div className={classes.box}>
      <div className={classes.description}>
        <div className={classes.name}>
          <h2>Опис</h2>
        </div>
        <div className={classes.info}>
          <p>{description}</p>
        </div>
      </div>
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
    </div>
  )
}

export default Info

import { FunctionComponent } from "react"
import classes from "./Find.module.css"

interface FindProps {}

const Find: FunctionComponent<FindProps> = () => {
  return (
    <div className={classes.cart}>
      <div className={classes.find}>
        <div className={classes.title}>
          <span>Відбір за ярликами</span>
        </div>
        <div className={classes.options}>
          <div>
            <input type="checkbox" />
            <label>Новинка</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Нове надходження</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Суперціна</label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Хіт</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Find

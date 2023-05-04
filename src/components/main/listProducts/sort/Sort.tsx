import classes from "./Sort.module.css"
import { FunctionComponent } from "react"

interface SortProps {}

const Sort: FunctionComponent<SortProps> = () => {
  return (
    <div className={classes.cart}>
      <div className={classes.sort_box}>
        <div className={classes.filter}>
          <div>Сортувати</div>
          <div>Список</div>
        </div>
        <div className={classes.shape}>
          <div>Вигляд</div>
          <div>Список</div>
        </div>
      </div>
    </div>
  )
}

export default Sort

import classes from "./Sort.module.css"
import { FunctionComponent } from "react"
import sv from "../../../../svg/menu-grid-r-svgrepo-com.svg"
import Block from "@/svg/Block"

interface SortProps {}

const Sort: FunctionComponent<SortProps> = () => {
  return (
    <div className={classes.cart}>
      <div className={classes.sort_box}>
        <div className={classes.filter}>
          <select>
            <option>По рейтингу</option>
            <option>Новинки</option>
            <option>Від дешевих до дорогих</option>
            <option>Від дорогих до дешевих</option>
          </select>
        </div>
        <div className={classes.shape}>
          <button>
            <Block />
          </button>
          <div>Список</div>
        </div>
      </div>
    </div>
  )
}

export default Sort

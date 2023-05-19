import { FunctionComponent } from "react"
import Link from "next/link"
import classes from "./Navigation.module.css"
import NavLink from "./links/NavLink"

interface NavigationHeaderProps {}

const NavigationHeader: FunctionComponent<NavigationHeaderProps> = () => {
  return (
    <div className={classes.cart}>
      {/*  */}
      <div className={classes.left}>
        <NavLink url={"/"} text={"Home"} />
        <NavLink url={"/products/fishingrod"} page={"1"} text={"Удочки"} />
        <NavLink url={"/"} text={"Гачки"} />
        <NavLink url={"/"} text={"Бренди"} />
        <NavLink url={"/"} text={"Контакти"} />
        <NavLink url={"/"} text={"Магазин"} />
        <NavLink url={"/"} text={"Партнери"} />
        <NavLink url={"/"} text={"Замовлення"} />
      </div>
      {/*  */}
      <div className={classes.right}>
        <div className={classes.link}>
          <span className={classes.text}>098800553535</span>
        </div>
        <div className={classes.link}>
          <button className={classes.call}>
            <span className={classes.text}>Замовивити дзвінок</span>
          </button>
        </div>
        <div className={classes.ua}>
          <button className={classes.language_button}>
            <span className={classes.text}>UA</span>
          </button>
        </div>
        <div className={classes.eng}>
          <button className={classes.language_button}>
            <span className={classes.text}>ENG</span>
          </button>
        </div>
      </div>
      {/*  */}
    </div>
  )
}

export default NavigationHeader

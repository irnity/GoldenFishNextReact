import { FunctionComponent } from "react"
import Link from "next/link"
import classes from "./Navigation.module.css"

interface NavigationHeaderProps {}

const NavigationHeader: FunctionComponent<NavigationHeaderProps> = () => {
  return (
    <div className={classes.cart}>
      <div className={classes.nav_box_left}>
        <div className={classes.link_box_left}>
          <Link href="/" className={classes.link_text}>
            <span>HomePage</span>
          </Link>
        </div>
        <div className={classes.link_box_left}>
          <Link href="/products/fishingrod" className={classes.link_text}>
            <span>Удочки</span>
          </Link>
        </div>
        <div className={classes.link_box_left}>
          <Link href="/products/hooks" className={classes.link_text}>
            <span>Гачки</span>
          </Link>
        </div>
        <div className={classes.link_box_left}>
          <Link href="/products/" className={classes.link_text}>
            <span>Бренди</span>
          </Link>
        </div>
        <div className={classes.link_box_left}>
          <Link href="/products/" className={classes.link_text}>
            <span>Контаки</span>
          </Link>
        </div>
        <div className={classes.link_box_left}>
          <Link href="/products/" className={classes.link_text}>
            <span>Магазини</span>
          </Link>
        </div>
        <div className={classes.link_box_left}>
          <Link href="/products/" className={classes.link_text}>
            <span>Партнери</span>
          </Link>
        </div>
        <div className={classes.link_box_left}>
          <Link href="/products" className={classes.link_text}>
            <span>Замовлення</span>
          </Link>
        </div>
      </div>

      <div className={classes.nav_box_right}>
        <div className={classes.link_box_right}>
          <span className={classes.link_text}>098800553535</span>
        </div>
        <div className={classes.link_box_right}>
          <button>
            <span className={classes.link_text}>Замовивити дзвінок</span>
          </button>
        </div>
        <div className={classes.link_box_right_button}>
          <button>
            <span className={classes.link_text}>Ua</span>
          </button>
        </div>
        <div className={classes.link_box_right_button}>
          <button>
            <span className={classes.link_text}>Eng</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NavigationHeader

import { FunctionComponent } from "react"
import Link from "next/link"
import classes from "./Navigation.module.css"

interface NavigationHeaderProps {}

const NavigationHeader: FunctionComponent<NavigationHeaderProps> = () => {
  return (
    <div className={classes.cart}>
      <div className={classes.nav_box}>
        <div className={classes.link}>
          <Link href="/" className={classes.link_text}>
            <span>HomePage</span>
          </Link>
        </div>
        <div>
          <Link href="/products/fishingrod" className={classes.link_text}>
            <span>Удочки</span>
          </Link>
        </div>
        <div>
          <Link href="/products/hooks" className={classes.link_text}>
            <span>Гачки</span>
          </Link>
        </div>
        <div>
          <Link href="/products/" className={classes.link_text}>
            <span>Бренди</span>
          </Link>
        </div>
        <div>
          <Link href="/products/" className={classes.link_text}>
            <span>Контаки</span>
          </Link>
        </div>
        <div>
          <Link href="/products/" className={classes.link_text}>
            <span>Магазини</span>
          </Link>
        </div>
        <div>
          <Link href="/products/" className={classes.link_text}>
            <span>Партнери</span>
          </Link>
        </div>
        <div>
          <Link href="/products/order" className={classes.link_text}>
            <span>Order</span>
          </Link>
        </div>
      </div>

      <div className={classes.nav_box}>
        <div className={classes.link_text}>
          <span>098800553535</span>
        </div>
        <div className={classes.link_text}>
          <button>
            <span>Замовивити</span> дзвінок
          </button>
        </div>
        <div className={classes.link_text}>
          <button>
            <span>Ua</span>
          </button>
        </div>
        <div className={classes.link_text}>
          <button>
            <span>Eng</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NavigationHeader

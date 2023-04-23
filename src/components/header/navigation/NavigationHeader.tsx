import { FunctionComponent } from "react"
import Link from "next/link"
import classes from "./NavigationHeader.module.css"

interface NavigationHeaderProps {}

const NavigationHeader: FunctionComponent<NavigationHeaderProps> = () => {
  return (
    <div className={classes.top}>
      <div className={classes.top_info}>
        <ul className={classes.top_info_list}>
          <li>
            <Link href="/" className={classes.top_info_href}>
              HomePage
            </Link>
          </li>
          <li>
            <Link href="/products/fishingrod" className={classes.top_info_href}>
              Удочки
            </Link>
          </li>
          <li>
            <Link href="/products/hooks" className={classes.top_info_href}>
              Гачки
            </Link>
          </li>
          <li>
            <Link href="/products/" className={classes.top_info_href}>
              Бренди
            </Link>
          </li>
          <li>
            <Link href="/products/" className={classes.top_info_href}>
              Контаки
            </Link>
          </li>
          <li>
            <Link href="/products/" className={classes.top_info_href}>
              Магазини
            </Link>
          </li>
          <li>
            <Link href="/products/" className={classes.top_info_href}>
              Партнери
            </Link>
          </li>
          <li>
            <Link href="/products/order" className={classes.top_info_href}>
              Order
            </Link>
          </li>
        </ul>
      </div>

      <div className={classes.top_info}>
        <ul className={classes.top_info_list}>
          <li className={classes.top_info_href}>098800553535</li>
          <li className={classes.top_info_href}>
            <button>Замовивити звороній язок</button>
          </li>
          <li className={classes.top_info_href}>Ua</li>
          <li className={classes.top_info_href}>Eng</li>
        </ul>
      </div>
    </div>
  )
}

export default NavigationHeader

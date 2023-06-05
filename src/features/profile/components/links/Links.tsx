import { FunctionComponent } from "react"
import classes from "./Links.module.css"
import Link from "next/link"

interface LinksProps {}

const Links: FunctionComponent<LinksProps> = () => {
  return (
    <div className={classes.links}>
      <Link href="/cabinet/personal-information" className={classes.cart}>
        Інформація
      </Link>
      <Link href="/cabinet/orders" className={classes.cart}>
        Мої замовлення
      </Link>
      <Link href="/cabinet/wish-list" className={classes.cart}>
        Список бажань
      </Link>
      <Link href="/cabinet/watched-products" className={classes.cart}>
        Переглянуті товари
      </Link>
      <Link href="/cabinet/mailings" className={classes.cart}>
        Розсилки
      </Link>
      <Link href="/cabinet/wallet" className={classes.cart}>
        Мій гаманець
      </Link>
      <Link href="/cabinet/bonus-account" className={classes.cart}>
        Мій Бонусний рахунок
      </Link>
      <Link href="/cabinet/comments" className={classes.cart}>
        Мої відгуки
      </Link>
      <Link href="/cabinet/messages" className={classes.cart}>
        Листування з продавцем
      </Link>
      <Link href="/cabinet/shares" className={classes.cart}>
        Участь в акціях
      </Link>
      <Link href="/cabinet/dimensions" className={classes.cart}>
        Мої розміри
      </Link>
    </div>
  )
}

export default Links

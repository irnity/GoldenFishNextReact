import { FunctionComponent } from "react"
import Link from "next/link"
import classes from "./Navigation.module.css"
import NavLink from "./links/NavLink"

interface NavigationHeaderProps {}

// { href: "/information/actions", text: "Акції" },
// { href: "/information/discounts", text: "Знижки" },
// { href: "/information/brands", text: "Бренди" },
// { href: "/information/payment-and-delivery", text: "Оплата та доставка" },
// { href: "/information/contacts", text: "Контакти" },
// { href: "/information/shops", text: "Магазини" },
// { href: "/information/service-center", text: "Сервісний центр" },
// { href: "/information/news", text: "Новини" },
// { href: "/information/articles-and-reviews", text: "Статті та огляди" },
// { href: "/information/forum", text: "Форум" },
// { href: "/information/help", text: "Допомога" },
// { href: "/information/guarantee", text: "Гарантія" },

const NavigationHeader: FunctionComponent<NavigationHeaderProps> = () => {
  return (
    <nav className={classes.cart}>
      {/*  */}
      <div className={classes.left}>
        <NavLink url="/information/actions" text="Акції" />
        <NavLink url="/information/discounts" text="Доставка" />
        <NavLink url="/information/brands" text="Знижки" />
        <NavLink url="/information/payment-and-delivery" text="Бренди" />
        <NavLink url="/information/contacts" text="Контакти" />
        <NavLink url="/information/shops" text="Магазини" />
        <NavLink url="/information/service-center" text="Партнери" />
        <NavLink url="/information/news" text="Допомога" />
        {/* <NavLink url="/information/articles-and-reviews" text="Статті" />
        <NavLink url="/information/forum" text="Форум" />
        <NavLink url="/information/help" text="Допомога" />
        <NavLink url="/information/guarantee" text="Гарантія" /> */}
      </div>
      {/*  */}
      <div className={classes.right}>
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
    </nav>
  )
}

export default NavigationHeader

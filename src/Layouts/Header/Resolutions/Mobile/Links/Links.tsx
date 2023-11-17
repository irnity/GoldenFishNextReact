import Link from 'next/link'
import React from 'react'

import classes from './Link.module.css'

interface LinksProps {
  toogleHandlerCatalog: any
}

const Links = (props: LinksProps) => {
  return (
    <div className={classes.list}>
      <ul>
        <li>
          <button onClick={props.toogleHandlerCatalog} className={classes.link}>
            <span>КАТАЛОГ</span>
          </button>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>УВІЙТИ З ПАРОЛЕМ</span>
          </Link>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>РЕЄСТРАЦІЯ</span>
          </Link>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>АКЦІЇ</span>
          </Link>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>ЗНИЖКИ</span>
          </Link>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>НОВИНКИ</span>
          </Link>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>КОНТАКТИ</span>
          </Link>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>ОПЛАТА ТА ДОСТАВКА</span>
          </Link>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>НОВИНИ</span>
          </Link>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>СТАТТІ ТА ОГЛЯДИ</span>
          </Link>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>МАГАЗИН</span>
          </Link>
        </li>
        <li>
          <span>ДОПОМОГА</span>
          <Link href="/" className={classes.link}></Link>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>ГАРАНТІЯ</span>
          </Link>
        </li>
        <li>
          <Link href="/" className={classes.link}>
            <span>ФОРУМ</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Links

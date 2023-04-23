import { FunctionComponent } from "react"
import Link from "next/link"
import classes from "./AboutProduct.module.css"

interface AboutProductProps {}

const AboutProduct: FunctionComponent<AboutProductProps> = () => {
  return (
    <div className={classes.bottom}>
      <div className={classes.bottom_block}>
        <div className={classes.bottom_block_text}>
          <Link className={classes.link} href="info">
            Усе
          </Link>
        </div>
        <div className={classes.bottom_block_text}>
          <Link className={classes.link} href="characteristics">
            Характеристики
          </Link>
        </div>
        <div className={classes.bottom_block_text}>
          <Link className={classes.link} href="description">
            Опис
          </Link>
        </div>
        <div className={classes.bottom_block_text}>
          <Link className={classes.link} href="additinal">
            Аксесуари
          </Link>
        </div>
        <div className={classes.bottom_block_text}>
          <Link className={classes.link} href="media">
            Фото та відео
          </Link>
        </div>
        <div className={classes.bottom_block_text}>
          <Link className={classes.link} href="recomendation">
            Рекомендовані товари
          </Link>
        </div>
        <div className={classes.bottom_block_text}>
          <Link className={classes.link} href="reviews">
            Відгуки
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutProduct

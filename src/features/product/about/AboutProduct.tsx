import { FunctionComponent } from "react"
import Link from "next/link"
import classes from "./AboutProduct.module.css"
import { useRouter } from "next/router"

interface AboutProductProps {}

const AboutProduct: FunctionComponent<AboutProductProps> = () => {
  const router = useRouter()
  const { categoryId, itemId } = router.query as {
    categoryId: string
    itemId: string
  }
  const name = router.asPath.split("/")[4]
  let a: RegExp
  return (
    <div className={classes.cart}>
      <div className={classes.block}>
        <div className={classes.bottom_block_text}>
          <Link
            className={classes.link}
            style={name === undefined ? { color: "purple" } : undefined}
            href={`/products/${categoryId}/${itemId}`}
          >
            <span>Усе про товар</span>
          </Link>
        </div>
        <div className={classes.bottom_block_text}>
          <Link
            className={classes.link}
            style={name === "characteristics" ? { color: "purple" } : undefined}
            href={`/products/${categoryId}/${itemId}/characteristics`}
          >
            <span>Характеристики</span>
          </Link>
        </div>
        <div className={classes.bottom_block_text}>
          <Link
            className={classes.link}
            style={name === "comments" ? { color: "purple" } : undefined}
            href={`/products/${categoryId}/${itemId}/comments`}
          >
            <span>Відгуки</span>
          </Link>
        </div>
        <div className={classes.bottom_block_text}>
          <Link
            className={classes.link}
            style={name === "video" ? { color: "purple" } : undefined}
            href={`/products/${categoryId}/${itemId}/video`}
          >
            <span>Відео</span>
          </Link>
        </div>
        <div className={classes.bottom_block_text}>
          <Link
            className={classes.link}
            style={name === "photo" ? { color: "purple" } : undefined}
            href={`/products/${categoryId}/${itemId}/photo`}
          >
            <span>Фото</span>
          </Link>
        </div>

        <div className={classes.bottom_block_text}>
          <Link
            className={classes.link}
            style={name === "accessories" ? { color: "purple" } : undefined}
            href={`/products/${categoryId}/${itemId}/accessories`}
          >
            <span>Купують разом</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AboutProduct

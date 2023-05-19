import Image from "next/image"
import classes from "./Home.module.css"
import { FunctionComponent, useState } from "react"
import { IProduct } from "@/store/model"
import Link from "next/link"

interface HomeProps {
  products: IProduct[]
  categoryId?: string | string[] | undefined
}

const Home: FunctionComponent<HomeProps> = ({ products, categoryId }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 3 : prevIndex - 1
    )
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 3 ? 0 : prevIndex + 1
    )
  }
  return (
    <>
      <div>
        <button onClick={prevSlide}>-</button>
        <button onClick={nextSlide}>+</button>
      </div>
      <div
        className={classes.cart}
        style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
      >
        {products.slice(currentIndex, currentIndex + 3).map((product) => {
          return (
            <div className={classes.product_box} key={product.id}>
              <div className={classes.overflow}>
                <div className={classes.image_box}>
                  <Link
                    href={`${categoryId}/${product.id}`}
                    className={classes.link}
                  >
                    <Image
                      src={product.image}
                      alt={`${product.id}`}
                      className={classes.image}
                      width={185}
                      height={185}
                      priority
                    />
                  </Link>
                </div>

                <div className={classes.info_box}>
                  <div className={classes.code}>Code: {product.code}</div>
                  <div className={classes.title}>
                    <Link
                      href={`${categoryId}/${product.id}`}
                      className={classes.link}
                    >
                      <span>{product.title}</span>
                    </Link>
                  </div>
                  <div className={classes.price}>
                    <span>{product.price} &#8372; </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home

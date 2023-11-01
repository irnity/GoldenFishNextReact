import CustomButton from "@/components/elements/customButton/CustomButton"
import { IProduct } from "@/redux/model"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useState } from "react"
import classes from "./Item.module.css"
import { FiHeart, FiShoppingCart } from "react-icons/fi"
import { Rating } from "@mui/material"
import useBasket from "@/hooks/basket-hook"
import ImageList from "../image/ImageList"
import ToggleList from "../toggle/ToggleList"

type Props = {
  product: IProduct
}

const Item = ({ product }: Props) => {
  const [toggle, setToggle] = useState(false)
  const averageRate = product.totalRate / product.totalComments || 0
  const inStock = product.inStock ? "В наявності" : "Немає в наявності"
  return (
    <div
      className={classes.container}
      key={product.id}
      onMouseEnter={() => {
        setToggle(true)
      }}
      onMouseLeave={() => {
        setToggle(false)
      }}
    >
      <ImageList product={product} />

      <div className={classes.info_box}>
        <Link
          href={`/products/${product.category}/${product.id}`}
          className={classes.title}
        >
          <h1>{product.title}</h1>
        </Link>

        <Link
          href={`/products/${product.category}/${product.id}/comments`}
          className={classes.comments}
        >
          <Rating readOnly precision={0.5} value={averageRate} size="medium" />

          <span>{product.totalComments} відгуків</span>
        </Link>

        <div className={classes.price}>
          <h1>{product.price} &#8372; </h1>
        </div>
        <div
          className={classes.price}
          style={
            inStock === "В наявності"
              ? {
                  color: "green",
                }
              : {
                  color: "grey",
                }
          }
        >
          <span>{inStock}</span>
        </div>
      </div>
      {toggle && <ToggleList product={product} />}
    </div>
  )
}

export default Item

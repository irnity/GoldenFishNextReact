import CustomButton from "@/components/elements/customButton/CustomButton"
import { IProduct } from "@/redux/model"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useState } from "react"
import classes from "./Item.module.css"
import { FiHeart, FiShoppingCart } from "react-icons/fi"
import { Rating } from "@mui/material"

type Props = {
  product: IProduct
}

const Item = ({ product }: Props) => {
  const [toggle, setToggle] = useState(false)
  const averageRate = product.totalRate / product.totalComments || 0
  const inStock = product.inStock ? "В наявності" : "Немає в наявності"
  // END: ed8c6549bwf9
  return (
    <div
      className={classes.product_box}
      key={product.id}
      onMouseEnter={() => {
        setToggle(true)
      }}
      onMouseLeave={() => {
        setToggle(false)
      }}
    >
      <div className={classes.image_box}>
        <Link
          href={`/products/${product.category}/${product.id}`}
          className={classes.link_image}
        >
          <Image
            src={product.image}
            alt={
              "https://cdn.shopify.com/s/files/1/0060/3770/0678/articles/how_to_cast_rod_1200x1200.png?v=1621296605"
            }
            className={classes.image}
            width={200}
            height={200}
            priority
          />
        </Link>
      </div>

      <div className={classes.info_box}>
        <Link
          href={`/products/${product.category}/${product.id}`}
          className={classes.title}
        >
          <span>{product.title}</span>
        </Link>

        <Link
          href={`/products/${product.category}/${product.id}/comments`}
          className={classes.title}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span>
            <Rating
              readOnly
              precision={0.5}
              value={averageRate}
              size="medium"
            />
          </span>
          <span
            style={{
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {product.totalComments} відгуків
          </span>
        </Link>

        <div className={classes.price}>
          <span>{product.price} &#8372; </span>
        </div>
        <div className={classes.price}>
          <span>{inStock}</span>
        </div>
      </div>
      {toggle && (
        <div className={classes.buttons}>
          <div
            style={{ paddingLeft: "10px", paddingRight: "10px", width: "50%" }}
          >
            <CustomButton
              type="button"
              handler={() => {}}
              color="blue"
              svg={<FiHeart />}
            />
          </div>
          <div
            style={{ paddingLeft: "10px", paddingRight: "10px", width: "50%" }}
          >
            <CustomButton
              type="button"
              handler={() => {}}
              color="blue"
              svg={<FiShoppingCart />}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Item

// react
import { FunctionComponent, useState } from "react"

// redux
import { useSelector } from "react-redux"

// route
import Link from "next/link"

import classes from "./ListProducts.module.css"

import { useRouter } from "next/router"
import Image from "next/image"

import { IProduct } from "@/redux/model"
import Find from "../components/filter/Find"
import Information from "@/components/elements/information/Information"
import Products from "../components/products/Products"
import Sort from "../components/sort/Sort"
import PagesNumber from "../components/pagesNumber/PagesNumber"
import Price from "../components/filter/Price"

interface ListProductsProps {
  products: IProduct[]
  totalPages?: number | undefined
}

const ListProducts: FunctionComponent<ListProductsProps> = ({
  products,
  totalPages,
}) => {
  // redux
  const { isLogedIn, isAdmin, userInfo } = useSelector(
    (state: {
      auth: { isLogedIn: boolean; isAdmin: boolean; userInfo: string }
    }) => state.auth
  )

  console.log(isLogedIn, isAdmin, userInfo)

  return (
    <div className={classes.container}>
      <Information isAdmin={isAdmin} />

      <div className={classes.products_container}>
        {/*  */}
        <section className={classes.sort}>
          <Find />
          <Price />
        </section>
        {/*  */}
        <section className={classes.products_list}>
          <Sort />

          {products.length === 0 ? (
            <div className={classes.empty}>На данний час товар відсутній</div>
          ) : (
            <>
              <Products products={products} />
              <PagesNumber totalPages={totalPages} />
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default ListProducts

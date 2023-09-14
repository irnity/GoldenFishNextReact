// react
import { FunctionComponent } from "react"

// redux
import { useSelector } from "react-redux"

// route
import Link from "next/link"
import LinkProductButton from "@/components/elements/linkProductButton/LinkProductButton"

import classes from "./ListProducts.module.css"

import { useRouter } from "next/router"
import Image from "next/image"

import { IProduct } from "@/redux/model"
import Find from "../components/filter/Find"
import Information from "@/components/elements/information/Information"
import Products from "../components/products/Products"
import Sort from "../components/sort/Sort"
import PagesNumber from "../components/pagesNumber/PagesNumber"

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

  if (products.length === 0) {
    return (
      <div className={classes.container}>
        <Information isAdmin={isAdmin} />

        <div className={classes.products_container}>
          {/*  */}
          <section className={classes.sort}>
            <Find />
          </section>
          {/*  */}
          <section className={classes.products_list}>
            <Sort />
            <div className={classes.empty}>На данний час товари відсутні</div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <Information isAdmin={isAdmin} />

      <div className={classes.products_container}>
        {/*  */}
        <section className={classes.sort}>
          <Find />
        </section>
        {/*  */}
        <section className={classes.products_list}>
          <Sort />
          <Products products={products} />
          <PagesNumber totalPages={totalPages} />
        </section>
      </div>
    </div>
  )
}

export default ListProducts

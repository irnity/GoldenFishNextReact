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

  const [viewMode, setViewMode] = useState<string>("row")

  const viewModeHandler = () => {
    if (viewMode === "less") {
      setViewMode("less")
    } else {
      setViewMode("more")
    }
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
          <Sort viewModeHandler={viewModeHandler} viewMode={viewMode} />

          {products.length === 0 ? (
            <div className={classes.empty}>На данний час товар відсутній</div>
          ) : (
            <>
              <Products products={products} viewMode={viewMode} />
              <PagesNumber totalPages={totalPages} />
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default ListProducts

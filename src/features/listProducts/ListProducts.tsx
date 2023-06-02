// react
import { FunctionComponent } from "react"

// redux
import { useSelector } from "react-redux"

// route
import Link from "next/link"
import AddProductButton from "@/components/linkProductButton/LinkProductButton"

import classes from "./ListProducts.module.css"

import { useRouter } from "next/router"
import Image from "next/image"

import { IProduct } from "../../redux/model"
import Find from "./filter/Find"
import Information from "@/components/information/Information"
import Products from "./products/Products"
import Sort from "./sort/Sort"
import PagesNumber from "./pagesNumber/PagesNumber"

interface ListProductsProps {
  products: IProduct[]
  totalPages?: number | undefined
}

const ListProducts: FunctionComponent<ListProductsProps> = ({
  products,
  totalPages,
}) => {
  const { isLogedIn, isAdmin, userInfo } = useSelector(
    (state: {
      auth: { isLogedIn: boolean; isAdmin: boolean; userInfo: string }
    }) => state.auth
  )

  console.log(isLogedIn, isAdmin, userInfo)

  return (
    <div className={classes.cart}>
      <Information isAdmin={isAdmin} />

      <div className={classes.info_box}>
        <Find />
        <div className={classes.products_box}>
          <Sort />
          {products.length > 0 ? (
            <>
              <Products products={products} />
              <PagesNumber totalPages={totalPages} />
            </>
          ) : (
            <div className={classes.empty}>На данний час товари відсутні</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListProducts

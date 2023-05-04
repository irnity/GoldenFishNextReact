// react
import { FunctionComponent } from "react"

// redux
import { useSelector } from "react-redux"

// route
import Link from "next/link"
import AddProductButton from "../addProductButton/AddProductButton"

import classes from "./ListProducts.module.css"

import { ProductSliceProps } from "../../../store/model"
import { useRouter } from "next/router"
import Image from "next/image"

import { ProductList } from "../../../store/model"
import Find from "./filter/Find"
import Information from "./information/Information"
import Products from "./products/Products"
import Sort from "./sort/Sort"

interface ListProductsProps {
  data: ProductList[]
}

const ListProducts: FunctionComponent<ListProductsProps> = (props) => {
  const products = props.data

  const { isAdmin } = useSelector(
    (state: { auth: { isLogedIn: boolean; isAdmin: boolean } }) => state.auth
  )

  const router = useRouter()

  const { categoryId } = router.query

  return (
    <div className={classes.cart}>
      <Information isAdmin={isAdmin} categoryId={categoryId} />

      <div className={classes.info_box}>
        <Find />
        <div className={classes.products_box}>
          <Sort />
          <Products products={products} categoryId={categoryId} />
        </div>
      </div>
    </div>
  )
}

export default ListProducts

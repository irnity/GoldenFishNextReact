// react
import { FunctionComponent } from "react"

// redux
import { useSelector } from "react-redux"

// route
import Link from "next/link"
import AddProductButton from "../addProductButton/AddProductButton"

import classes from "./ListProducts.module.css"

import { useRouter } from "next/router"
import Image from "next/image"

import { IProduct } from "../../../store/model"
import Find from "./filter/Find"
import Information from "../information/Information"
import Products from "./products/Products"
import Sort from "./sort/Sort"
import PagesNumber from "./pagesNumber/PagesNumber"

interface ListProductsProps {
  products: IProduct[]
  totalPages: number
}

const ListProducts: FunctionComponent<ListProductsProps> = ({
  products,
  totalPages,
}) => {
  const { isAdmin } = useSelector(
    (state: { auth: { isLogedIn: boolean; isAdmin: boolean } }) => state.auth
  )

  const router = useRouter()

  const { categoryId } = router.query as { categoryId: string }
  return (
    <div className={classes.cart}>
      <Information isAdmin={isAdmin} categoryId={categoryId} />

      <div className={classes.info_box}>
        <Find />
        <div className={classes.products_box}>
          <Sort />
          {products.length > 0 ? (
            <>
              <Products products={products} categoryId={categoryId} />
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

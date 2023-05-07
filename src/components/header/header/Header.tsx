import Catalog from "../catalog/Catalog"
import Basket from "../basket/Basket"
import CartNavigation from "../cart/CartNavigation"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { authActions } from "@/store/authSlice"
import { info } from "@/store/authActions"

import classes from "./Header.module.css"

const Header = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.isLogedInCheck())
    dispatch(info())
  }, [dispatch])

  return (
    <header className={classes.cart}>
      <CartNavigation />
      <Catalog />
    </header>
  )
}

export default Header

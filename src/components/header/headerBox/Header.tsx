import Catalog from "../catalog/Catalog"
import Basket from "../basket/Basket"
import CartHeader from "../card/CartHeader"
import SearchHeader from "../search/SearchHeader"
import ShopName from "../title/ShopName"
import Signup from "../signup/Signup"
import { FunctionComponent } from "react"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { authActions } from "@/store/authSlice"
import { info } from "@/store/authActions"

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.isLogedInCheck())
    dispatch(info())
  }, [dispatch])

  return (
    <>
      <CartHeader
        leftSide={
          <>
            <ShopName />
            <SearchHeader />
          </>
        }
        rightSide={
          <>
            <Signup />
            <Basket />
          </>
        }
      />
      <Catalog />
    </>
  )
}

export default Header

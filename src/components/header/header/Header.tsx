import Catalog from "../catalog/Catalog"
import Basket from "../basket/Basket"
import CartNavigation from "../cart/CartNavigation"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { authActions } from "@/store/authSlice"
import { info } from "@/store/authActions"

import classes from "./Header.module.css"
import ShopName from "../title/ShopName"
import SearchHeader from "../search/SearchHeader"
import Sighup from "../signup/Signup"

import Menu from "@/svg/Menu"
import { CSSTransition } from "react-transition-group"

const animationTiming = {
  enter: 300,
  exit: 300,
}

const Header = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.isLogedInCheck())
    dispatch(info())
  }, [dispatch])

  const [toogle, setToogle] = useState(false)

  const toogleHadnler = () => {
    setToogle((prevState) => !prevState)
  }
  useEffect(() => {
    document.body.style.overflow = toogle ? "hidden" : "auto"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [toogle])

  return (
    <>
      <>
        <header className={classes.cart}>
          <CartNavigation />
          <Catalog />
        </header>
      </>
      <>
        <header className={classes.mobile}>
          <div className={classes.left} onClick={toogleHadnler}>
            <div className={classes.menu}>
              <Menu />
            </div>
          </div>
          <div className={classes.right}>
            <ShopName />
            <SearchHeader />
            <Sighup />
            <Basket />
          </div>
        </header>

        <div>
          {toogle && (
            <div className={classes.background} onClick={toogleHadnler}></div>
          )}
          <CSSTransition
            in={toogle}
            timeout={animationTiming}
            mountOnEnter
            unmountOnExit
            classNames={{
              // enter: classes.fade_slide_enter,
              enterActive: classes.fade_slide_enter_active,
              // exit: classes.fade_slide_exit,
              exitActive: classes.fade_slide_exit_active,
            }}
          >
            <div className={classes.catalog}>
              <div>ds</div>
            </div>
          </CSSTransition>
        </div>
      </>
    </>
  )
}

export default Header

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authGetUserInformation } from "@/redux/authSlice"

import Monitor from "./resolutions/monitor/Monitor"
import Mobile from "./resolutions/mobile/Mobile"

import classes from "./Header.module.css"

import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"
import { CSSTransition } from "react-transition-group"
import { warningActions } from "@/redux/warningSlice"

const animationTiming = {
  enter: 300,
  exit: 300,
}

const Header = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>()

  const { message, code } = useSelector(
    (state: { warning: { message: string; code: number } }) => state.warning
  )

  const [color, setColor] = useState("#198754")

  useEffect(() => {
    dispatch(authGetUserInformation())
  }, [dispatch])

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        dispatch(warningActions.clearWarning())
      }, 1500)

      if (code >= 200 && code < 300) {
        setColor("#198754")
      } else if (code >= 400 && code <= 500) {
        setColor("#dc3545")
      }
    }
  }, [code, dispatch, message])

  return (
    <header>
      <CSSTransition
        in={message === "" ? false : true}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: classes.fade_slide_enter_active,
          exitActive: classes.fade_slide_exit_active,
        }}
      >
        <div
          className={classes.warning}
          style={{
            backgroundColor: color,
          }}
        >
          <span>{message}</span>
        </div>
      </CSSTransition>

      <Monitor />
      <Mobile />
    </header>
  )
}

export default Header

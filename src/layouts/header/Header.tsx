import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { authActions } from "@/redux/authSlice"
import { info } from "@/redux/authActions"

import Monitor from "./resolutions/monitor/Monitor"
import Mobile from "./resolutions/mobile/Mobile"

const Header = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.isLogedInCheck())
    dispatch(info())
  }, [dispatch])

  return (
    <>
      <Monitor />
      <Mobile />
    </>
  )
}

export default Header

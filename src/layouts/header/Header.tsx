import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { authGetUserInformation } from "@/redux/authSlice"

import Monitor from "./resolutions/monitor/Monitor"
import Mobile from "./resolutions/mobile/Mobile"

import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "redux"

const Header = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>()

  useEffect(() => {
    dispatch(authGetUserInformation())
  }, [dispatch])

  return (
    <header>
      <Monitor />
      <Mobile />
    </header>
  )
}

export default Header

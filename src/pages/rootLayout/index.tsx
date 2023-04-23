import Footer from "../../components/footer/Footer"
import Header from "../../components/header/headerBox/Header"
import classes from "./RootLayout.module.css"

import { FunctionComponent } from "react"
import { Outlet } from "react-router-dom"

interface RootLayoutProps {}

const RootLayout: FunctionComponent<RootLayoutProps> = () => {
  return (
    <div className={classes.page}>
      <Header />

      <Outlet />

      <Footer />
    </div>
  )
}

export default RootLayout

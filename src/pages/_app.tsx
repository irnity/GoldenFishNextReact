import Footer from "@/layouts/footer/Footer"
import Header from "@/layouts/header/Header"
// import "@/styles/globals.css"
import "@/assets/styles/globals.css"
import type { AppProps } from "next/app"
import { Provider, useDispatch } from "react-redux"
import store from "../redux"
import classes from "./_app.module.css"

import "../assets/styles/Style.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={classes.page}>
      <Provider store={store}>
        <div className={classes.header}>
          <Header />
        </div>
        <div className={classes.main}>
          <Component {...pageProps} />
        </div>
        <div className={classes.footer}>
          <Footer />
        </div>
      </Provider>
    </div>
  )
}

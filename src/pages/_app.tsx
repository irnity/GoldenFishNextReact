import Footer from "@/components/footer/Footer"
import Header from "@/components/header/header/Header"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Provider, useDispatch } from "react-redux"
import store from "../store"
import classes from "./RootLayout.module.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={classes.page}>
      <Provider store={store}>
        <Header /> <Component {...pageProps} /> <Footer />
      </Provider>
    </div>
  )
}

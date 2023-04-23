import Footer from "@/components/footer/Footer"
import Header from "@/components/header/headerBox/Header"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import store from "../store"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Provider store={store}>
        <Header /> <Component {...pageProps} /> <Footer />
      </Provider>
    </div>
  )
}

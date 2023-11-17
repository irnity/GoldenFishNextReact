import Footer from '@/Layouts/Footer/Footer'
import Header from '@/Layouts/Header/Header'
import React from 'react'
import '@/assets/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/Redux'
import classes from './_app.module.css'

import '../assets/styles/Style.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={classes.page}>
      <Provider store={store}>
        <div
          className={classes.header}
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 2,
          }}
        >
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

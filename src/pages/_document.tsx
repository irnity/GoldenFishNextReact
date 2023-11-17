import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <div id="backdrop-overlay-root"></div>
        <div id="basket-overlay-root"></div>
        <NextScript />
      </body>
    </Html>
  )
}

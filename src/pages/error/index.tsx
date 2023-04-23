import Link from "next/link"
import React, { FunctionComponent } from "react"

interface ErrorPageProps {}

const ErrorPage: FunctionComponent<ErrorPageProps> = () => {
  return <Link href="/products">RETURN TO PRODUCTS</Link>
}

export default ErrorPage

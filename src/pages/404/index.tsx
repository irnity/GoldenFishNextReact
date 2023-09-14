import Link from "next/link"
import React, { FunctionComponent } from "react"

interface ErrorPageProps {}

const ErrorPage: FunctionComponent<ErrorPageProps> = () => {
  return <Link href="/">RETURN TO HOME</Link>
}

export default ErrorPage

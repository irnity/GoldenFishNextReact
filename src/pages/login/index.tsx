import { FunctionComponent } from "react"

import classes from "./LoginPage.module.css"

import useAuth from "../../hooks/auth-hook"
import Link from "next/link"
import GoogleSVG from "@/assets/svg/GoogleSVG"
import Login from "@/components/screens/login/page/Login"

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  return <Login />
}

export default LoginPage

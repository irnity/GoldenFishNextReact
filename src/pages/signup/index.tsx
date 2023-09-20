// react
import { FunctionComponent } from "react"

// css
import classes from "./SignInPagePage.module.css"

// custom hook
import useAuth from "../../hooks/auth-hook"
import SignUp from "@/components/screens/signup/page/SignUp"

interface AuthProps {}

const AuthPage: FunctionComponent<AuthProps> = () => {
  return <SignUp />
}

export default AuthPage

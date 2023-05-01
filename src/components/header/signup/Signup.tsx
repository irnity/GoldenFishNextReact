// react
import { FunctionComponent } from "react"
// router
import Link from "next/link"
// css
import classes from "./Signup.module.css"
// redux
import { useSelector } from "react-redux"
// custom hook
import useAuth from "../../../hooks/auth-hook"

interface SighupProps {}

const Sighup: FunctionComponent<SighupProps> = () => {
  const { logout } = useAuth()

  // check if user is loged in
  const { isLogedIn } = useSelector(
    (state: { auth: { isLogedIn: boolean } }) => state.auth
  )

  return (
    <div className={classes.signup}>
      {isLogedIn === false ? (
        <div className={classes.mainbox}>
          <div className={classes.login}>
            <Link href="/login">
              <button>Увійти</button>
            </Link>
          </div>
          <div>
            <Link href="/signin" className={classes.login}>
              <button>Зареєструватися</button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div></div>
          <div>
            <button onClick={logout}>Logout</button>
          </div>

          <Link href="/profile">
            <button>Profile</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Sighup

// react
import { FunctionComponent } from "react"

// css
import classes from "./SignInPagePage.module.css"
// custom hook
import useAuth from "../../hooks/auth-hook"

interface AuthProps {}

const AuthPage: FunctionComponent<AuthProps> = () => {
  const {
    email,
    password,

    emailHandler,
    passwordHandler,
    registrationHandler,
    loginWithGoogleHandler,
  } = useAuth()

  return (
    <div className={classes.box}>
      <input
        placeholder="Email..."
        value={email}
        onChange={emailHandler}
        type="email"
      />
      <input
        placeholder="Password..."
        onChange={passwordHandler}
        type="password"
        value={password}
      />

      <div className={classes.box}>
        <button onClick={registrationHandler}>
          Зареєструватися за допомогою логіна і паролю
        </button>
        <button onClick={loginWithGoogleHandler}>
          Зареєструватися за допомогою Google
        </button>
      </div>
    </div>
  )
}

export default AuthPage

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
    <div className={classes.mainbox}>
      <div className={classes.email}>
        <label>Email</label>
        <input
          id="email"
          placeholder="email"
          onChange={emailHandler}
          value={email}
          type="email"
        />
      </div>
      <div className={classes.password}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="password"
          onChange={passwordHandler}
          value={password}
          type="password"
        />
      </div>

      <div className={classes.buttons}>
        <button onClick={registrationHandler} className={classes.enter_email}>
          Зареєструватися за допомогою логіна і паролю
        </button>
        <button
          onClick={loginWithGoogleHandler}
          className={classes.enter_google}
        >
          Зареєструватися за допомогою Google
        </button>
      </div>
    </div>
  )
}

export default AuthPage

import { FunctionComponent } from "react"

import classes from "./LoginPage.module.css"

import useAuth from "../../hooks/auth-hook"

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const {
    email,
    password,
    emailHandler,
    passwordHandler,
    loginHandler,
    loginWithGoogleHandler,
    logout,
  } = useAuth()

  return (
    <div className={classes.mainbox}>
      <div className={classes.email}>
        <label htmlFor="email">Email</label>
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
        <button onClick={loginHandler} className={classes.enter_email}>
          Увійти
        </button>
        <button
          onClick={loginWithGoogleHandler}
          className={classes.enter_google}
        >
          Увійти за допомогою Google
        </button>
      </div>
    </div>
  )
}

export default LoginPage

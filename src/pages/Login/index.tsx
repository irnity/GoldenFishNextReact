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
        <button onClick={loginHandler}>Увійти</button>
        <button onClick={loginWithGoogleHandler}>
          Увійти за допомогою Google
        </button>
        <button onClick={logout}>Вийти</button>
      </div>
    </div>
  )
}

export default LoginPage

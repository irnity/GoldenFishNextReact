import React from "react"
import classes from "./Login.module.css"
import useAuth from "@/hooks/auth-hook"
import Link from "next/link"
import GoogleSVG from "@/assets/svg/GoogleSVG"
import CustomInput from "@/components/elements/customInput/CustomInput"
import CustomButton from "@/components/elements/customButton/CustomButton"

type Props = {}

function Login({}: Props) {
  const {
    email,
    password,
    emailHandler,
    passwordHandler,
    loginHandler,
    loginWithGoogleHandler,
  } = useAuth()
  return (
    <div className={classes.container}>
      <h1>Login</h1>
      <form className={classes.box} onSubmit={loginHandler}>
        <CustomInput
          type="email"
          name="Email"
          required={true}
          placeholder="Email"
          value={email}
          onChange={emailHandler}
        />

        <CustomInput
          type="password"
          name="Password"
          required={true}
          placeholder="Password"
          value={password}
          onChange={passwordHandler}
        />

        <CustomButton
          type="submit"
          color="white"
          // green
          backGroundColor="#2196F3"
          text="Login"
        />

        {/* <CustomButton
          type="button"
          color="black"
          backGroundColor="white"
          handler={loginWithGoogleHandler}
          text="Login with Google"
          svg={<GoogleSVG />}
        /> */}

        <Link href="/signup" className={classes.link}>
          <span>To Sign up Page</span>
        </Link>
      </form>
    </div>
  )
}

export default Login

import React from "react"
import classes from "./SignUp.module.css"
import useAuth from "@/hooks/auth-hook"
import CustomButton from "@/components/elements/customButton/CustomButton"
import Link from "next/link"
import CustomInput from "@/components/elements/customInput/CustomInput"
import GoogleSVG from "@/assets/svg/GoogleSVG"

type Props = {}

const SignUp = (props: Props) => {
  const {
    email,
    password,
    emailHandler,
    passwordHandler,
    loginHandler,
    loginWithGoogleHandler,
    registrationHandler,
  } = useAuth()
  return (
    <div className={classes.container}>
      <h1>Sign up</h1>
      <form className={classes.box} onSubmit={registrationHandler}>
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
          text="Sign up"
        />
        {/* <CustomButton
          type="button"
          color="black"
          backGroundColor="white"
          handler={loginWithGoogleHandler}
          text="Login with Google"
          svg={<GoogleSVG />}
        /> */}
        <Link href="/login" className={classes.link}>
          <span>To Login Page</span>
        </Link>
      </form>
    </div>
  )
}

export default SignUp

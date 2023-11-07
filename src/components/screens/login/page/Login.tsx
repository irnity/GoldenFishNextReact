import React from "react"
import classes from "./Login.module.css"
import useAuth from "@/hooks/auth-hook"
import Link from "next/link"
import GoogleSVG from "@/assets/svg/GoogleSVG"
import CustomInput from "@/components/elements/customInput/CustomInput"
import CustomButton from "@/components/elements/customButton/CustomButton"
import { useRouter } from "next/router"

type Props = {}

function Login({}: Props) {
  const {
    userCredentials,
    emailHandler,
    passwordHandler,

    loginHandler,
  } = useAuth()

  const router = useRouter()
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Вхід</h1>
      <form className={classes.box} onSubmit={loginHandler}>
        <CustomInput
          type="email"
          name="Ел. пошта"
          required={true}
          value={userCredentials.email}
          onChange={emailHandler}
        />

        <CustomInput
          type="password"
          name="Пароль"
          required={true}
          value={userCredentials.password}
          onChange={passwordHandler}
        />

        <span
          className={classes.forgotPassword}
          onClick={() => {
            router.push("/forgot-password")
          }}
        >
          Не пам&apos;ятаю пароль
        </span>

        <CustomButton
          type="submit"
          color="white"
          backGroundColor="rgb(17, 177, 223)"
          text="Увійти"
        />

        <CustomButton
          type="button"
          color="rgb(17, 177, 223)"
          backGroundColor="white"
          text="Зареєструватися"
          handler={() => {
            router.push("/signup")
          }}
        />
      </form>
    </div>
  )
}

export default Login

import React from "react"
import classes from "./SignUp.module.css"
import useAuth from "@/hooks/auth-hook"
import CustomButton from "@/components/elements/customButton/CustomButton"
import Link from "next/link"
import CustomInput from "@/components/elements/customInput/CustomInput"
import GoogleSVG from "@/assets/svg/GoogleSVG"
import { useRouter } from "next/router"

type Props = {}

const SignUp = (props: Props) => {
  const router = useRouter()

  const {
    userCredentials,
    firstNameHandler,
    lastNameHandler,
    phoneNumberHandler,
    emailHandler,
    passwordHandler,

    registrationHandler,
  } = useAuth()

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Реєстрація</h1>
      <form className={classes.box} onSubmit={registrationHandler}>
        <CustomInput
          type="text"
          name="Ім'я"
          required={true}
          onChange={firstNameHandler}
        />

        <CustomInput
          type="text"
          name="Прізвище"
          required={true}
          onChange={lastNameHandler}
        />

        <CustomInput
          type="tel"
          name="Номер телефону"
          value={userCredentials.phoneNumber}
          required={true}
          onChange={phoneNumberHandler}
        />

        <CustomInput
          type="email"
          name="Ел. пошта"
          required={true}
          onChange={emailHandler}
        />
        <CustomInput
          type="password"
          name="Придумайте пароль"
          required={true}
          onChange={passwordHandler}
        />

        <CustomButton
          type="submit"
          color="white"
          backGroundColor="rgb(17, 177, 223)"
          text="Зареєструватися"
        />

        <CustomButton
          type="button"
          color="rgb(17, 177, 223)"
          backGroundColor="white"
          text="Я вже зареєстрований"
          handler={() => router.push("/login")}
        />
      </form>
    </div>
  )
}

export default SignUp

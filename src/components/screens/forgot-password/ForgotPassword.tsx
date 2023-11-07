import CustomButton from "@/components/elements/customButton/CustomButton"
import CustomInput from "@/components/elements/customInput/CustomInput"
import useAuth from "@/hooks/auth-hook"
import React from "react"
import classes from "./ForgotPassword.module.css"
import { useRouter } from "next/router"

type Props = {}

const ForgotPassword = (props: Props) => {
  const {
    userCredentials,
    emailHandler,

    restorePasswordHandler,
  } = useAuth()
  const router = useRouter()
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Скинути пароль</h1>
      <form className={classes.box} onSubmit={restorePasswordHandler}>
        <CustomInput
          type="email"
          name="Ел. пошта"
          required={true}
          value={userCredentials.email}
          onChange={emailHandler}
        />

        <CustomButton
          type="submit"
          color="white"
          backGroundColor="rgba(17, 177, 223)"
          text="Отримати пароль"
        />

        <CustomButton
          type="button"
          color="rgba(17, 177, 223)"
          backGroundColor="white"
          text="Повернутися до входу"
          handler={() => {
            router.push("/login")
          }}
        />
      </form>
    </div>
  )
}

export default ForgotPassword

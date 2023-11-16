import React from 'react'
import classes from './Login.module.css'
import useAuth from '@/hooks/auth-hook'
import CustomInput from '@/components/elements/customInput/CustomInput'
import CustomButton from '@/components/elements/customButton/CustomButton'
import { useRouter } from 'next/router'
import colors from '@/assets/styles/colors'

function Login() {
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
            void router.push('/forgot-password')
          }}
        >
          Не пам&apos;ятаю пароль
        </span>

        <CustomButton
          type="submit"
          color={colors.Main_White_Color}
          backGroundColor={colors.Main_Blue_Color}
          text="Увійти"
        />

        <CustomButton
          type="button"
          color={colors.Main_Blue_Color}
          backGroundColor={colors.Main_White_Color}
          text="Зареєструватися"
          handler={() => {
            void router.push('/signup')
          }}
        />
      </form>
    </div>
  )
}

export default Login

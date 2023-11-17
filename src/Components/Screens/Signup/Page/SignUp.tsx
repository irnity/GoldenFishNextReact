import React from 'react'
import classes from './SignUp.module.css'
import useAuth from '@/Hooks/auth-hook'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'

import CustomInput from '@/Components/Elements/CustomInput/CustomInput'

import { useRouter } from 'next/router'
import colors from '@/Assets/Styles/colors'

const SignUp = () => {
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
          color={colors.Main_White_Color}
          backGroundColor={colors.Main_Blue_Color}
          text="Зареєструватися"
        />

        <CustomButton
          type="button"
          color={colors.Main_Blue_Color}
          backGroundColor={colors.Main_White_Color}
          text="Я вже зареєстрований"
          handler={() => {
            void router.push('/login')
          }}
        />
      </form>
    </div>
  )
}

export default SignUp

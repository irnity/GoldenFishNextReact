import { type FunctionComponent } from 'react'
import classes from './UserInfo.module.css'
import useAuth from '@/hooks/auth-hook'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '@/components/elements/customButton/CustomButton'
import { useRouter } from 'next/router'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import PersonalData from '../components/userInformation/UserName'
import React from 'react'

interface UserInfoProps {}

const UserInfo: FunctionComponent<UserInfoProps> = () => {
  const router = useRouter()

  const { logout } = useAuth()

  return (
    <div className={classes.container}>
      <div className={classes.tab}>
        <PersonalData />
      </div>

      <div className={classes.buttons}>
        <CustomButton
          handler={logout}
          text="Змінити пароль"
          type="button"
          color="white"
          backGroundColor="rgb(
          3, 196, 255)"
        />

        <CustomButton
          handler={logout}
          text="Вихід"
          type="button"
          color="white"
          backGroundColor="rgb(
          3, 196, 255)"
        />
      </div>
    </div>
  )
}

export default UserInfo

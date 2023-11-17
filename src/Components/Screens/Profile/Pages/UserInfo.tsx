import React from 'react'
import classes from './UserInfo.module.css'
import useAuth from '@/Hooks/auth-hook'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import UserName from '../Components/UserInformation/UserName'

const UserInfo = () => {
  const { logout } = useAuth()

  return (
    <div className={classes.container}>
      <div className={classes.tab}>
        <UserName />
      </div>

      <div className={classes.buttons}>
        <CustomButton
          handler={() => {
            void logout()
          }}
          text="Змінити пароль"
          type="button"
          color="white"
          backGroundColor="rgb(
          3, 196, 255)"
        />

        <CustomButton
          handler={() => {
            void logout()
          }}
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

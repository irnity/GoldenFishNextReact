import React from 'react'
import classes from './UserContacts.module.css'
import { FiMail } from 'react-icons/fi'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import { useSelector } from 'react-redux'
import CustomInput from '@/Components/Elements/CustomInput/CustomInput'
import useAuth from '@/Hooks/auth-hook'
import { type IAuth } from '@/Redux/model'
import useProfile from '../../Hook/useProfile'
import colors from '@/Assets/Styles/colors'

const UserContacts = () => {
  const userReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  const {
    userCredentials,
    setUserCredentials,
    phoneNumberHandler,

    changeCredentialsHandler,
  } = useAuth()

  const { toggle, toggleHandler, edit, setEdit } = useProfile()

  const editContactsHandler = () => {
    setUserCredentials({
      ...userCredentials,
      phoneNumber: userReduxState.phoneNumber,
    })
    setEdit((prev) => !prev)
  }

  return (
    <div className={classes.container}>
      <div className={classes.toggle}>
        <h1 onClick={toggleHandler}>
          <FiMail color="black" size="40px" style={{ marginRight: '10px' }} />
          Контакти
        </h1>
      </div>
      {toggle && (
        <div className={classes.block}>
          {!edit ? (
            <div className={classes.list}>
              <div>
                <h1>Підтверджений телефон</h1>
                <span>{userReduxState.phoneNumber ?? 'Відсутній'}</span>
              </div>
            </div>
          ) : (
            <div className={classes.list}>
              <CustomInput
                type="tel"
                required={false}
                name="Підтверджений телефон"
                value={userCredentials.phoneNumber}
                onChange={phoneNumberHandler}
              />
            </div>
          )}
          <div className={classes.button}>
            {edit && (
              <CustomButton
                text="зберегти"
                type="submit"
                color={colors.Main_White_Color}
                backGroundColor={colors.Agree_Green_Color}
                handler={() => {
                  void changeCredentialsHandler()
                }}
              />
            )}
            <CustomButton
              handler={editContactsHandler}
              text={edit ? 'скасувати' : 'редагувати'}
              type="button"
              color={colors.Main_White_Color}
              backGroundColor={
                edit ? colors.Cancel_Red_Color : colors.Main_Blue_Color
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserContacts

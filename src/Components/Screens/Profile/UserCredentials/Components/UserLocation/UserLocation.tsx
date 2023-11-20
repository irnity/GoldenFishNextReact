import React from 'react'
import classes from './UserLocation.module.css'
import { FiMap } from 'react-icons/fi'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import { useSelector } from 'react-redux'
import CustomInput from '@/Components/Elements/CustomInput/CustomInput'
import useAuth from '@/Hooks/auth-hook'
import { type IAuth } from '@/Redux/model'
import useProfile from '../../Hook/useProfile'
import colors from '@/Assets/Styles/colors'

const UserLocation = () => {
  const userReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  const {
    userCredentials,
    setUserCredentials,
    addressHandler,

    changeCredentialsHandler,
  } = useAuth()

  const { toggle, toggleHandler, edit, setEdit } = useProfile()

  const editContactsHandler = () => {
    setUserCredentials({
      ...userCredentials,
      address: userReduxState.address,
    })
    setEdit((prev) => !prev)
  }

  return (
    <div className={classes.container}>
      <div className={classes.toggle}>
        <h1 onClick={toggleHandler}>
          <FiMap color="black" size="40px" style={{ marginRight: '10px' }} />
          Адреса доставки
        </h1>
      </div>
      {toggle && (
        <div className={classes.block}>
          {!edit ? (
            <div className={classes.list}>
              <div>
                <h1>Адреса доставки</h1>
                <span>{userReduxState.address ?? 'Відсутня'}</span>
              </div>
            </div>
          ) : (
            <div className={classes.list}>
              <CustomInput
                type="text"
                required={false}
                name="Адреса доставки"
                value={userCredentials.address}
                onChange={addressHandler}
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

export default UserLocation

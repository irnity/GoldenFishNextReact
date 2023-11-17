import React, { useState } from 'react'
import classes from './UserName.module.css'
import { FiUser } from 'react-icons/fi'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import { useSelector } from 'react-redux'
import CustomInput from '@/Components/Elements/CustomInput/CustomInput'
import useAuth from '@/Hooks/auth-hook'
import { type IAuth } from '@/Redux/model'

const UserName = () => {
  const userReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  const {
    userCredentials,
    setUserCredentials,
    firstNameHandler,
    lastNameHandler,
    surnameHandler,

    changeCredentialsHandler,
  } = useAuth()

  const [toggle, settoggle] = useState(false)
  const [edit, setEdit] = useState(false)

  const toggleHandler = () => {
    settoggle((prev) => !prev)
  }
  const editHandler = () => {
    setUserCredentials({
      ...userCredentials,
      firstName: userReduxState.firstName,
      lastName: userReduxState.lastName,
      surname: userReduxState.surname,
    })
    setEdit((prev) => !prev)
  }

  return (
    <div className={classes.container}>
      <div className={classes.toggle}>
        <h1 onClick={toggleHandler}>
          <FiUser color="black" size="40px" style={{ marginRight: '10px' }} />
          Особисті дані
        </h1>
      </div>
      {toggle && (
        <div className={classes.block}>
          {!edit ? (
            <div className={classes.list}>
              <div>
                <h1>Ім&apos;я</h1>
                <span>{userReduxState.firstName ?? 'Відсутнє'}</span>
              </div>
              <div>
                <h1>Прізвище</h1>
                <span>{userReduxState.lastName ?? 'Відсутнє'}</span>
              </div>
              <div>
                <h1>По батькові</h1>
                <span>{userReduxState.surname ?? 'Відсутнє'}</span>
              </div>
            </div>
          ) : (
            <div className={classes.list}>
              <CustomInput
                type="text"
                required={false}
                name="Ім'я"
                value={userCredentials.firstName}
                onChange={firstNameHandler}
              />
              <CustomInput
                type="text"
                required={false}
                name="Прізвище"
                value={userCredentials.lastName}
                onChange={lastNameHandler}
              />
              <CustomInput
                type="text"
                required={false}
                name="По батькові"
                value={userCredentials.surname}
                onChange={surnameHandler}
              />
            </div>
          )}
          <div className={classes.button}>
            {edit && (
              <CustomButton
                text="зберегти"
                type="submit"
                color="white"
                backGroundColor="#198754"
                handler={() => {
                  void changeCredentialsHandler()
                }}
              />
            )}
            <CustomButton
              handler={editHandler}
              text={edit ? 'скасувати' : 'редагувати'}
              type="button"
              color="white"
              backGroundColor={edit ? '#DC3545' : 'rgb(3, 196, 255)'}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserName

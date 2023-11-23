import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '@/Redux/authSlice'

import { useRouter } from 'next/router'
import { type AnyAction } from '@reduxjs/toolkit'
import { type ThunkDispatch } from 'redux-thunk'
import { type IAuth } from '@/Redux/model'

// authActions
import { authGetUserInformation } from '@/Redux/authActions/authGetUserInformation'
import { authLogin } from '@/Redux/authActions/authLogin'
import { authRegistration } from '@/Redux/authActions/authRegistration'
import { authChangeCredentials } from '@/Redux/authActions/authChangeCredentials'
import { authRestorePassword } from '@/Redux/authActions/authRestorePassword'
import { authCreateAdmin } from '@/Redux/authActions/authCreateAdmin'
import { authLogout } from '@/Redux/authActions/authLogout'

const useAuth = () => {
  const userReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>()

  useEffect(() => {
    void dispatch(authGetUserInformation())
  }, [])

  const [userCredentials, setUserCredentials] = useState({
    firstName: '',
    lastName: '',
    surname: '',
    phoneNumber: '+38',
    address: '',
    email: '',
    password: '',
  })

  const router = useRouter()

  const firstNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      firstName: event.target.value,
    })
  }

  const lastNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      lastName: event.target.value,
    })
  }

  const surnameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      surname: event.target.value,
    })
  }

  const phoneNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 13) return
    setUserCredentials({
      ...userCredentials,
      phoneNumber: event.target.value,
    })
  }

  const addressHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      address: event.target.value,
    })
  }

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      email: event.target.value,
    })
  }
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      password: event.target.value,
    })
  }

  useEffect(() => {
    if (userReduxState.status === 'isLogedIn') {
      void router.push('/')
    }
    if (userReduxState.status === 'isLogedOut') {
      void router.push('/')
    }
    dispatch(authActions.changeStatus(''))
  }, [userReduxState.status])

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void dispatch(
      authLogin({
        email: userCredentials.email,
        password: userCredentials.password,
      })
    )
  }

  const registrationHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void dispatch(
      authRegistration({
        firstName: userCredentials.firstName,
        lastName: userCredentials.lastName,
        phoneNumber: userCredentials.phoneNumber,
        email: userCredentials.email,
        password: userCredentials.password,
      })
    )
  }

  const restorePasswordHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    void dispatch(
      authRestorePassword({
        email: userCredentials.email,
      })
    )
  }

  const changeCredentialsHandler = async () => {
    const updateFieldIfChanged = (
      field: keyof typeof userCredentials,
      newValue: string
    ) =>
      userCredentials[field] === userReduxState[field] ||
      userCredentials[field] === ''
        ? undefined
        : newValue

    void dispatch(
      authChangeCredentials({
        firstName: updateFieldIfChanged('firstName', userCredentials.firstName),
        lastName: updateFieldIfChanged('lastName', userCredentials.lastName),
        surname: updateFieldIfChanged('surname', userCredentials.surname),
        phoneNumber: updateFieldIfChanged(
          'phoneNumber',
          userCredentials.phoneNumber
        ),
        address: updateFieldIfChanged('address', userCredentials.address),
        email: userReduxState.email as string,
      })
    )
  }

  const createAdmin = async () => {
    void dispatch(authCreateAdmin({ email: userCredentials.email }))
  }

  const logout = async () => {
    void dispatch(authLogout())
  }

  return {
    userCredentials,
    setUserCredentials,
    emailHandler,
    passwordHandler,
    firstNameHandler,
    lastNameHandler,
    surnameHandler,
    phoneNumberHandler,
    addressHandler,

    loginHandler,
    registrationHandler,
    restorePasswordHandler,
    changeCredentialsHandler,
    createAdmin,
    logout,
  }
}

export default useAuth

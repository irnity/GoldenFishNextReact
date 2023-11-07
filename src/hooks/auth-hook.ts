import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../redux/authSlice"

import { useRouter } from "next/router"
import { AnyAction } from "@reduxjs/toolkit"
import { ThunkDispatch } from "redux-thunk"
import { IAuth } from "@/redux/model"

// authActions
import { authGetUserInformation } from "@/redux/authActions/authGetUserInformation"
import { authLogin } from "@/redux/authActions/authLogin"
import { authRegistration } from "@/redux/authActions/authRegistration"
import { authChangeCredentials } from "@/redux/authActions/authChangeCredentials"
import { authRestorePassword } from "@/redux/authActions/authRestorePassword"
import { authCreateAdmin } from "@/redux/authActions/authCreateAdmin"
import { authLogout } from "@/redux/authActions/authLogout"

const useAuth = () => {
  const userReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>()

  useEffect(() => {
    dispatch(authGetUserInformation())
  }, [dispatch])

  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    surname: "",
    phoneNumber: "+38",
    email: "",
    password: "",
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
    if (userReduxState.status === "isLogedIn") {
      router.push("/")
    }
    if (userReduxState.status === "isLogedOut") {
      router.push("/")
    }
    dispatch(authActions.changeStatus(""))
  }, [userReduxState.status])

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(
      authLogin({
        email: userCredentials.email,
        password: userCredentials.password,
      })
    )
  }

  const registrationHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    dispatch(
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
    dispatch(
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
      userCredentials[field] === ""
        ? undefined
        : newValue

    dispatch(
      authChangeCredentials({
        firstName: updateFieldIfChanged("firstName", userCredentials.firstName),
        lastName: updateFieldIfChanged("lastName", userCredentials.lastName),
        surname: updateFieldIfChanged("surname", userCredentials.surname),
      })
    )
  }

  const createAdmin = async () => {
    dispatch(authCreateAdmin({ email: userCredentials.email }))
  }

  const logout = async () => {
    dispatch(authLogout())
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

    loginHandler,
    registrationHandler,
    restorePasswordHandler,
    changeCredentialsHandler,
    createAdmin,
    logout,
  }
}

export default useAuth

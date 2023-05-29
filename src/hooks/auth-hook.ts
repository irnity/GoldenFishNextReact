import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { auth, db } from "../services/firebase/firebase"
import { signGoogle } from "../store/authActions"
import { authActions } from "../store/authSlice"

import { getFunctions, httpsCallable } from "firebase/functions"
import { useRouter } from "next/router"
// import { useNavigate } from "react-router-dom"

// user.uid - User UID
// user.email - User email

const useAuth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // const navigate = useNavigate()

  const dispatch = useDispatch()
  const router = useRouter()

  // email value
  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  // password value
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  // login with google
  const loginWithGoogleHandler = () => {
    dispatch(signGoogle())
  }

  // login with email & password
  const loginHandler = async () => {
    try {
      // need add createUserWithEmailAndPassword separet
      const responce = await signInWithEmailAndPassword(auth, email, password)
      // need add logic for login
      // console.log(responce)

      // check if token admin is true
      const admin = (await responce.user.getIdTokenResult()).claims

      dispatch(authActions.logInWithPassword(admin))

      router.push("/")

      // navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  // create user with email & password
  const registrationHandler = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      // setDoc create new document if its not existed with custom id
      setDoc(doc(db, "users", email), {
        // user information
        email: email,
        userId: cred.user.uid,
      })
      const functions = getFunctions()
      const addAdminRole = httpsCallable(functions, "addAdminRole")
      addAdminRole({ email }).then((result) => console.log(result))
    } catch (error) {
      console.log("Ця пошта вже використовується")
    }
  }

  // logout
  const logout = () => {
    dispatch(authActions.logOut())
  }

  return {
    email,
    password,
    emailHandler,
    passwordHandler,
    registrationHandler,
    loginHandler,
    loginWithGoogleHandler,
    logout,
  }
}

export default useAuth

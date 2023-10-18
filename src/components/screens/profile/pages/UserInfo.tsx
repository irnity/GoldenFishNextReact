import { FunctionComponent } from "react"
import classes from "./UserInfo.module.css"
import useAuth from "@/hooks/auth-hook"
import { useDispatch, useSelector } from "react-redux"
import CustomButton from "@/components/elements/customButton/CustomButton"
import { useRouter } from "next/router"
import { authLogout } from "@/redux/authSlice"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"

interface UserInfoProps {}

const UserInfo: FunctionComponent<UserInfoProps> = () => {
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: { email: string } } }) => state.auth
  )

  const router = useRouter()

  const { logout } = useAuth()

  const menuHandler = async () => {
    await logout()
    router.push("/")
  }

  return (
    <div>
      <div className={classes.tab}>
        <h2>Особисті дані</h2>
        <div className={classes.list}>
          <ul>
            <li>
              <span>Пошта</span>
              <span>{userInfo.email}</span>
            </li>
            <li>
              <span>Пошта</span>
              <span>{userInfo.email}</span>
            </li>
            <li>
              <span>Пошта</span>
              <span>{userInfo.email}</span>
            </li>
            <li>
              <span>Пошта</span>
              <span>{userInfo.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <CustomButton handler={menuHandler} text="Вихід" type="button" />
    </div>
  )
}

export default UserInfo

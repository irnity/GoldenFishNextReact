import { FunctionComponent } from "react"
import classes from "./UserInfo.module.css"
import useAuth from "@/hooks/auth-hook"
import { useSelector } from "react-redux"
import CustomButton from "@/components/elements/customButton/CustomButton"
import { useRouter } from "next/router"

interface UserInfoProps {}

const UserInfo: FunctionComponent<UserInfoProps> = () => {
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: { email: string } } }) => state.auth
  )

  const router = useRouter()

  const menuHandler = () => {
    router.push("/")
  }

  const { logout } = useAuth()
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

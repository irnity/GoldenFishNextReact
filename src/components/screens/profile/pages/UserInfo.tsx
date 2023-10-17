import { FunctionComponent } from "react"
import classes from "./UserInfo.module.css"
import useAuth from "@/hooks/auth-hook"
import { useSelector } from "react-redux"
import LinkProductButton from "@/components/elements/linkProductButton/LinkProductButton"

interface UserInfoProps {}

const UserInfo: FunctionComponent<UserInfoProps> = () => {
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: { email: string } } }) => state.auth
  )

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

      <LinkProductButton href="/" button={logout} text="Вихід" />
    </div>
  )
}

export default UserInfo

import { FunctionComponent } from "react"
import { useSelector } from "react-redux"

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  // user information
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: { email: string } } }) => state.auth
  )

  console.log(userInfo)

  return <p>{userInfo.email}</p>
}

export default ProfilePage

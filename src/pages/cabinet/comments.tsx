// react

import Cabinet from "@/components/screens/profile/Cabinet"
import Tab from "@/components/screens/profile/components/userInfo/Tab"
import useAuth from "@/hooks/auth-hook"
import { auth } from "@/services/firebase/firebase"
import { FunctionComponent } from "react"

// css

// redux
import { useSelector } from "react-redux"

interface CommentsPageProps {}

const CommentsPage: FunctionComponent<CommentsPageProps> = () => {
  return (
    <Cabinet>
      <Tab />
    </Cabinet>
  )
}

export default CommentsPage

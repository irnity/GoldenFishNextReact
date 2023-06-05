import { FunctionComponent, ReactNode, useEffect } from "react"
import classes from "./Cabinet.module.css"
import useAuth from "@/hooks/auth-hook"
import { useSelector } from "react-redux"
import { auth } from "@/services/firebase/firebase"
import Tab from "./components/userInfo/Tab"
import Links from "./components/links/Links"
import { useRouter } from "next/router"

interface CabinetProps {
  children: ReactNode
}

const Cabinet: FunctionComponent<CabinetProps> = (props) => {
  const router = useRouter()

  const { isLogedIn, isAdmin, userInfo } = useSelector(
    (state: {
      auth: { isLogedIn: boolean; isAdmin: boolean; userInfo: string }
    }) => state.auth
  )

  useEffect(() => {
    if (isLogedIn !== true) {
      router.push("/")
    }
  }, [isLogedIn, router])

  return (
    <div className={classes.cart}>
      <Links />
      <div className={classes.info}>{props.children}</div>
    </div>
  )
}

export default Cabinet

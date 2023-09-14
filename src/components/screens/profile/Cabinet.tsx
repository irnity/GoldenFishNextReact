import { FunctionComponent, ReactNode, useEffect } from "react"
import classes from "./Cabinet.module.css"
import useAuth from "@/hooks/auth-hook"
import { useSelector } from "react-redux"
import { auth } from "@/services/firebase/firebase"
import Tab from "./components/userInfo/Tab"
import Links from "@/components/elements/cart/links/Links"
import { useRouter } from "next/router"
import Cart from "@/components/elements/cart/Cart"

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

  return <Cart type="cabinet" right={props.children} />
}

export default Cabinet

import { FunctionComponent, ReactNode, useEffect } from "react"
import classes from "./Cabinet.module.css"
import useAuth from "@/hooks/auth-hook"
import { useSelector } from "react-redux"
import { auth } from "@/services/firebase/firebase"
import { useRouter } from "next/router"
import Cart from "@/components/cart/Cart"
import Links from "../../components/cart/links/Links"

interface InformationProps {
  children: ReactNode
}

const Information: FunctionComponent<InformationProps> = (props) => {
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

  return <Cart type="information" right={props.children} />
}

export default Information

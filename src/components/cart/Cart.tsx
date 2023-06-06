import { FunctionComponent, ReactNode, useEffect } from "react"
import classes from "./Cart.module.css"
import useAuth from "@/hooks/auth-hook"
import { useSelector } from "react-redux"
import { auth } from "@/services/firebase/firebase"
import { useRouter } from "next/router"
import Links from "./links/Links"

interface CartProps {
  type: string
  right: ReactNode
}

const Cart: FunctionComponent<CartProps> = (props) => {
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
      <Links type={props.type} />

      <div className={classes.info}>{props.right}</div>
    </div>
  )
}

export default Cart

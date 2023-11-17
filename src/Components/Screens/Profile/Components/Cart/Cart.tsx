import React, { type ReactNode, useEffect } from 'react'
import classes from './Cart.module.css'
import { useRouter } from 'next/router'
import { cabinetData } from './CabinetDataLinks'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { type IAuth } from '@/Redux/model'

interface CartProps {
  children: ReactNode
}

const Cart = (props: CartProps) => {
  const router = useRouter()

  const authReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  useEffect(() => {
    if (authReduxState.email == null) {
      void router.push('/login')
    }
  }, [router])

  return (
    <div className={classes.container}>
      <div className={classes.links}>
        <div className={classes.link}>
          {cabinetData.map((item) => (
            <Link href={item.href} className={classes.cart} key={item.text}>
              {item.text}
            </Link>
          ))}
        </div>
      </div>

      <div className={classes.info}>{props.children}</div>
    </div>
  )
}

export default Cart

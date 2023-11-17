import React, { type ReactNode, useEffect } from 'react'
import classes from './Cart.module.css'
import { auth } from '@/services/firebase/firebase'
import { useRouter } from 'next/router'
import { cabinetData } from './CabinetDataLinks'
import Link from 'next/link'

interface CartProps {
  children: ReactNode
}

const Cart = (props: CartProps) => {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user == null) {
        void router.push('/login')
      }
    })

    return unsubscribe
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

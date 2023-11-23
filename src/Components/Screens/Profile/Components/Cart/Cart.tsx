import React, { type ReactNode, useEffect } from 'react'
import classes from './Cart.module.css'
import { useRouter } from 'next/router'

import Link from 'next/link'
import { useSelector } from 'react-redux'
import { type IAuth } from '@/Redux/model'
import {
  FiEye,
  FiFileText,
  FiHeart,
  FiMessageCircle,
  FiUser,
} from 'react-icons/fi'

const cabinetData = [
  { icon: <FiUser size={25} />, href: '/cabinet', text: 'Інформація' },
  {
    icon: <FiFileText size={25} />,
    href: '/cabinet/orders',
    text: 'Мої замовлення',
  },
  {
    icon: <FiHeart size={25} />,
    href: '/cabinet/wishlist',
    text: 'Список бажань',
  },
  {
    icon: <FiEye size={25} />,
    href: '/cabinet/watched-products',
    text: 'Переглянуті товари',
  },
  {
    icon: <FiMessageCircle size={25} />,
    href: '/cabinet/comments',
    text: 'Мої відгуки',
  },
]

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
      <div className={classes.link}>
        {cabinetData.map((item) => (
          <Link href={item.href} className={classes.cart} key={item.text}>
            {item.icon}
            <h1>{item.text}</h1>
          </Link>
        ))}
      </div>

      <div className={classes.info}>{props.children}</div>
    </div>
  )
}

export default Cart

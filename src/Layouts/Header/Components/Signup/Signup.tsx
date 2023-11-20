// react
import React from 'react'
// router
import Link from 'next/link'
// css
import classes from './Signup.module.css'
// redux
import { useSelector } from 'react-redux'
// custom hook

import { FiUser } from 'react-icons/fi'

const Sighup = () => {
  // check if user is loged in
  const { isLogedIn } = useSelector(
    (state: { auth: { isLogedIn: boolean } }) => state.auth
  )

  if (!isLogedIn) {
    return (
      <Link href="/login" className={classes.mainbox}>
        <button>
          <FiUser size={40} />
        </button>
      </Link>
    )
  }

  return (
    <Link href="/cabinet" className={classes.mainbox}>
      <button>
        <FiUser size={40} />
      </button>
    </Link>
  )
}

export default Sighup

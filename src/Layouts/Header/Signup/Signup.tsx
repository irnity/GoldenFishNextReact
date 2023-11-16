// react
import { type FunctionComponent } from 'react'
// router
import Link from 'next/link'
// css
import classes from './Signup.module.css'
// redux
import { useSelector } from 'react-redux'
// custom hook
import useAuth from '../../../hooks/auth-hook'
import AccountSVG from '@/assets/svg/AccountSVG'
import { FiUser } from 'react-icons/fi'

interface SighupProps {}

const Sighup: FunctionComponent<SighupProps> = () => {
  // check if user is loged in
  const { isLogedIn } = useSelector(
    (state: { auth: { isLogedIn: boolean } }) => state.auth
  )

  if (!isLogedIn) {
    return (
      <div className={classes.signup}>
        <div className={classes.mainbox}>
          <Link href="/login">
            <button>
              <FiUser size={38} />
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.signup}>
      <div className={classes.mainbox}>
        <Link href="/cabinet">
          <button>
            <FiUser size={38} />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Sighup

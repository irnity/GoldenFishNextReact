import { FunctionComponent } from "react"

import classes from "./NavLink.module.css"
import Link from "next/link"

interface LinkProps {
  url: string
  text: string
}

const NavLink: FunctionComponent<LinkProps> = ({ url, text }) => {
  return (
    <div className={classes.box}>
      <Link href={url} className={classes.text}>
        <span>{text}</span>
      </Link>
    </div>
  )
}

export default NavLink

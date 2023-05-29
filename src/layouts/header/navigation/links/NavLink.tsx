import { FunctionComponent } from "react"

import classes from "./NavLink.module.css"
import Link from "next/link"

interface LinkProps {
  url: string
  text: string
  page?: string | undefined
}

const NavLink: FunctionComponent<LinkProps> = ({ url, page, text }) => {
  return (
    <div className={classes.box}>
      <Link
        href={{
          pathname: `${url}`,
          query: { page: `${page}` },
        }}
        className={classes.text}
      >
        <span>{text}</span>
      </Link>
    </div>
  )
}

export default NavLink

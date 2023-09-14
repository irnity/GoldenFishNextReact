import { FunctionComponent } from "react"
import Link from "next/link"
import classes from "./LinkProductButton.module.css"
import { Url } from "next/dist/shared/lib/router/router"

interface LinkProductButtonProps {
  href?: string
  text: string
  button?: () => void
}

const LinkProductButton: FunctionComponent<LinkProductButtonProps> = ({
  href,
  text,
  button,
}) => {
  return (
    <>
      {href !== undefined ? (
        <Link href={href} className={classes.link}>
          <button className={classes.add_button} onClick={button}>
            <span>{text}</span>
          </button>
        </Link>
      ) : (
        <div className={classes.link}>
          <button className={classes.add_button} onClick={button}>
            <span>{text}</span>
          </button>
        </div>
      )}
    </>
  )
}

export default LinkProductButton

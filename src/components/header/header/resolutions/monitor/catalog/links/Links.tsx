import Link from "next/link"
import { FunctionComponent } from "react"
import classes from "./Links.module.css"

interface LinksProps {
  fadeOut: () => void

  catalog: string
}

const Links: FunctionComponent<LinksProps> = ({ fadeOut, catalog }) => {
  return (
    <div className={classes.catalog_link_text}>
      <Link
        href={`/products/${catalog}`}
        className={classes.link}
        onClick={fadeOut}
      >
        {catalog}
      </Link>
    </div>
  )
}

export default Links

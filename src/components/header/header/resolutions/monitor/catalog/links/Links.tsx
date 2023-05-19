import Link from "next/link"
import { FunctionComponent } from "react"
import classes from "./Links.module.css"

interface LinksProps {
  fadeOut: () => void

  catalog: { name: string; url: string }
}

const Links: FunctionComponent<LinksProps> = ({ fadeOut, catalog }) => {
  return (
    <div className={classes.cart}>
      <div className={classes.block}>
        <Link
          href={{
            pathname: `/products/${catalog.url}`,
            query: { page: 1 },
          }}
          className={classes.link}
          onClick={fadeOut}
        >
          &#x2022; {catalog.name}
        </Link>
      </div>
    </div>
  )
}

export default Links

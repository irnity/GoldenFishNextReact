import Link from 'next/link'
import { type FunctionComponent } from 'react'
import classes from './Links.module.css'

interface LinksProps {
  fadeOut: () => void

  catalog: { name: string; url: string }
}

const Links: FunctionComponent<LinksProps> = ({ fadeOut, catalog }) => {
  return (
    <Link
      className={classes.container}
      href={{
        pathname: `/products/${catalog.url}`,
        query: { page: 1 },
      }}
      onClick={fadeOut}
    >
      <div className={classes.block}>
        <div className={classes.link}>
          <h1>{catalog.name}</h1>
        </div>
      </div>
    </Link>
  )
}

export default Links

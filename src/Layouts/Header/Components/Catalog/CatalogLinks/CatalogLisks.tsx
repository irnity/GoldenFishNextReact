import React from 'react'
import classes from './CatalogLisks.module.css'
import Link from 'next/link'

interface Props {
  links: Array<{
    name: string
    url: string
  }>

  toggleHandler: () => void
}

const CatalogLisks = ({ links, toggleHandler }: Props) => {
  return (
    <div className={classes.container}>
      {links.map((data, index) => (
        <Link
          href={`/products/${data.url}`}
          key={index}
          className={classes.item}
          onClick={toggleHandler}
        >
          <span className={classes.text}>{data.name}</span>
        </Link>
      ))}
    </div>
  )
}

export default CatalogLisks

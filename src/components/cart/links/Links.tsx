import { FunctionComponent, useState, useEffect } from "react"
import classes from "./Links.module.css"
import Link from "next/link"

import { cabinetData } from "./CabinetDataLinks"
import { informationData } from "./InformationDataLinks"

interface LinksProps {
  type: string
}

const Links: FunctionComponent<LinksProps> = ({ type }) => {
  const [first, setfirst] = useState<
    {
      href: string
      text: string
    }[]
  >(cabinetData)

  useEffect(() => {
    if (type === "cabinet") {
      setfirst(cabinetData)
    } else if (type === "information") {
      setfirst(informationData)
    }
  }, [type])

  return (
    <div className={classes.links}>
      {first.map((item) => (
        <Link href={item.href} className={classes.cart} key={item.text}>
          {item.text}
        </Link>
      ))}
    </div>
  )
}

export default Links

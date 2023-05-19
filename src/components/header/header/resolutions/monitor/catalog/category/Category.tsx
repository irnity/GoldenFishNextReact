import { FunctionComponent } from "react"
import classes from "./Category.module.css"

interface CatalogListProps {
  toggleNavigationHandler: (data: { name: string; url: string }[]) => void
  title: string

  catalog: { name: string; url: string }[]
}

const CatalogList: FunctionComponent<CatalogListProps> = ({
  toggleNavigationHandler,
  title,
  catalog,
}) => {
  const dataHandler = () => {
    toggleNavigationHandler(catalog)
  }

  return (
    <div className={classes.catalog_section} onClick={dataHandler}>
      <span className={classes.text}>{title}</span>
    </div>
  )
}

export default CatalogList

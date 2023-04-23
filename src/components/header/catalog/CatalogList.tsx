import { FunctionComponent } from "react"
import classes from "./Catalog.module.css"

interface CatalogListProps {
  toggleNavigationHandler: (data: string[]) => void
  title: string
  catalog: string[]
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
      <span className={classes.toggle}>{title}</span>
    </div>
  )
}

export default CatalogList

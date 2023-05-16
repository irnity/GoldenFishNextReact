import { FunctionComponent } from "react"
import classes from "./Category.module.css"

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
      <span className={classes.text}>{title}</span>
    </div>
  )
}

export default CatalogList

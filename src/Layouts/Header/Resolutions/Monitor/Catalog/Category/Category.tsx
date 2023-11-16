import { type FunctionComponent } from 'react'
import classes from './Category.module.css'

interface CatalogListProps {
  toggleNavigationHandler: (data: Array<{ name: string; url: string }>) => void
  title: string

  catalog: Array<{ name: string; url: string }>
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
    <div className={classes.container} onClick={dataHandler}>
      <h1 className={classes.text}>{title}</h1>
    </div>
  )
}

export default CatalogList

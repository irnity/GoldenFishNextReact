import { FunctionComponent } from "react"
import classes from "./SearchHeader.module.css"

interface SearchHeaderProps {}

const SearchHeader: FunctionComponent<SearchHeaderProps> = () => {
  return (
    <div className={classes.search}>
      <input type="text" defaultValue="Search..." />
    </div>
  )
}

export default SearchHeader

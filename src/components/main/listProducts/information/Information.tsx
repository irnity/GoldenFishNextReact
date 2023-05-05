import { FunctionComponent } from "react"
import classes from "./Information.module.css"
import AddProductButton from "../../addProductButton/AddProductButton"

interface InformationProps {
  isAdmin: boolean
  categoryId: string
}

const Information: FunctionComponent<InformationProps> = ({
  isAdmin,
  categoryId,
}) => {
  const capitalized = categoryId.charAt(0).toUpperCase() + categoryId.slice(1)
  return (
    <div className={classes.cart}>
      <div className={classes.title}>
        <p>{capitalized}</p>
      </div>
      <div className={classes.button}>{isAdmin && <AddProductButton />}</div>
    </div>
  )
}

export default Information

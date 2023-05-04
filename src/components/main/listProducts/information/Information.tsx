import { FunctionComponent } from "react"
import classes from "./Information.module.css"
import AddProductButton from "../../addProductButton/AddProductButton"

interface InformationProps {
  isAdmin: boolean
  categoryId: string | string[] | undefined
}

const Information: FunctionComponent<InformationProps> = ({
  isAdmin,
  categoryId,
}) => {
  return (
    <div className={classes.cart}>
      <div className={classes.title}>
        <p>{categoryId}</p>
      </div>
      <div className={classes.button}>{isAdmin && <AddProductButton />}</div>
    </div>
  )
}

export default Information

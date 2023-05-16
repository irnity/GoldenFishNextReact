import { FunctionComponent } from "react"
import classes from "./Information.module.css"
import AddProductButton from "../addProductButton/AddProductButton"

interface InformationProps {
  isAdmin?: boolean
  categoryId: string
  itemId?: string | undefined
}

const Information: FunctionComponent<InformationProps> = ({
  isAdmin,
  categoryId,
  itemId,
}) => {
  const capitalized = categoryId.charAt(0).toUpperCase() + categoryId.slice(1)
  return (
    <div className={classes.cart}>
      <div className={classes.title}>
        <p>{categoryId}</p>
        {itemId && (
          <>
            <p>/</p>
            <p>{itemId}</p>
          </>
        )}
      </div>
      <div className={classes.button}>{isAdmin && <AddProductButton />}</div>
    </div>
  )
}

export default Information

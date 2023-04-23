import { FunctionComponent } from "react"
import Link from "next/link"
import classes from "./AddProductButton.module.css"

interface AddProductButtonProps {}

const AddProductButton: FunctionComponent<AddProductButtonProps> = () => {
  return (
    <div className={classes.add_block}>
      <Link href="add-product">
        <button className={classes.add_button}>Додати товар</button>
      </Link>
    </div>
  )
}

export default AddProductButton

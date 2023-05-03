import { FunctionComponent } from "react"
import Link from "next/link"
import classes from "./AddProductButton.module.css"

interface AddProductButtonProps {}

const AddProductButton: FunctionComponent<AddProductButtonProps> = () => {
  return (
    <div className={classes.add_block}>
      <Link href="/addproduct" className={classes.link}>
        <button className={classes.add_button}>
          <span>Додати товар</span>
        </button>
      </Link>
    </div>
  )
}

export default AddProductButton

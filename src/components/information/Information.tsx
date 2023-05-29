import { FunctionComponent } from "react"
import classes from "./Information.module.css"
import AddProductButton from "../addProductButton/AddProductButton"
import { useRouter } from "next/router"
import Link from "next/link"

interface InformationProps {
  isAdmin?: boolean
}

const Information: FunctionComponent<InformationProps> = ({ isAdmin }) => {
  // const capitalized = categoryId.charAt(0).toUpperCase() + categoryId.slice(1)
  const router: any = useRouter()
  const { categoryId, itemId } = router.query as {
    categoryId: string
    itemId: string
  }
  console.log(router)
  return (
    <div className={classes.cart}>
      <div className={classes.title}>
        <Link href={`/products/${categoryId}`} className={classes.link}>
          <p className={classes.text}>{categoryId}</p>
        </Link>

        {itemId && <p className={classes.text}>{itemId}</p>}
      </div>
      <div className={classes.button}>{isAdmin && <AddProductButton />}</div>
    </div>
  )
}

export default Information

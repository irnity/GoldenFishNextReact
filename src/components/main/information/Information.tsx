import { FunctionComponent } from "react"
import classes from "./Information.module.css"
import AddProductButton from "../addProductButton/AddProductButton"
import { useRouter } from "next/router"

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
        <p>{categoryId}</p>
        {itemId && (
          <>
            <p>:{itemId}</p>
          </>
        )}
      </div>
      <div className={classes.button}>{isAdmin && <AddProductButton />}</div>
    </div>
  )
}

export default Information

import { FunctionComponent } from "react"
import classes from "./Information.module.css"
import { useRouter } from "next/router"
import LinkProductButton from "../linkProductButton/LinkProductButton"

interface InformationProps {
  isAdmin?: boolean
}

const Information: FunctionComponent<InformationProps> = ({ isAdmin }) => {
  const router: any = useRouter()
  const { categoryId, itemId } = router.query as {
    categoryId: string
    itemId: string
  }
  return (
    <div className={classes.cart}>
      <div className={classes.title}>
        <LinkProductButton href={`/products/${categoryId}`} text={categoryId} />
        {itemId && (
          <LinkProductButton
            href={`/products/${categoryId}/${itemId}`}
            text={itemId}
          />
        )}
      </div>
      {isAdmin && <LinkProductButton href="/add_product" text="Додати товар" />}
    </div>
  )
}

export default Information

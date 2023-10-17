import { FunctionComponent } from "react"
import classes from "./Information.module.css"
import { NextRouter, useRouter } from "next/router"
import CustomButton from "../customButton/CustomButton"

interface InformationProps {
  isAdmin?: boolean
}

const Information: FunctionComponent<InformationProps> = ({ isAdmin }) => {
  const router: NextRouter = useRouter()
  const { categoryId, itemId } = router.query as {
    categoryId: string
    itemId: string
  }
  return (
    <div className={classes.cart}>
      <div className={classes.title}>
        <CustomButton
          type="button"
          handler={() => {
            router.push(`/products/${categoryId}`)
          }}
          text={categoryId}
        />
        {itemId && (
          <CustomButton
            type="button"
            handler={() => {
              router.push(`/products/${categoryId}/${itemId}`)
            }}
            text={itemId}
          />
        )}
      </div>
      {isAdmin && (
        <CustomButton
          type="button"
          handler={() => {
            router.push(`/add_product`)
          }}
          text="Додати товар"
        />
      )}
    </div>
  )
}

export default Information

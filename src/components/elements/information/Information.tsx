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
      <div className={classes.categoryId}>
        <CustomButton
          type="button"
          handler={() => {
            router.push(`/products/${categoryId}`)
          }}
          color="white"
          backGroundColor="#2196f3"
          text={categoryId}
        />
      </div>
      {itemId && (
        <div className={classes.itemId}>
          <CustomButton
            type="button"
            handler={() => {
              router.push(`/products/${categoryId}/${itemId}`)
            }}
            color="white"
            backGroundColor="#2196f3"
            text={itemId}
          />
        </div>
      )}

      {isAdmin && (
        <div className={classes.button}>
          <CustomButton
            type="button"
            handler={() => {
              router.push(`/add_product`)
            }}
            color="white"
            backGroundColor="#2196f3"
            text="Додати товар"
          />
        </div>
      )}
    </div>
  )
}

export default Information

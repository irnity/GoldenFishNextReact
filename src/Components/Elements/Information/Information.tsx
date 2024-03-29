import React from 'react'
import classes from './Information.module.css'
import { type NextRouter, useRouter } from 'next/router'
import CustomButton from '../CustomButton/CustomButton'
import { useSelector } from 'react-redux'
import { type IAuth } from '@/Redux/model'
import colors from '@/Assets/Styles/colors'

const Information = () => {
  const router: NextRouter = useRouter()

  const authReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  const { categoryId, itemId } = router.query as {
    categoryId: string
    itemId: string
  }

  const routerHandler = (path: string) => {
    void router.push(path)
  }

  return (
    <div className={classes.cart}>
      <div className={classes.categoryId}>
        <CustomButton
          type="button"
          handler={() => {
            routerHandler(`/products/${categoryId}`)
          }}
          color={colors.Main_White_Color}
          backGroundColor={colors.Main_Blue_Color}
          text={categoryId}
        />
      </div>
      {itemId !== undefined && (
        <div className={classes.itemId}>
          <CustomButton
            type="button"
            handler={() => {
              routerHandler(`/products/${categoryId}/${itemId}`)
            }}
            color={colors.Main_White_Color}
            backGroundColor={colors.Main_Blue_Color}
            text={itemId}
          />
        </div>
      )}

      {authReduxState.isAdmin && (
        <div className={classes.button}>
          <CustomButton
            type="button"
            handler={() => {
              routerHandler(`/add_product`)
            }}
            color={colors.Main_White_Color}
            backGroundColor={colors.Main_Blue_Color}
            text="Додати товар"
          />
        </div>
      )}
    </div>
  )
}

export default Information

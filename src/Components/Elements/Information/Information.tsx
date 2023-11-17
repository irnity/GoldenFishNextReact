import React from 'react'
import classes from './Information.module.css'
import { type NextRouter, useRouter } from 'next/router'
import CustomButton from '../CustomButton/CustomButton'
import { useSelector } from 'react-redux'
import { type IAuth } from '@/Redux/model'

const Information = () => {
  const router: NextRouter = useRouter()

  const { isAdmin } = useSelector((state: { auth: IAuth }) => state.auth)

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
          color="white"
          backGroundColor="#2196f3"
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
              routerHandler(`/add_product`)
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

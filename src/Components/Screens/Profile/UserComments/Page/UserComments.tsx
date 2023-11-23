import React, { useState, useEffect } from 'react'
import classes from './UserComments.module.css'

import { warningActions } from '@/Redux/warningSlice'
import { type IAuth, type IProduct } from '@/Redux/model'
import { useDispatch, useSelector } from 'react-redux'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/Services/Firebase/firebase'
import CommentsList from '@/Components/Screens/Product/Components/CommentsList/CommentsList'

const UserComments = () => {
  const [data, setdata] = useState<IProduct[]>([])
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  const authReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  useEffect(() => {
    if (
      authReduxState.email === undefined ||
      authReduxState.email === '' ||
      authReduxState.email === null
    ) {
      return
    }

    setloading(true)

    const favoriteProductsCollectionRef = collection(
      db,
      'users',
      authReduxState.email,
      'comments'
    )

    const fetch = async () => {
      try {
        const favoriteProductsCollection = await getDocs(
          favoriteProductsCollectionRef
        )

        const favoriteProducts = favoriteProductsCollection.docs.map((doc) =>
          doc.data()
        ) as any

        console.log(favoriteProducts)

        setloading(false)
        setdata(favoriteProducts)
      } catch (error) {
        console.log(error)
        dispatch(
          warningActions.setWarning({
            code: 500,
            message: 'Помилка завантаження',
          })
        )
      }
    }
    void fetch()
  }, [])
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Коментарі</h1>
      </div>
      {loading ? (
        <div className={classes.loading}>
          <h1>Завантаження</h1>
        </div>
      ) : data.length === 0 ? (
        <div className={classes.loading}>
          <h1>Коментарів немає</h1>
        </div>
      ) : (
        <div className={classes.favorites}>
          <CommentsList data={data} />
        </div>
      )}
    </div>
  )
}

export default UserComments

import React, { useState, useEffect } from 'react'
import classes from './UserFavorite.module.css'
import { doc, collection, getDoc, getDocs } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { type IProduct, type IAuth } from '@/Redux/model'
import { db, storage } from '@/Services/Firebase/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import Products from '@/Components/Screens/ListProducts/Components/Products/Products'
import { warningActions } from '@/Redux/warningSlice'

const UserFavorite = () => {
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
      'favoriteProducts'
    )

    const fetch = async () => {
      try {
        const favoriteProductsCollection = await getDocs(
          favoriteProductsCollectionRef
        )

        const favoriteProducts = favoriteProductsCollection.docs.map((doc) =>
          doc.data()
        ) as Array<{
          id: string
          createdAt: string
        }>

        const products: IProduct[] = []
        await Promise.all(
          favoriteProducts.map(async (item) => {
            const productRef = doc(db, 'products', item.id)
            const productData = await getDoc(productRef)
            const product = productData.data() as IProduct

            const imageRef = ref(storage, `productImages/${product.code}`)
            const imageUrl = await getDownloadURL(imageRef)
            product.image = imageUrl

            products.push(product)
          })
        )
        setloading(false)
        setdata(products)
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
        <h1>Список Бажань</h1>
      </div>
      {loading ? (
        <div className={classes.loading}>
          <h1>Завантаження</h1>
        </div>
      ) : data.length === 0 ? (
        <div className={classes.loading}>
          <h1>Бажаних немає</h1>
        </div>
      ) : (
        <div className={classes.favorites}>
          <Products products={data} />
        </div>
      )}
    </div>
  )
}

export default UserFavorite

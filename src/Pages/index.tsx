import React, { type FunctionComponent } from 'react'
import classes from './index.module.css'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '@/services/firebase/firebase'
import { type IProduct } from '@/redux/model'
interface HomePageProps {
  fishingrod: IProduct[]
  hooks: IProduct[]
}

const HomePage: FunctionComponent<HomePageProps> = ({ fishingrod, hooks }) => {
  return (
    // <div className={classes.cart}>
    //   <div className={classes.list}>
    //     <h1>Вудки</h1>
    //     <Products products={fishingrod} />
    //   </div>
    //   <div className={classes.list}>
    //     <h1>Гачки</h1>
    //     <Products products={hooks} />
    //   </div>
    // </div>
    <div className={classes.cart}>
      <h1>Home Page</h1>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  // запит до API або бази даних для отримання списку постів

  try {
    // get collection
    // first page

    const fishingrodCollectionRef = query(
      collection(db, `store`, `fishingrod`, 'items'),
      limit(3)
    )

    const fishingrod = await getDocs(fishingrodCollectionRef)

    // docs to data
    const fishingrodFilteredData = fishingrod.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))

    const hooksCollectionRef = query(
      collection(db, `store`, `hooks`, 'items'),
      limit(3)
    )

    const hooks = await getDocs(hooksCollectionRef)

    // docs to data
    const hooksFilteredData = hooks.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))

    return {
      props: {
        fishingrod: fishingrodFilteredData,
        hooks: hooksFilteredData,
      },
      // revalidate: 30,
    }
  } catch (err) {
    console.error(err)
  }
}

export default HomePage

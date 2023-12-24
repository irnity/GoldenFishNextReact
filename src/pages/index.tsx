import React, { type FunctionComponent } from 'react'
import classes from './index.module.css'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '@/Services/Firebase/firebase'
import { type IProduct } from '@/Redux/model'
// interface HomePageProps {
//   fishingrod: IProduct[]
//   hooks: IProduct[]
// }

const HomePage = () => {
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

export default HomePage

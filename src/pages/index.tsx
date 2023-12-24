import React, { type FunctionComponent } from 'react'
import classes from './index.module.css'
import Products from '@/Components/Screens/ListProducts/Components/Products/Products'
import { type IProduct } from '@/Redux/model'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db, storage } from '@/Services/Firebase/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import Link from 'next/link'
interface HomePageProps {
  data: IProduct[]
  hooks: IProduct[]
}

const HomePage: FunctionComponent<HomePageProps> = ({ data, hooks }) => {
  return (
    <div className={classes.cart}>
      <div className={classes.list}>
        <Link href={'/products/fishingrod'} className={classes.link}>
          <h1 className={classes.text}>Вудки</h1>
        </Link>
        <Products products={data} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const baseQuery = query(
      collection(db, `products`),
      where('category', '==', 'fishingrod'),
      limit(9)
    )

    const unfilteredData = await getDocs(baseQuery)
    const filteredData: IProduct[] = unfilteredData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    })) as IProduct[]

    const filteredDataWithImages = await Promise.all(
      filteredData.map(async (product) => {
        const imageRef = ref(storage, `productImages/${product.id}`)
        try {
          const url = await getDownloadURL(imageRef)
          product.image = url
        } catch (error) {
          console.error('Error loading image:', error)
        }
        return product
      })
    )

    return {
      props: {
        data: filteredDataWithImages,
      },
    }
  } catch (err) {
    console.error(err)
  }
}

export default HomePage

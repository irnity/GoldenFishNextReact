// components
import Product from '@/Components/Screens/Product/Pages/Main/Product'

// react
import React, { useEffect } from 'react'

// redux
import { type IComment, type IProduct } from '@/Redux/model'

// firebase
import { db, storage } from '@/Services/Firebase/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { productsActions } from '@/Redux/productsSlice'
import Products from '@/Components/Screens/ListProducts/Components/Products/Products'
import { getDownloadURL, ref } from 'firebase/storage'

interface ItemProps {
  data: IProduct
  commentsCount: number
  commentsData: IComment[]
  advertising: IProduct[]
}

const Item = ({
  data,
  commentsData,
  commentsCount,
  advertising,
}: ItemProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productsActions.replaceProduct(data))
  }, [data, dispatch])

  return (
    <div
      style={{
        marginBottom: 100,
      }}
    >
      <Product
        data={data}
        commentsCount={commentsCount}
        commentsData={commentsData.slice(0, 3) ?? []}
      />
      <h1>Рекомендовані товари</h1>
      <div
        style={{
          borderTop: '1px solid rgba(0, 0, 0, 0.3)',
        }}
      >
        <Products products={advertising} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  // get url
  const { categoryId, itemId } = context.params

  let productFiltered: IProduct | [] = []
  let commentsFiltered: IComment[] = []

  try {
    // product
    const productQuery = doc(db, 'products', itemId)
    const productUnfiltered = await getDoc(productQuery)
    productFiltered = productUnfiltered.data() as IProduct

    const imageRef = ref(storage, `productImages/${productFiltered.code}`) // image ID.
    const url = await getDownloadURL(imageRef)
    productFiltered.image = url

    // comments
    const commentsQuery = query(collection(db, 'products', itemId, 'comments'))
    const commentsUnfiltered = await getDocs(commentsQuery)
    commentsFiltered = commentsUnfiltered.docs.map((doc) => ({
      id: doc.id,
      comment: doc.data().comment,
      date: doc.data().date,
      email: doc.data().email,
      name: doc.data().name,
      negative: doc.data().negative,
      positive: doc.data().positive,
      rate: doc.data().rate,
    }))
  } catch (error) {
    console.log(error)
  }

  //
  // need fix
  //
  let advertisingFiltered: any = []
  try {
    const advertisingQuery = query(
      collection(db, `products`),
      where('category', '==', categoryId),
      limit(6)
    )
    const advertisingUnfiltered = await getDocs(advertisingQuery)
    advertisingFiltered = advertisingUnfiltered.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))
    advertisingFiltered = advertisingFiltered.filter(
      (item: any) => item.id !== itemId
    )
    advertisingFiltered = advertisingFiltered.sort(() => Math.random() - 0.5)
    advertisingFiltered = advertisingFiltered.slice(0, 4)

    advertisingFiltered = await Promise.all(
      advertisingFiltered.map(async (product: { id: any; image: string }) => {
        const imageRef = ref(storage, `productImages/${product.id}`) // Assuming each product has its own image ID.
        try {
          const url = await getDownloadURL(imageRef)
          product.image = url
        } catch (error) {
          console.error('Error loading image:', error)
        }
        return product
      })
    )
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      // product
      data: productFiltered,
      // comments
      commentsData: commentsFiltered,
      commentsCount: commentsFiltered.length,
      // advertising
      advertising: advertisingFiltered,
    },
  }
}

export default Item

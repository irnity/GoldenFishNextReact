// react
import React from 'react'

// firebase
import {
  getDocs,
  query,
  limit,
  collection,
  startAfter,
  getCountFromServer,
  where,
  orderBy,
} from 'firebase/firestore'
import { db, storage } from '../../../services/firebase/firebase'
import { getDownloadURL, ref } from 'firebase/storage'

import { type IProduct } from '@/Redux/model'

import ListProducts from '@/Components/Screens/ListProducts/Page/ListProducts'

interface ProductsListProps {
  data: IProduct[]
  totalProducts: number
}

const ProductsList = ({ data, totalProducts }: ProductsListProps) => {
  return <ListProducts products={data} totalProducts={totalProducts} />
}

export async function getServerSideProps(context: any) {
  const categoryId = context.params.categoryId

  const { page, sort, inStock, price } = context.query as {
    page: string
    sort: string
    inStock: string
    price: string
  }

  const inStockQuaryArray = inStock === undefined ? [] : inStock.split(',')

  const priceQuaryArray = price === undefined ? [] : price.split(',')

  let baseQuery = query(
    collection(db, `products`),
    where('category', '==', categoryId)
  )

  if (inStockQuaryArray.includes('available')) {
    baseQuery = query(baseQuery, where('weCanSell', '==', true))
  }
  if (inStockQuaryArray.includes('out_of_stock')) {
    baseQuery = query(baseQuery, where('weCanSell', '==', false))
  }

  if (priceQuaryArray.length === 2) {
    baseQuery = query(
      baseQuery,
      where('price', '>=', parseInt(priceQuaryArray[0])),
      where('price', '<=', parseInt(priceQuaryArray[1]))
    )
  }

  switch (sort) {
    // case "rating":
    //   baseQuery = query(baseQuery, orderBy("totalComments", "desc"))
    //   break
    case 'asc':
      baseQuery = query(baseQuery, orderBy('price', 'asc'))
      break
    case 'desc':
      baseQuery = query(baseQuery, orderBy('price', 'desc'))
      break
    default:
      baseQuery = query(baseQuery)
      break
  }

  try {
    const snapshot = await getCountFromServer(baseQuery)
    const totalProducts = snapshot.data().count

    if (page !== '' && +page > 1) {
      baseQuery = query(baseQuery, limit(12 * (+page - 1)))
      const previesData = await getDocs(baseQuery)
      const lastVisible = previesData.docs[previesData.docs.length - 1]

      baseQuery = query(baseQuery, startAfter(lastVisible), limit(12))
    } else {
      baseQuery = query(baseQuery, limit(12))
    }

    const unfilteredData = await getDocs(baseQuery)
    const filteredData: IProduct[] = unfilteredData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    })) as IProduct[]

    const filteredDataWithImages = await Promise.all(
      filteredData.map(async (product) => {
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

    return {
      props: {
        data: filteredDataWithImages,
        totalProducts,
      },
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        ok: false,
        reason:
          'some error description for your own consumption, not for client side',
      },
    }
  }
}

export default ProductsList

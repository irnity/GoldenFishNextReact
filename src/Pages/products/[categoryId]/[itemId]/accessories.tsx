import React from 'react'
import Cart from '@/Components/Screens/Product/Components/Cart/Cart'
import Accessories from '@/Components/Screens/Product/Pages/Accessories/Accessories'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase/firebase'
import { type IProduct } from '@/Redux/model'

interface AccessoriesPageProps {
  data: IProduct
}

const AccessoriesPage = ({ data }: AccessoriesPageProps) => {
  return (
    <Cart product={data}>
      <Accessories />
    </Cart>
  )
}

export async function getServerSideProps(context: any) {
  const { itemId } = context.params

  const productsCollectionRef = doc(db, 'products', `${itemId}`)

  const data = await getDoc(productsCollectionRef)

  const filteredData = data.data()

  return {
    props: {
      data: filteredData,
    },
  }
}

export default AccessoriesPage

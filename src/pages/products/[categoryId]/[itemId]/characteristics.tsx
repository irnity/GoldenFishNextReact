import React from 'react'
import Characteristics from '@/Components/Screens/Product/Pages/Characteristics/Characteristics'
import Cart from '@/Components/Screens/Product/Components/Cart/Cart'
import { doc, getDoc } from 'firebase/firestore'
import { db, storage } from '@/services/firebase/firebase'
import { type IProduct } from '@/Redux/model'
import { getDownloadURL, ref } from 'firebase/storage'

interface CharacteristicsPageProps {
  data: IProduct
}

const CharacteristicsPage = ({ data }: CharacteristicsPageProps) => {
  return (
    <Cart product={data}>
      <Characteristics characteristics={data} />
    </Cart>
  )
}

export async function getServerSideProps(context: any) {
  const { itemId } = context.params

  const productsCollectionRef = doc(db, 'products', `${itemId}`)

  const data = await getDoc(productsCollectionRef)

  const filteredData = data.data() as IProduct

  const imageRef = ref(storage, `productImages/${filteredData.code}`) // Assuming each product has its own image ID.
  const url = await getDownloadURL(imageRef)
  filteredData.image = url

  return {
    props: {
      data: filteredData,
    },
  }
}

export default CharacteristicsPage

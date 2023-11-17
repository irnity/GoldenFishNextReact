import Total from '@/Components/Screens/Total/Total'
import { type IProduct } from '@/Redux/model'
import { db } from '@/Services/Firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'

interface TotalPageProps {
  data: IProduct[]
}

const TotalPage = ({ data }: TotalPageProps) => {
  console.log(data)
  return <Total data={data} />
}

export async function getServerSideProps(context: any) {
  // const id = context.params.categoryId
  try {
    const fishingrodCollectionRef = collection(db, `products`)

    const fishingrod = await getDocs(fishingrodCollectionRef)

    // docs to data
    const fishingrodFilteredData = fishingrod.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))

    return {
      props: {
        data: fishingrodFilteredData,
      },
    }
  } catch (err) {
    console.error(err)
  }
}

export default TotalPage

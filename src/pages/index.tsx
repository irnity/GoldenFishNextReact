import React, { FunctionComponent } from "react"
import classes from "./index.module.css"
import ListProducts from "@/components/main/listProducts/ListProducts"
import { collection, getDocs, limit, query } from "firebase/firestore"
import { db } from "@/config/firebase"
import { IProduct } from "@/store/model"
import Products from "@/components/main/listProducts/products/Products"
import Home from "@/components/main/home/Home"

interface HomePageProps {
  fishingrod: IProduct[]
  hooks: IProduct[]
}

const HomePage: FunctionComponent<HomePageProps> = ({ fishingrod, hooks }) => {
  return (
    <div style={{ width: "90%" }}>
      <div>удочки</div>
      <Home products={fishingrod} />
      <div>крючки</div>
      <Home products={hooks} />
    </div>
  )
}

export async function getServerSideProps(context: any) {
  // запит до API або бази даних для отримання списку постів

  try {
    // get collection
    // first page

    const fishingrodCollectionRef = query(
      collection(db, `store`, `fishingrod`, "items"),
      limit(9)
    )

    const fishingrod = await getDocs(fishingrodCollectionRef)

    // docs to data
    const fishingrodFilteredData = fishingrod.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.toString(),
    }))

    const hooksCollectionRef = query(
      collection(db, `store`, `hooks`, "items"),
      limit(9)
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

import Total from "@/components/screens/total/Total"
import { IProduct } from "@/redux/model"
import { db } from "@/services/firebase/firebase"
import { collection, getCountFromServer, getDocs } from "firebase/firestore"
import { FunctionComponent } from "react"

interface TotalPageProps {
  data: IProduct[]
}

const TotalPage: FunctionComponent<TotalPageProps> = ({ data }) => {
  console.log(data)
  return <Total data={data} />
}

export async function getServerSideProps(context: any) {
  // запит до API або бази даних для отримання списку постів
  const id = context.params.categoryId
  try {
    // get collection
    // first page

    const fishingrodCollectionRef = collection(db, `store`, `${id}`, "items")

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

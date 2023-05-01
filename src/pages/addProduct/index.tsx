import React, { FunctionComponent } from "react"
import NewProductForm from "../../components/main/newProductForm/NewProductForm"
import { useRouter } from "next/router"

interface NewProductPageProps {}

const NewProductPage: FunctionComponent<NewProductPageProps> = () => {
  const router = useRouter()
  const addMeetupHadler = async (enteredMeetupData: any) => {
    const responce = await fetch("/api/newproduct", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
    })

    const result = await responce.json()

    console.log(result)
    router.push("/home")
  }
  return <NewProductForm onAddMeetup={addMeetupHadler} />
}

export default NewProductPage

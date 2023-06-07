import React, { FunctionComponent } from "react"
import NewProductForm from "../../features/newProductForm/NewProductForm"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

interface NewProductPageProps {}

const NewProductPage: FunctionComponent<NewProductPageProps> = () => {
  const router = useRouter()

  const { isLogedIn, isAdmin, userInfo } = useSelector(
    (state: {
      auth: { isLogedIn: boolean; isAdmin: boolean; userInfo: string }
    }) => state.auth
  )

  const addMeetupHadler = async (enteredMeetupData: any) => {
    const responce = await fetch("/api/newproduct", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
    })

    const result = await responce.json()

    console.log(result)
    router.push("/")
  }
  return <NewProductForm onAddMeetup={addMeetupHadler} />
}

export default NewProductPage

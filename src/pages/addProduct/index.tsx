import React, { FunctionComponent } from "react"
import NewProductForm from "../../components/main/newProductForm/NewProductForm"

interface NewProductPageProps {}

const NewProductPage: FunctionComponent<NewProductPageProps> = () => {
  const addMeetupHadler = async (enteredMeetupData: any) => {
    const responce = await fetch("/api/newproduct", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
    })

    const ff = await responce.json()

    console.log(ff)
  }
  // dispatch(productsActions.addProduct())
  // router.push("/home")
  return <NewProductForm onAddMeetup={addMeetupHadler} />
}

export default NewProductPage

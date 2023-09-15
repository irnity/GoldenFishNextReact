import React, { FunctionComponent } from "react"
import NewProductForm from "@/components/screens/newProductForm/page/NewProductForm"
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

  return <NewProductForm />
}

export default NewProductPage

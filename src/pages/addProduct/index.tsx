import React, { FunctionComponent } from "react"
import NewProductForm from "../../components/main/newProductForm/NewProductForm"

interface NewProductPageProps {}

const NewProductPage: FunctionComponent<NewProductPageProps> = () => {
  return <NewProductForm method={"post"} />
}

export default NewProductPage

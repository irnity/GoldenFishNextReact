import { FunctionComponent } from "react"
import Card from "../card/Card"

import ListProducts from "../listProducts/ListProducts"

import { ProductList } from "@/store/model"

interface MainProps {
  data: ProductList[]
}

const Main: FunctionComponent<MainProps> = (props) => {
  return (
    <Card>
      <ListProducts data={props.data} />
    </Card>
  )
}

export default Main

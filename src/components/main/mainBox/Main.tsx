import { FunctionComponent } from "react"
import Card from "../card/Card"

import ListProducts from "../listProducts/ListProducts"

interface MainProps {}

const Main: FunctionComponent<MainProps> = () => {
  return (
    <Card>
      <ListProducts />
    </Card>
  )
}

export default Main

import { FunctionComponent } from "react"
import Characteristics from "@/components/screens/product/pages/characteristics/Characteristics"
import Cart from "@/components/screens/product/components/cart/Cart"

interface CharacteristicsPageProps {}

const CharacteristicsPage: FunctionComponent<CharacteristicsPageProps> = () => {
  return (
    <Cart>
      <Characteristics />
    </Cart>
  )
}

export default CharacteristicsPage

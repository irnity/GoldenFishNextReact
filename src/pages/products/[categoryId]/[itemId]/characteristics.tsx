import { FunctionComponent } from "react"
import Characteristics from "@/components/screens/product/about/tabs/characteristics/Characteristics"
import Cart from "@/components/screens/product/about/cart/Cart"

interface CharacteristicsPageProps {}

const CharacteristicsPage: FunctionComponent<CharacteristicsPageProps> = () => {
  return (
    <Cart>
      <Characteristics />
    </Cart>
  )
}

export default CharacteristicsPage

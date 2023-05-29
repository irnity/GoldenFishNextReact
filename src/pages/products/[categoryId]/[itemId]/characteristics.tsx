import { FunctionComponent } from "react"
import Characteristics from "@/features/product/about/tabs/characteristics/Characteristics"
import Cart from "@/features/product/about/cart/Cart"

interface CharacteristicsPageProps {}

const CharacteristicsPage: FunctionComponent<CharacteristicsPageProps> = () => {
  return (
    <Cart>
      <Characteristics />
    </Cart>
  )
}

export default CharacteristicsPage

import { FunctionComponent } from "react"
import Characteristics from "@/components/main/product/about/info/Characteristics"
import Cart from "@/components/main/product/about/cart/Cart"

interface CharacteristicsPageProps {}

const CharacteristicsPage: FunctionComponent<CharacteristicsPageProps> = () => {
  return (
    <Cart>
      <Characteristics />
    </Cart>
  )
}

export default CharacteristicsPage

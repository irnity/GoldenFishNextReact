import { FunctionComponent } from "react"

import Cart from "@/components/main/product/about/cart/Cart"
import Characteristics from "@/components/main/product/about/info/Characteristics"

interface VideoPageProps {}

const VideoPage: FunctionComponent<VideoPageProps> = () => {
  return (
    <Cart>
      <Characteristics />
    </Cart>
  )
}

export default VideoPage

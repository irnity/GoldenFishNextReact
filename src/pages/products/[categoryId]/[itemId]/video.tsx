import { FunctionComponent } from "react"

import Cart from "@/components/screens/product/about/cart/Cart"
import Video from "@/components/screens/product/about/tabs/video/Video"
interface VideoPageProps {}

const VideoPage: FunctionComponent<VideoPageProps> = () => {
  return (
    <Cart>
      <Video />
    </Cart>
  )
}

export default VideoPage

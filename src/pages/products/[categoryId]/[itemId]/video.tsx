import { FunctionComponent } from "react"

import Cart from "@/features/product/about/cart/Cart"
import Video from "@/features/product/about/tabs/video/Video"

interface VideoPageProps {}

const VideoPage: FunctionComponent<VideoPageProps> = () => {
  return (
    <Cart>
      <Video />
    </Cart>
  )
}

export default VideoPage

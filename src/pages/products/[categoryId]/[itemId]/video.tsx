import { FunctionComponent } from "react"

import Cart from "@/components/screens/product/components/cart/Cart"
import Video from "@/components/screens/product/pages/video/Video"
interface VideoPageProps {}

const VideoPage: FunctionComponent<VideoPageProps> = () => {
  return (
    <Cart>
      <Video />
    </Cart>
  )
}

export default VideoPage

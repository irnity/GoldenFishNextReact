import React, { FunctionComponent } from "react"
import ReactDOM from "react-dom"
import Backdrop from "./Backdrop"
import ModalOverlay from "./ModalOverlay"

interface BasketOverlayProps {
  onConfirm: () => void
}

const BasketOverlay: FunctionComponent<BasketOverlayProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-overlay-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={props.onConfirm} />,
        document.getElementById("basket-overlay-root") as HTMLElement
      )}
    </React.Fragment>
  )
}

export default BasketOverlay

import classes from "./Basket.module.css"
import React, { FunctionComponent } from "react"
interface BackdropProps {
  onConfirm: () => void
}

const Backdrop: FunctionComponent<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />
}

export default Backdrop
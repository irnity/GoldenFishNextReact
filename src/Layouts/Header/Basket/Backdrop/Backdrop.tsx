import classes from './Backdrop.module.css'
import React, { type FunctionComponent } from 'react'
interface BackdropProps {
  onConfirm: () => void
}

const Backdrop: FunctionComponent<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />
}

export default Backdrop

import React from 'react'
import classes from './CustomBackground.module.css'

interface Props {
  handler: () => void
  zIndex?: number
  top?: number
}

const CustomBackground = (props: Props) => {
  return (
    <div
      className={classes.background}
      style={{ zIndex: props.zIndex, top: props.top }}
      onClick={props.handler}
    ></div>
  )
}

export default CustomBackground

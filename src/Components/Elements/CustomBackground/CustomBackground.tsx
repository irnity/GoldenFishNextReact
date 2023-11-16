import React from 'react'
import classes from './CustomBackground.module.css'

interface Props {
  handler: () => void
}

const CustomBackground = (props: Props) => {
  return <div className={classes.background} onClick={props.handler}></div>
}

export default CustomBackground

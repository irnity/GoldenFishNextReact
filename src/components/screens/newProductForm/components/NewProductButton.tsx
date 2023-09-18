import React from "react"
import classes from "./NewProductButton.module.css"

type Props = {
  type: "button" | "submit" | "reset"
  color?: string
  handler?: () => void
  text: string
}

function NewProductButton(props: Props) {
  return (
    <button
      type={props.type}
      style={{ backgroundColor: props.color }}
      className={classes.addParamButton}
      onClick={props.handler}
    >
      {props.text}
    </button>
  )
}

export default NewProductButton

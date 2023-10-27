import React from "react"
import classes from "./CustomButton.module.css"

type Props = {
  type: "button" | "submit" | "reset"
  color?: string
  backGroundColor?: string
  handler?: () => void
  text?: string
  svg?: React.ReactNode
  disabled?: boolean
}

function CustomButton(props: Props) {
  return (
    <button
      type={props.type}
      style={{ color: props.color, backgroundColor: props.backGroundColor }}
      className={classes.addParamButton}
      onClick={props.handler}
      disabled={props.disabled}
    >
      {props.svg && (
        <div
          style={{
            marginRight: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {props.svg}
        </div>
      )}

      {props.text}
    </button>
  )
}

export default CustomButton

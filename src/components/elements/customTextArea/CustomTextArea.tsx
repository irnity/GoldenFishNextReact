import React from "react"
import classes from "./CustomTextArea.module.css"

type Props = {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  name: string
  required?: boolean
  value?: string
}

const CustomTextArea = (props: Props) => {
  return (
    <div className={classes.container}>
      <label htmlFor={props.name}>{props.name}</label>

      <textarea
        id={props.name}
        required={props.required}
        className={classes.textarea}
        placeholder={props.name}
        rows={4}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export default CustomTextArea

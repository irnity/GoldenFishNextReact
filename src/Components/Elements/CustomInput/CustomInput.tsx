import React from 'react'
import styles from './CustomInput.module.css'

interface Props {
  type: string
  name?: string
  required: boolean
  placeholder?: string
  value?: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  max?: number
  onFocus?: () => void
}

const CustomInput = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.name !== undefined && (
        <label htmlFor={props.name}>
          <h1>{props.name}</h1>
        </label>
      )}
      <input
        id={props.name}
        type={props.type}
        name={props?.name}
        required={props.required}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        max={props.max}
        min={0}
        onFocus={props.onFocus}
      />
    </div>
  )
}

export default CustomInput

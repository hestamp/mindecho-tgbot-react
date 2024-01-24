import React from 'react'
import styles from './MyInput.module.css'
const MyInput = ({ type, style, onChange, value, ...rest }) => {
  return (
    <input
      onChange={onChange}
      type={type || 'text'}
      value={value}
      className={`${styles.Input} ${style ? style : ''}`}
      {...rest}
    />
  )
}

export default MyInput

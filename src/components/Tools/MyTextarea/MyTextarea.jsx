import React from 'react'
import styles from './MyTextarea.module.css'
const MyTextarea = ({ type, style, onChange, value, ...rest }) => {
  return (
    <textarea
      onChange={onChange}
      type={type || 'text'}
      value={value}
      rows={12}
      style={{ whiteSpace: 'pre-wrap' }}
      className={`${styles.Input} ${style ? style : ''}`}
      {...rest}
    />
  )
}

export default MyTextarea

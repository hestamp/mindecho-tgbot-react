import React from 'react'
import styles from './OneEchoPage.module.css'
import { useNavigate } from 'react-router-dom'
const OneEchoPage = () => {
  const navigate = useNavigate()
  const handleGuideCompletion = () => {
    localStorage.setItem('guide', 'true')
    navigate('/main')
  }
  return (
    <div className="dis">
      OneEchoPage
      <button onClick={handleGuideCompletion}>Complete Guide</button>
    </div>
  )
}

export default OneEchoPage

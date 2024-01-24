import { useEffect, useMemo, useState } from 'react'

import styles from './App.module.css'

import { Routes, Route, useNavigate } from 'react-router-dom'

import UserComponent from './components/UserComponent/UserComponent'
import MainPage from './pages/Main/MainPage'
import OneEchoPage from './pages/OneEcho/OneEchoPage'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const guideCompleted = localStorage.getItem('guide') === 'true'
    navigate(guideCompleted ? '/main' : '/')
    // localStorage.setItem('guide', 'false')
  }, [navigate])

  return (
    <div className={styles.App}>
      <div className={styles.appBlock}>
        <div className={styles.mainpage}>
          {/* <UserComponent /> */}
          <div className={styles.paddingblock}>
            <h4>Good to see you again, Tom!</h4>
            <p>Dont forget to repeat learned echos</p>
          </div>
          <Routes>
            <Route exact path="/main" element={<MainPage />} />
            <Route exact path="/" element={<OneEchoPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App

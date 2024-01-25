import { useEffect, useMemo, useState } from 'react'

import styles from './App.module.css'

import { Routes, Route, useNavigate } from 'react-router-dom'

import UserComponent from './components/UserComponent/UserComponent'
import MainPage from './pages/Main/MainPage'
import OneEchoPage from './pages/OneEcho/OneEchoPage'
import { telegramApp, useTelegram } from './hooks/useTelegram'
import {
  useMyLogic,
  useMyMainContext,
  useMyTelegram,
  useMyToaster,
} from './storage/StorageContext'

function App() {
  const navigate = useNavigate()

  const { myTelegram, uMyTelegram } = useMyTelegram()

  const { checkrunAndExpand, user, userUnsafe, queryId, onToggleButton } =
    useTelegram()

  useEffect(() => {
    checkrunAndExpand()
    if (telegramApp) {
      console.log(telegramApp)
      // changeMainButt()
      telegramApp.MainButton.show()
      telegramApp.MainButton.enable()
    }
  }, [])

  const { successToast } = useMyToaster()

  const { uEchoModal, uCrudMode } = useMyLogic()

  useEffect(() => {
    const guideCompleted = localStorage.getItem('guide') === 'true'
    navigate(guideCompleted ? '/main' : '/')
    // localStorage.setItem('guide', 'false')
  }, [navigate])

  const changeMainButt = () => {
    if (telegramApp?.MainButton) {
      telegramApp.MainButton.hide()

      telegramApp.MainButton.setParams({
        text: 'Create echo',
        color: '#6fa1bff',
        text_color: '#FFFFFF',
        is_active: true,
        is_visible: true,
      })

      telegramApp.MainButton.show()
    }
  }

  const clickMyButt = () => {
    telegramApp.MainButton.offClick(activateEchoCreator)
    telegramApp.MainButton.onClick(successToasterNotif)
  }

  const successToasterNotif = () => {
    successToast('button clicked')
  }

  const activateEchoCreator = () => {
    uCrudMode('create')
    uEchoModal(true)
  }

  const newFunction = () => {
    telegramApp.MainButton.offClick(successToasterNotif)
    telegramApp.MainButton.onClick(activateEchoCreator)
  }

  const showHideMain = () => {
    if (telegramApp) {
      if (telegramApp.MainButton.isActive) {
        telegramApp.MainButton.hide()
      } else {
        telegramApp.MainButton.show()
      }
    }
  }

  const removeFuncs = () => {
    telegramApp.MainButton.offClick(successToasterNotif)
    telegramApp.MainButton.offClick(activateEchoCreator)
  }

  return (
    <div className={styles.App}>
      <div className={styles.appBlock}>
        <div className={styles.mainpage}>
          <button className={styles.testbutt} onClick={onToggleButton}>
            Toggle main button
          </button>
          <button className={styles.testbutt} onClick={changeMainButt}>
            My butt
          </button>
          <button className={styles.testbutt} onClick={removeFuncs}>
            Remove all of the func
          </button>
          <button className={styles.testbutt} onClick={clickMyButt}>
            Toarter func
          </button>
          <button className={styles.testbutt} onClick={newFunction}>
            Creating new Echo
          </button>
          <button className={styles.testbutt} onClick={showHideMain}>
            Show hide butt
          </button>
          {/* <UserComponent /> */}
          {telegramApp?.initData ? (
            <p>{JSON.stringify(telegramApp?.initData)} </p>
          ) : (
            <></>
          )}
          <div className={styles.maininfo}>
            {telegramApp?.initDataUnsafe ? (
              <p>{JSON.stringify(telegramApp?.initDataUnsafe)} </p>
            ) : (
              <></>
            )}
            {telegramApp ? (
              <p>Platform telegram: {telegramApp.platform}</p>
            ) : (
              <></>
            )}
          </div>
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

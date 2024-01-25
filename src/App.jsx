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

  const { mainButtFunc, uMainButtFunc } = useMyLogic()

  useEffect(() => {
    checkrunAndExpand()
    if (telegramApp.platform != 'unknown') {
      console.log(telegramApp.platform)
      console.log(telegramApp)

      telegramApp.MainButton.show()
      telegramApp.MainButton.enable()
    }
    newFunctions()
    changeMainButt() // Set the MainButton parameters
    activateAll()
  }, [])

  const { successToast } = useMyToaster()

  const { uEchoModal, uCrudMode } = useMyLogic()

  useEffect(() => {
    console.log('run this func')
    const guideCompleted = localStorage.getItem('guide') === 'true'
    navigate(guideCompleted ? '/main' : '/')
    // localStorage.setItem('guide', 'false')
  }, [navigate])

  const newFunctions = () => {
    console.log(mainButtFunc)
    successToast(` Main butt func is \n\n${mainButtFunc}`)
    if (mainButtFunc == 'notif') {
      uMainButtFunc('create')
      successToast('activatedCreate')
    } else {
      uMainButtFunc('notif')
      // console.log('activatedNofit')
      successToast('activatedNofit')
    }
  }

  const successToasterNotif = () => {
    successToast('button clicked')
  }

  const activateEchoCreator = () => {
    uCrudMode('create')
    uEchoModal(true)
  }

  const showHideMain = () => {
    if (telegramApp) {
      if (telegramApp.MainButton.isVisible) {
        telegramApp.MainButton.hide()
      } else {
        telegramApp.MainButton.show()
      }
    }
  }

  const oneAndOnlyOnclick = () => {
    if (mainButtFunc == 'notif') {
      successToasterNotif()
    } else if (mainButtFunc == 'create') {
      activateEchoCreator()
    } else {
      activateAll()
    }
  }

  const checkMainButt = () => {
    successToast(`Main butt func is ${mainButtFunc}`)
  }

  const changeMainButt = () => {
    successToast('custom butt')
    if (telegramApp?.MainButton) {
      telegramApp.MainButton.setParams({
        text: 'Create echo', // Set your desired button text
        color: '#6fa1bf', // Set your desired button color
        text_color: '#FFFFFF', // Set your desired text color
        is_active: true, // Set to true if button should be active
        is_visible: true, // Set to true if button should be visible
      })
    }
  }

  const activateAll = () => {
    successToast('activate butt')
    if (telegramApp?.MainButton) {
      telegramApp.MainButton.onClick(oneAndOnlyOnclick)
    }
  }

  return (
    <div className={styles.App}>
      <div className={styles.appBlock}>
        <div className={styles.mainpage}>
          <button className={styles.testbutt} onClick={checkMainButt}>
            Main butt func check
          </button>
          <button className={styles.testbutt} onClick={onToggleButton}>
            Toggle main button
          </button>
          <button className={styles.testbutt} onClick={changeMainButt}>
            My butt
          </button>
          <button className={styles.testbutt} onClick={newFunctions}>
            newFunctions
          </button>

          <button className={styles.testbutt} onClick={activateAll}>
            ONE FUNC ACTIVATOR
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

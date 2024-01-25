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

  const { mainButtFunc, uMainButtFunc, echoModal } = useMyLogic()

  const { successToast } = useMyToaster()

  const { uEchoModal, uCrudMode } = useMyLogic()

  useEffect(() => {
    console.log('run this func')
    const guideCompleted = localStorage.getItem('guide') === 'true'
    navigate(guideCompleted ? '/main' : '/')
    // localStorage.setItem('guide', 'false')
  }, [navigate])

  const newFunctions = () => {
    // telegramApp.MainButton.offClick(oneAndOnlyOnclick)
    console.log(mainButtFunc)
    uMainButtFunc('create')

    // if (mainButtFunc == 'notif') {
    //   uMainButtFunc('create')
    //   successToast('activatedCreate')
    // } else {
    //   uMainButtFunc('notif')

    //   successToast('activatedNofit')
    // }
    telegramApp.MainButton.onClick(oneAndOnlyOnclick)
  }

  const successToasterNotif = () => {
    successToast('button clicked')
  }

  const activateEchoCreator = () => {
    uCrudMode('create')
    uEchoModal(true)
  }

  useEffect(() => {
    if (echoModal) {
      telegramApp.MainButton.hide()
    }

    if (!echoModal) {
      telegramApp.MainButton.show()
    }
  }, [echoModal])

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
    // if (mainButtFunc == 'notif') {
    //   successToasterNotif()
    // } else if (mainButtFunc == 'create') {
    //   activateEchoCreator()
    // } else {
    //   activateAll()
    // }
    activateEchoCreator()
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
    // activateAll()
  }, [])

  return (
    <div className={styles.App}>
      <div className={styles.appBlock}>
        <div className={styles.mainpage}>
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

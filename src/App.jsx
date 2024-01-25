import { useEffect, useMemo, useState } from 'react'

import styles from './App.module.css'

import { Routes, Route, useNavigate } from 'react-router-dom'

import UserComponent from './components/UserComponent/UserComponent'
import MainPage from './pages/Main/MainPage'
import OneEchoPage from './pages/OneEcho/OneEchoPage'
import { telegramApp, useTelegram } from './hooks/useTelegram'
import { useMyTelegram, useMyToaster } from './storage/StorageContext'

function App() {
  const navigate = useNavigate()

  const { myTelegram, uMyTelegram } = useMyTelegram()

  const { checkrunAndExpand, user, userUnsafe, queryId, onToggleButton } =
    useTelegram()

  useEffect(() => {
    checkrunAndExpand()
    if (user) {
      console.log(user)
    }
    if (userUnsafe) {
      console.log(userUnsafe)
    }
    if (queryId) {
      console.log(queryId)
    }

    if (telegramApp) {
      console.log('initData:', telegramApp?.initData)
      console.log('initDataUnsafe:', telegramApp?.initDataUnsafe)
      console.log('version:', telegramApp?.version)
      console.log('platform:', telegramApp?.platform)
      console.log('colorScheme:', telegramApp?.colorScheme)
      console.log('themeParams:', telegramApp?.themeParams)
      console.log('isExpanded:', telegramApp?.isExpanded)
      console.log('viewportHeight:', telegramApp?.viewportHeight)
      console.log('viewportStableHeight:', telegramApp?.viewportStableHeight)
      console.log('headerColor:', telegramApp?.headerColor)
      console.log('backgroundColor:', telegramApp?.backgroundColor)
      console.log(
        'isClosingConfirmationEnabled:',
        telegramApp?.isClosingConfirmationEnabled
      )
      console.log('BackButton:', telegramApp?.BackButton)
      console.log('MainButton:', telegramApp?.MainButton)
      console.log('SettingsButton:', telegramApp?.SettingsButton)
      console.log('HapticFeedback:', telegramApp?.HapticFeedback)
      console.log('CloudStorage:', telegramApp?.CloudStorage)
    }
  }, [])

  const { successToast } = useMyToaster()

  useEffect(() => {
    const guideCompleted = localStorage.getItem('guide') === 'true'
    navigate(guideCompleted ? '/main' : '/')
    // localStorage.setItem('guide', 'false')
  }, [navigate])

  const changeMainButt = () => {
    if (telegramApp) {
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
    telegramApp.MainButton.onClick(() => {
      successToast('button clicked')
    })
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
          <button className={styles.testbutt} onClick={clickMyButt}>
            New Func For Main
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
          {telegramApp ? (
            <p>Platform telegram: {telegramApp.platform}</p>
          ) : (
            <></>
          )}
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

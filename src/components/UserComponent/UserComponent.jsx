import React, { useEffect, useState } from 'react'
import styles from './UserComponent.module.css'

const UserComponent = () => {
  const [telegram, setTelegram] = useState(null)
  const [userData, setUserData] = useState({})
  const [mainButtonVisible, setMainButtonVisible] = useState(true)
  const [mainButtonActive, setMainButtonActive] = useState(true)

  let bg_color = 'white'
  let text_color = 'white'
  let hint_color = 'white'
  let link_color = 'white'
  let button_color = 'white'
  let button_text_colorString = 'white'

  const toggleMainButtonVisibility = () => {
    if (mainButtonVisible) {
      telegram.MainButton.hide()
    } else {
      telegram.MainButton.show()
    }
    setMainButtonVisible(!mainButtonVisible)
  }

  const toggleMainButtonActivity = () => {
    if (mainButtonActive) {
      telegram.MainButton.setParams({ color: '#E0FFFF' })
      telegram.MainButton.disable()
    } else {
      telegram.MainButton.setParams({ color: '#143F6B' })
      telegram.MainButton.enable()
    }
    setMainButtonActive(!mainButtonActive)
  }

  useEffect(() => {
    const tg = window.Telegram.WebApp
    console.log(tg)

    if (tg) {
      setTelegram(tg)

      tg.expand()
      tg.MainButton.text = 'Changed Text'
      tg.MainButton.setText('Changed Text1')
      tg.MainButton.textColor = '#F55353'
      tg.MainButton.color = '#143F6B'
      tg.MainButton.setParams({ color: '#143F6B' })

      if (tg.initDataUnsafe?.user) {
        setUserData({
          firstName: tg.initDataUnsafe.user.first_name,
          lastName: tg.initDataUnsafe.user.last_name,
          username: tg.initDataUnsafe.user.username,
          languageCode: tg.initDataUnsafe.user.language_code,
          userId: tg.initDataUnsafe.user.id,
        })
      }

      bg_color = tg.ThemeParams.bg_color
      text_color = tg.ThemeParams.text_color
      hint_color = tg.ThemeParams.hint_color
      link_color = tg.ThemeParams.link_color
      button_color = tg.ThemeParams.button_color
      button_text_colorString = tg.ThemeParams.button_text_colorString

      tg.onEvent('mainButtonClicked', () => {
        tg.sendData('some string that we need to send')
      })
    }
  }, [])

  return (
    <>
      {telegram && userData && (
        <div>
          <div className={styles.usercard}>
            <p>{`${userData.firstName} ${userData.lastName} ${userData.username} (${userData.languageCode})`}</p>
            <p>{userData.userId}</p>
            <p>{telegram.initDataUnsafe?.query_id}</p>
          </div>
          <p>Just text</p>
          <a className={styles.link} href="https://hestamp.com">
            Link
          </a>
          <p className={styles.hint}>Some little hint</p>
          <button
            id="btn"
            className={styles.button}
            onClick={toggleMainButtonVisibility}
          >
            Show/Hide Main Button
          </button>
          <button
            id="btnED"
            className={styles.button}
            onClick={toggleMainButtonActivity}
          >
            Enable/Disable Main Button
          </button>
          <div>
            <h3>Color palette</h3>
            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: bg_color,
              }}
            >
              bg_color {bg_color}
            </div>

            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: text_color,
              }}
            >
              text_color {text_color}
            </div>
            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: hint_color,
              }}
            >
              hint_color {hint_color}
            </div>
            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: link_color,
              }}
            >
              link_color {link_color}
            </div>
            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: button_color,
              }}
            >
              button_color {button_color}
            </div>
            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: button_text_colorString,
              }}
            >
              button_text_colorString {button_text_colorString}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserComponent

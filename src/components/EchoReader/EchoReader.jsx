import React, { useState } from 'react'
import styles from './EchoReader.module.css'
import MyInput from '../Tools/MyInput/MyInput'
import MyTextarea from '../Tools/MyTextarea/MyTextarea'
import { useMyMainContext, useMyToaster } from '../../storage/StorageContext'
import { renderContentWithLineBreaks } from '../../utils/textUtils'
const EchoReader = () => {
  const {
    newEchoName,
    uNewEchoName,
    uNewEchoContext,
    newEchoContext,
    uTaskArr,
    echoModal,
    uEchoModal,
    activeEcho,
    uActiveEcho,
  } = useMyMainContext()

  const { successToast } = useMyToaster()

  const handleAddTask = () => {
    const currentDate = new Date()
    const intervals = [0, 1, 5, 15, 30, 60]

    const dates = intervals.map((interval) => {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() + interval)
      return date.toISOString()
    })

    const iddate = new Date().toISOString()

    const newTask = {
      name: newEchoName,
      lvl: 1,
      dates: dates,
      content: newEchoContext,
      active: true,
      completed: false,
      id: iddate,
    }

    console.log(newTask)

    uTaskArr((prevTaskArr) => {
      const updatedTaskArr = [...prevTaskArr, newTask]

      return updatedTaskArr
    })

    uNewEchoName('')
    uNewEchoContext('')
    uEchoModal(false)
    successToast('New echo created')
  }

  return (
    <div className={styles.echocreator}>
      {!activeEcho ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>{activeEcho.name}</h3>
          <div className={styles.inputblock}>
            {renderContentWithLineBreaks(activeEcho.content)}
          </div>

          {/* <button onClick={handleAddTask} className={styles.addbutt}>
            <span> Create</span>
          </button> */}
          <h3>{'|'.repeat(activeEcho.lvl)}</h3>
        </>
      )}
    </div>
  )
}

export default EchoReader

import React, { useState } from 'react'
import styles from './EchoCreator.module.css'
import MyInput from '../Tools/MyInput/MyInput'
import MyTextarea from '../Tools/MyTextarea/MyTextarea'
import {
  useMyLogic,
  useMyMainContext,
  useMyToaster,
} from '../../storage/StorageContext'
const EchoCreator = () => {
  const {
    newEchoName,
    uNewEchoName,
    uNewEchoContext,
    newEchoContext,
    uTaskArr,
  } = useMyMainContext()

  const { echoModal, uEchoModal } = useMyLogic()

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
      <h3>New echo</h3>
      <div className={styles.inputblock}>
        <MyInput
          value={newEchoName}
          placeholder="Enter echo name"
          onChange={(e) => uNewEchoName(e.target.value)}
          maxLength={33}
          type="text"
        />
        <MyTextarea
          value={newEchoContext}
          placeholder="Content of your echo"
          onChange={(e) => uNewEchoContext(e.target.value)}
          type="text"
        />
      </div>
      <button onClick={handleAddTask} className={styles.addbutt}>
        <span> Create</span>
      </button>
    </div>
  )
}

export default EchoCreator

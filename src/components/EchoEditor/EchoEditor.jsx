import React, { useEffect, useState } from 'react'
import styles from './EchoEditor.module.css'
import MyInput from '../Tools/MyInput/MyInput'
import MyTextarea from '../Tools/MyTextarea/MyTextarea'
import {
  useMyLogic,
  useMyMainContext,
  useMyToaster,
} from '../../storage/StorageContext'
const EchoEditor = () => {
  const { taskArr, uTaskArr, activeEcho, uActiveEcho } = useMyMainContext()

  const { uEchoModal } = useMyLogic()

  const [tempName, setTempName] = useState('')
  const [tempContent, setTempContent] = useState('')

  useEffect(() => {
    if (activeEcho) {
      setTempName(activeEcho.name)
      setTempContent(activeEcho.content)
    }
  }, [])

  const { successToast } = useMyToaster()

  const updateEcho = () => {
    if (activeEcho) {
      const updatedEcho = {
        ...activeEcho,
        name: tempName,
        content: tempContent,
      }

      const updatedTaskArr = [...taskArr]

      const indexToUpdate = updatedTaskArr.findIndex(
        (task) => task.id === activeEcho.id
      )

      if (indexToUpdate !== -1) {
        updatedTaskArr[indexToUpdate] = updatedEcho
        uTaskArr(updatedTaskArr)
      }

      successToast('Echo updated')
      uEchoModal(false)
      uActiveEcho(null)
    }
  }

  return (
    <div className={styles.echocreator}>
      <h3>Edit echo</h3>
      <div className={styles.inputblock}>
        <MyInput
          value={tempName}
          placeholder="Enter echo name"
          onChange={(e) => setTempName(e.target.value)}
          maxLength={33}
          type="text"
        />
        <MyTextarea
          value={tempContent}
          placeholder="Content of your echo"
          onChange={(e) => setTempContent(e.target.value)}
          type="text"
        />
      </div>
      <button onClick={updateEcho} className={styles.addbutt}>
        <span> Save</span>
      </button>
    </div>
  )
}

export default EchoEditor

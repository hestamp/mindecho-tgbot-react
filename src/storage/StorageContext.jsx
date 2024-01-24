import { createContext, useContext, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
export const StorageContext = createContext()

export const MyStorageProvider = ({ children }) => {
  //MainPage // Array of echos
  const [taskArr, uTaskArr] = useState([])

  //MainPage // New Echo
  const [newEchoName, uNewEchoName] = useState('')
  const [newEchoContext, uNewEchoContext] = useState('')
  //MainPage // Logic
  const [newEchoModal, uNewEchoModal] = useState(false)

  const successToast = (message) => toast.success(message)
  const dismissToast = () => toast.dismiss()
  const errorToast = (message) => toast.error(message)

  const storageContextData = {
    global: {},
    mainpage: {
      newEchoName,
      uNewEchoName,
      newEchoContext,
      uNewEchoContext,
      newEchoModal,
      uNewEchoModal,
      taskArr,
      uTaskArr,
    },
    toaster: { successToast, errorToast },
  }

  return (
    <StorageContext.Provider value={storageContextData}>
      <Toaster />
      <div className={`theme `}>{children}</div>
    </StorageContext.Provider>
  )
}

export function useMyGlobal() {
  const { global } = useContext(StorageContext)
  if (!global) {
    throw new Error('No Global Context')
  }
  return global
}
export function useMyToaster() {
  const { toaster } = useContext(StorageContext)
  if (!toaster) {
    throw new Error('No Toaster Context')
  }
  return toaster
}
export function useMyMainContext() {
  const { mainpage } = useContext(StorageContext)
  if (!mainpage) {
    throw new Error('No Main C')
  }
  return mainpage
}

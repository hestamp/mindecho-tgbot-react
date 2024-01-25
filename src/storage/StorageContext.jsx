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
  const [echoModal, uEchoModal] = useState(false)
  const [crudMode, uCrudMode] = useState(null)

  //MainPage // Active item
  const [activeEcho, uActiveEcho] = useState(null)

  //Toasters
  const successToast = (message) => toast.success(message)
  const dismissToast = () => toast.dismiss()
  const errorToast = (message) => toast.error(message)

  //Telegram // Object and functions
  const [myTelegram, uMyTelegram] = useState(null)

  const storageContextData = {
    telegram: { myTelegram, uMyTelegram },
    mainpage: {
      newEchoName,
      uNewEchoName,
      newEchoContext,
      uNewEchoContext,
      echoModal,
      uEchoModal,
      taskArr,
      uTaskArr,
      activeEcho,
      uActiveEcho,
      crudMode,
      uCrudMode,
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
export function useMyTelegram() {
  const { telegram } = useContext(StorageContext)
  if (!telegram) {
    throw new Error('No Telegram')
  }
  return telegram
}

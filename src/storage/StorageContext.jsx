import { createContext, useContext, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
export const StorageContext = createContext()

export const MyStorageProvider = ({ children }) => {
  const [globalArr, uGlobalArr] = useState([])

  const successToast = (message) => toast.success(message, themeToast)
  const dismissToast = () => toast.dismiss()
  const errorToast = (message) => toast.error(message, themeToast)

  const storageContextData = {
    global: { globalArr, uGlobalArr },
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
